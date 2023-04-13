FROM python:3.8-alpine
COPY ./requirements.txt /app/requirements.txt
WORKDIR /app
RUN apk add --no-cache --update \
    python3 python3-dev gcc \
    gfortran musl-dev
RUN pip install --upgrade pip

# create user
RUN useradd -ms /bin/bash ${USER}
USER ${USER}
WORKDIR /home/${USER}

# add credentials
RUN mkdir -p /home/${USER}/.aws
COPY .aws/credentials /home/${USER}/.aws

RUN pip install -r requirements.txt
COPY . /app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
