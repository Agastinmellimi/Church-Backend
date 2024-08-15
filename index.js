const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const cors = require("cors");

const app = express();
// ....
app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);
  next();
});

const dbPath = path.join(__dirname, "./userData.db");
let db = null;

const intializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3005, () => {
      console.log("Server Running at http://localhost:3005/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

intializeDbAndServer();

app.get("/", (req, res) => {
  res.send("Hello Agastin!");
});

app.get("/children-details", async (request, response) => {
  const getQuery = `SELECT * FROM children;`;
  const childrenArray = await db.all(getQuery);
  response.send(childrenArray);
});

// attendance sumbit query using chidlren attendance array
app.post("/submit-attendance", async (request, response) => {
  const { date, array } = request.body;
  const modifiedArray = array.map((item) => ({ ...item, date: date }));

  modifiedArray.map(async (item) => {
    const { child_id, date, status } = item;
    const getDateStatusChild = `SELECT * FROM attendance WHERE child_id=${child_id} AND date='${date}';`;
    const childrenStatus = await db.get(getDateStatusChild);
    if (childrenStatus === undefined) {
      // Add Children Status
      const addAttendanceQuery = `INSERT INTO attendance(child_id, date, status) VALUES(${child_id}, "${date}", ${status});`;
      await db.run(addAttendanceQuery);
    } else {
      // UpDate Children Status
      const statusUPdateQuery = `UPDATE attendance
            SET status=${status}
            WHERE child_id=${child_id} and date="${date}";`;
      await db.run(statusUPdateQuery);
    }
  });
  response.send({ successMsg: "Attendance submitted successfully" });
});

// delete attendance query using date
app.delete("/delete-attendance", async (request, response) => {
  const { date } = request.body;
  const dateExistQuery = `SELECT DISTINCT date FROM attendance WHERE date="${date}";`;
  const dateExist = await db.get(dateExistQuery);
  if (dateExist !== undefined) {
    const deleteDataAttendanceQuery = `DELETE FROM attendance WHERE date='${date}';`;
    await db.run(deleteDataAttendanceQuery);
    response.send({ successMsg: "Attendance deleted successfully" });
  } else {
    response.status(400);
    response.send({ err_msg: "Date does not exist" });
  }
});

app.post("/date-attendance", async (request, response) => {
  const { date } = request.body;
  const checkDateExistQuery = `SELECT * FROM attendance WHERE date="${date}";`;
  const checkExistDate = await db.get(checkDateExistQuery);
  if (checkExistDate !== undefined) {
    const dateViceAttendanceQuery = `SELECT children.name, attendance.status  AS presents FROM children INNER JOIN
        attendance ON children.id = attendance.child_id WHERE attendance.date = "${date}" ORDER BY children.id ASC;`;
    const dateViceAttendanceArray = await db.all(dateViceAttendanceQuery);
    response.send(dateViceAttendanceArray);
  } else {
    response.status(400);
    response.send({
      err_msg: "Oops!, On this date attendance not registered.",
    });
  }
});

// GET ALL STUDENTS ATTENDANCE DETAILS
app.get("/attendance-details", async (request, response) => {
  const getAttendanceQuery = `SELECT children.id, children.name, SUM(CASE WHEN attendance.status = 1 THEN 1 ELSE 0 END) AS presents, children.gender, children.image FROM children LEFT JOIN
    attendance ON children.id = attendance.child_id GROUP BY children.id;`;
  const attendanceDetailsArray = await db.all(getAttendanceQuery);
  const getExistDatesQury = `SELECT COUNT(DISTINCT date) AS working_days FROM attendance;`;
  const existDates = await db.get(getExistDatesQury);
  const data = {
    workingDays: existDates.working_days,
    details: attendanceDetailsArray,
  };
  response.send(data);
});

module.exports = app;
