-- CREATE TABLE children(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name STRING, gender STRING);
-- INSERT INTO children(name, gender) VALUES("PRINSHI SHALINI PALLI", "FEMALE");

-- CREATE TABLE attendance(child_id INTEGER, date DATE, status BOOLEAN DEFAULT false, FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE);
-- UPDATE children SET name="DAKSHITH KARTHIK BHOLA" WHERE id =13;
-- SELECT DISTINCT date FROM attendance;
-- ALTER TABLE children
-- ADD image STRING;
-- UPDATE children
-- SET id=10
-- WHERE id=14;

-- DELETE FROM attendance;
-- DELETE FROM children WHERE id=13;

-- CREATE TABLE services(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, service_name STRING, service_time STRING);
-- INSERT INTO services(service_name, service_time) VALUES ("Lord's Supper", "Every Month First Sunday Night 7:30PM to 8:30PM");