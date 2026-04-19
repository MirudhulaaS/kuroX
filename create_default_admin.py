import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from kurox_core.models import User

if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'kurox123')
    print("Admin user created successfully!")
    print("Username: admin")
    print("Password: kurox123")
else:
    print("Admin user already exists.")
