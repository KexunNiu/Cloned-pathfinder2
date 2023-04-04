#---- Base python ----
FROM python:3.9-slim-bullseye
RUN python3 -m venv /opt/venv
RUN . /opt/venv/bin/activate

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED 1

# Create app directory
WORKDIR /src

COPY backend/requirements.txt /src

RUN pip3 install -r requirements.txt

COPY ./backend /src

EXPOSE 8000