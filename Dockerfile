FROM python:3.8-slim-buster

RUN pip install --upgrade pip
RUN python -m pip install -U pip
RUN apt-get update \
    && apt-get -y install libpq-dev gcc
    
COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY ./backend /app
COPY ./frontend/build /app/static/build
RUN chmod -R 755 /app

WORKDIR /app

COPY ./entrypoint.sh /
ENTRYPOINT ["sh", "/entrypoint.sh"]