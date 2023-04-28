CREATE SCHEMA IF NOT EXISTS monitor;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Uptime table
CREATE TABLE monitor.uptime (
	id uuid DEFAULT uuid_generate_v4 (),
  url varchar(250) NOT NULL,
  status varchar(250) NOT NULL,
  response_time real,
  content_requirements varchar(250),
  PRIMARY KEY (id)
);
