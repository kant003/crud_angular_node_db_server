Lanzar contenedor de docker postgres
```
docker compose up -d

docker ps
```


Conectarse usando un cliente CLI a postgres
```
docker exec -it postgres_5433 psql -U admin -d appdb
```

Añadimos las tablas a la bd postgress
```
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  age INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO students (name, email, age) VALUES
('Ana López', 'ana@correo.com', 20),
('Juan Pérez', 'juan@correo.com', 22),
('María García', 'maria@correo.com', 19),
('Carlos Ruiz', 'carlos@correo.com', 23);


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(120) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  name VARCHAR(80),
  provider VARCHAR(20) NOT NULL DEFAULT 'local',
  google_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT provider_check CHECK (provider IN ('local', 'google'))
);
```


Instalamos la dependencia de postgres
```
npm i pg
```