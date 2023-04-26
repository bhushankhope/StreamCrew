# FROM python:3.8-alpine
# COPY ./requirements.txt /app/requirements.txt
# WORKDIR /app
# RUN apk add --no-cache --update \
#     python3 python3-dev gcc \
#     gfortran musl-dev
# RUN pip install --upgrade pip

# # Create a group and user
# RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# # Tell docker that all future commands should run as the appuser user
# USER appuser

# WORKDIR /home/appuser

# # add credentials
# RUN mkdir -p /home/appuser/.aws
# COPY .aws/credentials /home/appuser/.aws

# RUN pip install -r /app/requirements.txt
# COPY . /app
# # CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
# ENTRYPOINT uvicorn main:app --app-dir /home/appuser/app --host 0.0.0.0 --port 8000 --reload

FROM python:3-slim-buster

RUN mkdir /code

WORKDIR /code

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8001

CMD ["uvicorn", "main:app", "--host=0.0.0.0", "--port=8001"]