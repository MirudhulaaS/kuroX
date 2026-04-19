import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from kurox_core.models import User
from rest_framework.authtoken.models import Token

try:
    user = User.objects.get(username='admin')
    print(f"User 'admin' found.")
    print(f"Is staff: {user.is_staff}")
    print(f"Is superuser: {user.is_superuser}")
    
    token, created = Token.objects.get_or_create(user=user)
    print(f"Token: {token.key}")
    
    # Test authentication
    from django.contrib.auth import authenticate
    auth_user = authenticate(username='admin', password='kurox123')
    if auth_user:
        print("Authentication test: SUCCESS")
    else:
        print("Authentication test: FAILED (wrong password)")

except User.DoesNotExist:
    print("User 'admin' does NOT exist.")
except Exception as e:
    print(f"Error: {e}")
