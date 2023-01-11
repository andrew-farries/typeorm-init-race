# Typeorm race condition

Demonstrate a race condition that can occur when TypeORM initialisation is slow and not awaited.

## Usage

* Start a mysql and a toxiproxy container with toxiproxy configured with mysql as an upstream.
```
docker compose up
```

* Run the app:
```
npm start:dev
```

## Expected results

The application runs before TypeORM initialisation is complete resulting in a crash.
