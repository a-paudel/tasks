FROM python:slim
RUN pip install pipenv
WORKDIR /app
COPY server/Pipfile .
COPY server/Pipfile.lock .
RUN pipenv install --system --deploy --ignore-pipfile
COPY . .
WORKDIR /app/server