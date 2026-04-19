from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Department, Post, Reaction, Comment, IssueTracking

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Platform Info', {'fields': ('area', 'name')}),
    )
    list_display = ('username', 'email', 'name', 'area', 'is_staff')

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('name', 'contact_email')
    search_fields = ('name',)

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'area', 'priority', 'support_count', 'created_at')
    list_filter = ('priority', 'area')
    search_fields = ('author__username', 'problem_statement')

@admin.register(Reaction)
class ReactionAdmin(admin.ModelAdmin):
    list_display = ('user', 'post', 'reaction_type', 'created_at')

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('author', 'post', 'created_at')

@admin.register(IssueTracking)
class IssueTrackingAdmin(admin.ModelAdmin):
    list_display = ('post', 'status', 'assigned_department', 'assigned_to', 'sla_deadline')
    list_filter = ('status', 'assigned_department')
