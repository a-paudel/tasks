FROM python:slim
WORKDIR /app
COPY server/requirements.txt .
RUN pip install -r requirements.txt
COPY . .
WORKDIR /app/server
CMD exec uvicorn app.app:app --port ${PORT} --host "0.0.0.0"
