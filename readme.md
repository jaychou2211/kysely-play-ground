# Creating Tables and Inserting Data in a New PostgreSQL Container

1. First, enter the container:

   ```
   docker exec -it {{container_id}} bash
   ```

2. Connect to PostgreSQL:

   ```
   psql -U {{user}} -d {{db_name}}
   ```

3. Now you're in the PostgreSQL command line.\
   Based on the provided TypeScript type definitions,\
   we can execute the following SQL statements to create these two tables:

   ```sql
   CREATE TABLE person (
     id SERIAL PRIMARY KEY,
     first_name VARCHAR(255) NOT NULL,
     gender VARCHAR(5) CHECK (gender IN ('man', 'woman', 'other')),
     last_name VARCHAR(255),
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     metadata JSONB NOT NULL
   );
   
   CREATE TABLE pet (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     owner_id INTEGER NOT NULL,
     species VARCHAR(3) CHECK (species IN ('dog', 'cat')),
     FOREIGN KEY (owner_id) REFERENCES person(id)
   );
   ```

4. You can use the `\dt` command to check if the tables have been created:

   ```
   \dt
   ```

5. Now, let's insert some data into each table.

   For PersonTable:

   ```sql
   INSERT INTO person (first_name, gender, last_name, metadata) VALUES
   ('John', 'man', 'Doe', '{"age": 30, "city": "New York"}'),
   ('Jane', 'woman', 'Smith', '{"age": 28, "city": "Los Angeles"}'),
   ('Alex', 'other', 'Johnson', '{"age": 35, "city": "Chicago"}');
   ```

   For PetTable (note that we need to use existing person.id):

   ```sql
   INSERT INTO pet (name, owner_id, species) VALUES
   ('Buddy', 1, 'dog'),
   ('Whiskers', 2, 'cat'),
   ('Max', 1, 'dog'),
   ('Luna', 3, 'cat');
   ```

6. When finished, use `\q` to exit the PostgreSQL command line.

7. Type `exit` to leave the container.