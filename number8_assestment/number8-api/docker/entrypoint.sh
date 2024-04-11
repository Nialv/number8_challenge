#!/bin/bash
set -e

echo "Starting Entrypoint Script..."

# Function to check if the database is ready
wait_for_database() {
  echo "Checking if the database is ready..."
  until nc -z -v -w30 $PSQL_DB_HOST $PSQL_DB_PORT
  do
    echo "Waiting for database connection..."
    # wait for 5 seconds before checking again
    sleep 5
  done
  echo "Database is ready!"
}

# Check if the database is ready
wait_for_database

echo "Running database migrations..."
# Run database migrations
npm run db:run

# Optionally: Run seed files (be cautious in production environments)
if [ "$NODE_ENV" != "production" ]; then
  echo "Seeding database..."
  npm run db:run:seed
fi

echo "Database migrations completed."

echo "Starting the backend application..."

# Start the backend application
if [ "$NODE_ENV" = "development" ]; then
  echo "Starting in development mode with Nodemon..."
  exec npm run dev
else
  echo "Starting in production mode..."
  exec npm start
fi