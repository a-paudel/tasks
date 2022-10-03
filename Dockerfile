FROM python:slim
WORKDIR /app
# install pipenv
RUN pip install pipenv
# copy the Pipfile and Pipfile.lock
COPY server/Pipfile server/Pipfile.lock /app/
# install
RUN pipenv install --system --deploy
# copy server code
COPY server server
# copy web client code
COPY web_client/dist web_client/dist
WORKDIR /app/server

CMD exec uvicorn app:app --host "0.0.0.0" --port $PORT
