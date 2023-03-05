#!/bin/sh

echo "MIGRATE"
python manage.py makemigrations base
python manage.py migrate
echo "COLLECTSTATIC"
python manage.py collectstatic --no-input
echo "SUPERUSER"
python manage.py createsuperuser --email $SUPER_USER_EMAIL --noinput

daphne -b 0.0.0.0 -p 8000 backend.asgi:application
