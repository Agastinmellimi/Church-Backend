-- CREATE TABLE children(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name STRING, gender STRING);
-- INSERT INTO children(name, gender) VALUES("PRINSHI SHALINI PALLI", "FEMALE");

-- CREATE TABLE attendance(child_id INTEGER, date DATE, status BOOLEAN DEFAULT false, FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE);
-- UPDATE children SET name="DAKSHITH KARTHIK BHOLA" WHERE id =13;
-- SELECT DISTINCT date FROM attendance;
-- ALTER TABLE children
-- ADD image STRING;
-- UPDATE children
-- SET id=14
-- WHERE id=17;

-- DELETE FROM attendance WHERE child_id=7;
-- DELETE FROM children WHERE id=7;

