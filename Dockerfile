FROM python:slim
WORKDIR /app
# install pipenv
RUN pip install pipenv
# copy the Pipfile and Pipfile.lock
COPY server/Pipfile server/Pipfile.lock /app/
# install
RUN pipenv install --system --deploy
# copy the rest of the code
COPY server .
# WORKDIR /app/server

CMD exec uvicorn app:app --host "0.0.0.0" --port $PORT
