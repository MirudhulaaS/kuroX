import requests

TOKEN = "b2d7a863786f1b341aea2feeb99e8c1d9e1c112e"
USERNAME = "mirudhulaas"
BASE_URL = f"https://www.pythonanywhere.com/api/v0/user/{USERNAME}/"
headers = {"Authorization": f"Token {TOKEN}"}

print("Setting up webapp...")
# Create webapp
response = requests.post(BASE_URL + "webapps/", headers=headers, data={
    "domain_name": f"{USERNAME}.pythonanywhere.com",
    "python_version": "3.10"
})
print("Create WebApp:", response.status_code, response.text)

print("Updating settings...")
response = requests.patch(BASE_URL + f"webapps/{USERNAME}.pythonanywhere.com/", headers=headers, json={
    "virtualenv_path": f"/home/{USERNAME}/.virtualenvs/kurox-venv",
    "source_directory": f"/home/{USERNAME}/kuroX"
})
print("Update WebApp:", response.status_code, response.text)

print("Writing WSGI file...")
wsgi_content = f"""import os
import sys

path = '/home/{USERNAME}/kuroX'
if path not in sys.path:
    sys.path.append(path)

os.environ['DJANGO_SETTINGS_MODULE'] = 'backend.settings'

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
"""
response = requests.post(BASE_URL + f"files/path/var/www/{USERNAME.replace('-', '_')}_pythonanywhere_com_wsgi.py", headers=headers, files={"content": wsgi_content})
print("Write WSGI:", response.status_code, response.text)

print("Reloading...")
response = requests.post(BASE_URL + f"webapps/{USERNAME}.pythonanywhere.com/reload/", headers=headers)
print("Reload WebApp:", response.status_code, response.text)
