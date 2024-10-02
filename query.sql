-- CREATE TABLE children(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name STRING, gender STRING);
-- INSERT INTO children(name, gender, image) VALUES("NITHIPUDI LALXMITEJA", "MALE", "https://res.cloudinary.com/dkrpgt9kd/image/upload/v1723623058/zly79h3fadpj6tmdzpnr.png"), ("BHOLA DAESHIT KARTHIK", "MALE", "https://res.cloudinary.com/dkrpgt9kd/image/upload/v1723623059/j0wc60oqk6uniyxl9d6l.png");

-- CREATE TABLE attendance(child_id INTEGER, date DATE, status BOOLEAN DEFAULT false, FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE);
-- UPDATE children SET name="DAKSHITH KARTHIK BHOLA" WHERE id =13;
-- SELECT DISTINCT date FROM attendance;
-- ALTER TABLE children
-- ADD image STRING;
-- UPDATE children
-- SET image = "https://res.cloudinary.com/dkrpgt9kd/image/upload/v1723623059/j0wc60oqk6uniyxl9d6l.png"
-- WHERE id=14;

-- DELETE FROM attendance WHERE child_id=13;

