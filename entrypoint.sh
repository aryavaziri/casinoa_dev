#!/bin/sh

DJANGO_SUPERUSER_PASSWORD=$SUPER_USER_PASSWORD 

python manage.py makemigrations --no-input
python manage.py migrate --no-input
python manage.py collectstatic --no-input
python manage.py createsuperuser --email $SUPER_USER_EMAIL --noinput



daphne -b 0.0.0.0 -p 8000 backend.asgi:application
