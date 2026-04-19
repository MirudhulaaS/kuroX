import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from kurox_core.models import User

user, created = User.objects.get_or_create(username='admin', defaults={'email': 'admin@example.com'})
user.set_password('kurox123')
user.is_staff = True
user.is_superuser = True
user.save()

print("Admin password has been reset/set to: kurox123")
