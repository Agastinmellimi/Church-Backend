-- CREATE TABLE children(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name STRING, gender STRING);
-- INSERT INTO children(name, gender) VALUES();

-- CREATE TABLE attendance(child_id INTEGER, date DATE, status BOOLEAN DEFAULT false, FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE);