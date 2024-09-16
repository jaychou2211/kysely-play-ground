-- Create person table
CREATE TABLE persons (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  gender VARCHAR(5) CHECK (gender IN ('man', 'woman', 'other')),
  last_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  metadata JSONB NOT NULL
);

-- Create pet table
CREATE TABLE pets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  owner_id INTEGER NOT NULL,
  species VARCHAR(3) CHECK (species IN ('dog', 'cat')),
  FOREIGN KEY (owner_id) REFERENCES persons(id)
);

-- Insert data into person table
INSERT INTO persons (first_name, gender, last_name, metadata) VALUES
('John', 'man', 'Doe', '{"age": 30, "city": "New York"}'),
('Jane', 'woman', 'Smith', '{"age": 28, "city": "Los Angeles"}'),
('Alex', 'other', 'Johnson', '{"age": 35, "city": "Chicago"}');

-- Insert data into pet table
INSERT INTO pets (name, owner_id, species) VALUES
('Buddy', 1, 'dog'),
('Whiskers', 2, 'cat'),
('Max', 1, 'dog'),
('Luna', 3, 'cat');