from rest_framework import viewsets, permissions, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model

from .models import Department, Post, Reaction, Comment, IssueTracking
from .serializers import (
    UserSerializer, RegisterSerializer, DepartmentSerializer, PostSerializer, 
    ReactionSerializer, CommentSerializer, IssueTrackingSerializer
)

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token.key
        }, status=status.HTTP_201_CREATED)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # In production, use tighter permissions (e.g., IsAuthenticated)
    permission_classes = [permissions.AllowAny]

class DepartmentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [permissions.AllowAny]

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny] # Set AllowAny purely for rapid local dev

    def perform_create(self, serializer):
        # Default author to the first user if anonymous, otherwise request.user
        # Used because dev doesn't enforce active auth token yet
        user = self.request.user if self.request.user.is_authenticated else User.objects.first()
        serializer.save(author=user)

    @action(detail=True, methods=['post'])
    def react(self, request, pk=None):
        post = self.get_object()
        user = request.user if request.user.is_authenticated else User.objects.first()
        reaction_type = request.data.get('reaction_type')
        reason = request.data.get('reason', '')

        if reaction_type not in ['SUPPORT', 'UNSUPPORT']:
            return Response({"error": "Invalid reaction type"}, status=status.HTTP_400_BAD_REQUEST)

        # Require a reason for unsupport to prevent random unsupports
        if reaction_type == 'UNSUPPORT' and not reason.strip():
            return Response({"error": "A reason is required to unsupport a petition."}, status=status.HTTP_400_BAD_REQUEST)

        reaction, created = Reaction.objects.get_or_create(user=user, post=post, defaults={'reaction_type': reaction_type, 'reason': reason})
        
        if not created:
            if reaction.reaction_type != reaction_type:
                # Swapping reaction
                if reaction.reaction_type == 'SUPPORT': post.support_count -= 1
                if reaction.reaction_type == 'UNSUPPORT': post.unsupport_count -= 1
                reaction.reaction_type = reaction_type
                reaction.reason = reason
                reaction.save()
            else:
                return Response({"message": "Reaction already strictly registered."}, status=status.HTTP_200_OK)

        if reaction_type == 'SUPPORT':
            post.support_count += 1
        elif reaction_type == 'UNSUPPORT':
            post.unsupport_count += 1
            
        # Priority mapping trigger manually or via celery later
        if post.support_count >= 50000:
            post.priority = 'URGENT'
        elif post.support_count >= 10000:
            post.priority = 'IMPORTANT'
            
        post.save()
        return Response({"message": "Reaction recorded successfully", "support_count": post.support_count})

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else User.objects.first()
        serializer.save(author=user)

class IssueTrackingViewSet(viewsets.ModelViewSet):
    queryset = IssueTracking.objects.all()
    serializer_class = IssueTrackingSerializer
    permission_classes = [permissions.AllowAny]
