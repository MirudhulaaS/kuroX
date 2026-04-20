from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Department, Post, Reaction, Comment, IssueTracking

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'area', 'constituency', 'aadhaar_id']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    aadhaar_id = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'name', 'area', 'constituency', 'aadhaar_id']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            name=validated_data.get('name', ''),
            area=validated_data.get('area', ''),
            constituency=validated_data.get('constituency', ''),
            aadhaar_id=validated_data.get('aadhaar_id', '')
        )
        return user

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'author_name', 'content', 'created_at']
        read_only_fields = ['author']

class PostSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.username')
    comments = CommentSerializer(many=True, read_only=True)
    status = serializers.SerializerMethodField()
    subject_display = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = [
            'id', 'author', 'author_name', 'area', 'subject', 'subject_display',
            'problem_statement', 
            'support_count', 'unsupport_count', 'share_count', 'priority', 
            'created_at', 'updated_at', 'comments', 'status'
        ]
        read_only_fields = [
            'author', 'support_count', 'unsupport_count', 'share_count', 'priority'
        ]

    def get_status(self, obj):
        try:
            return obj.issue_tracking.status
        except Exception:
            return 'OPEN'

    def get_subject_display(self, obj):
        return obj.get_subject_display()

class ReactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reaction
        fields = '__all__'
        read_only_fields = ['user']

class IssueTrackingSerializer(serializers.ModelSerializer):
    class Meta:
        model = IssueTracking
        fields = '__all__'
