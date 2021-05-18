const app = require('express')();

const pool = require('./MySQLCon');
const {
  insertIntoDepartment,
  insertIntoAllDoctors
} = require('./doctorsAPI/insertDocHelper');
const patientApi = require('./patient');
const roomApi = require('./RoomHelper');
 
// GET: getAllDoctors and doc_reg data
app.get('/register', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(`SELECT
    d.DOC_NO,
    d.D_NAME as Doc,
    dep.D_NAME,
    dep.D_LOCATION,
    dep.FACILITIES,
    d.QUALIFICATION,
    d.SALARY,
    d.ADDRESS,
    d.PH_NO,
    d.DOJ,
    d.EN_TIME,
    d.EX_TIME
FROM
    doc_reg d,
    all_doctors a,
    department dep
WHERE
   a.DEPARTMENT  = dep.D_NAME && a.DOC_NO = d.DOC_NO`, (e, result) => {
      if (e) throw e;

      res.status(200).json(result);

      // When done with the connection, release it.
      connection.release();

      // Handle error after the release.
      if (e) throw e;
    });
  });
});
 
// GET: getAllDoctors and doc_on_call data 
app.get('/call', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(`
    SELECT
    d.DOC_NO,
    d.D_NAME as Doc,
    dep.D_NAME,
    dep.D_LOCATION,
    dep.FACILITIES,
    d.QUALIFICATION,
    d.FS_PR_CL,
    d.PYMT_DU,
    d.ADDRESS,
    d.PH_NO
FROM
    doc_on_call d,
    all_doctors a,
    department dep
WHERE
    a.DEPARTMENT = dep.D_NAME && a.DOC_NO = d.DOC_NO
    `, (e, result) => {
      if (e) throw e;

      res.status(200).json(result);

      // When done with the connection, release it.
      connection.release();

      // Handle error after the release.
      if (e) throw e;
    });
  });
});

// GET: get single doctor reg by id
app.get('/getRegis', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query({
      sql: `
      SELECT
    d.D_NAME,
    dep.D_LOCATION,
    dep.D_NAME AS DEP_NAME,
	d.ADDRESS,
    d.PH_NO,
    dep.FACILITIES,
	d.QUALIFICATION,
    d.SALARY,
    d.EN_TIME,
    d.DOJ,
    d.EX_TIME
FROM
    department dep
INNER JOIN all_doctors a ON
    dep.D_NAME = a.DEPARTMENT
INNER JOIN doc_reg d ON
    a.DOC_NO = d.DOC_NO
WHERE
    a.DOC_NO = ?`,
      timeout: 60000,
      values: [req.query.id]
    }, (e, result) => {
      res.status(200).json(result);

      // When done with the connection, release it.
      connection.release();

      // Handle error after the release.
      if (e) throw e;
    });
  });
});

// GET: get single doctor on call by id
app.get('/getDocOnCall', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query({
      sql: `
      SELECT
    d.D_NAME,
    d.QUALIFICATION,
    dep.D_LOCATION,
    dep.FACILITIES,
    dep.D_NAME AS DEP_NAME,
    d.ADDRESS,
    d.PH_NO,
    d.FS_PR_CL,
    d.PYMT_DU
FROM
    department dep
INNER JOIN all_doctors a ON
    dep.D_NAME = a.DEPARTMENT
INNER JOIN doc_on_call d ON
    a.DOC_NO = d.DOC_NO
WHERE
    d.DOC_NO = ?`,
      timeout: 60000,
      values: [req.query.id]
    }, (e, result) => {
      res.status(200).json(result);

      // When done with the connection, release it.
      connection.release();

      // Handle error after the release.
      if (e) throw e;
    });
  });
});

// POST: add new doctor into doc_reg
app.post('/doctorRegistration', (req, response) => {
  const {
    depName
  } = req.body;

  pool.getConnection((err, conn) => {
    if (err) throw err;

    conn.beginTransaction(function (e) {
      if (e) throw e;

      // QUERYING: Checking if depName already exists
      conn.query({
        sql: "SELECT D_NAME FROM department WHERE D_NAME = ?",
        timeout: 40000,
        values: [depName]
      }, (e, res) => {
        if (e)
          return conn.rollback(function () {
            throw e;
          });

        // IF not found INSERT QUERYING to department table
        if (res.length !== 0) {
          insertIntoAllDoctors(conn, 1, req.body);
          response.status(200).json({
            message: "Success"
          });
        } else {
          // INSERTING into department table
          insertIntoDepartment(conn, 1, req.body);
          response.status(200).json({
            message: "Success"
          });
        }
      });
    });
  });
});

// POST: add new doctor into doc_on_call
app.post('/doctorOnCall', (req, response) => {
  const {
    depName
  } = req.body;

  pool.getConnection((err, conn) => {
    if (err) throw err;

    conn.beginTransaction(function (e) {
      if (e) throw e;

      // QUERYING: Checking if depName already exists in department table
      conn.query({
        sql: "SELECT D_NAME FROM department WHERE D_NAME = ?",
        timeout: 40000,
        values: [depName]
      }, (e, res) => {
        if (e)
          return conn.rollback(function () {
            throw e;
          });

        // If depName not found INSERT QUERYING to department table
        if (res.length !== 0) {
          insertIntoAllDoctors(conn, 2, req.body);
          response.status(200).json({
            message: "Success"
          });
        } else {
          // else INSERTING into department table
          insertIntoDepartment(conn, 2, req.body);
          response.status(200).json({
            message: "Success"
          });
        }
      });
    });
  });
});

// UPDATE: update doc_reg by {id}
app.put('/doctorRegistration', (req, res) => {
  const {
    name,
    depName,
    depLocation,
    address,
    phoneNo,
    facilities,
    qualification,
    salary,
    doj,
    EN_TIME,
    EX_TIME
  } = req.body;
  const id = req.query.id;

  pool.getConnection((err, conn) => {
    if (err) throw err;
    // QUERYING: Checking if depName already exists
    conn.query({
      sql: "SELECT `DOC_NO` FROM `all_doctors` WHERE DOC_NO = ?",
      timeout: 40000,
      values: [id]
    }, (e, result) => {
      if (e) throw e;

      if (result.length > 0) {
        // Update department table
        var query = `
          UPDATE \`department\` SET \`D_NAME\` = ?, \`D_LOCATION\` = ?, \`FACILITIES\` = ? 
          WHERE D_NAME = (SELECT all_doctors.DEPARTMENT FROM all_doctors WHERE all_doctors.DOC_NO = ?);
          `;

        // Update all_doctors table
        query += `
          UPDATE \`all_doctors\` SET \`DEPARTMENT\` = ? WHERE DOC_NO = ?;
          `;

        // Update doc_reg table
        query += `
        UPDATE
        \`doc_reg\`
    SET
        \`D_NAME\` = ?,
        \`QUALIFICATION\` = ?,
        \`SALARY\` = ?,
        \`EN_TIME\` = ?,
        \`EX_TIME\` = ?,
        \`ADDRESS\` = ?,
        \`PH_NO\` = ?,
        \`DOJ\` = ?
    WHERE
        DOC_NO = ?
          `;

        conn.query({
          sql: query,
          timeout: 40000,
          values: [
            depName, depLocation, facilities, id,
            depName, id,
            name, qualification, salary, EN_TIME, EX_TIME, address, phoneNo, doj, id
          ]
        }, (e1, result1) => {
          if (e1) throw e1;

          console.log(result1);
          res.status(201).json({
            message: 'Updated successfully!'
          });
        });
      } else {
        res.status(500).json({
          message: 'Something went wrong',
        });
      }

      // When done with the connection, release it.
      conn.release();

      // Handle error after the release.
      if (e) throw e;
    });
  });
});

// UPDATE: update doc_on_call by {id}
app.put('/doctorOnCall', (req, res) => {
  const {
    name,
    depName,
    depLocation,
    address,
    phoneNo,
    facilities,
    qualification,
    fpc,
    pd,
  } = req.body;
  const id = req.query.id;

  pool.getConnection((err, conn) => {
    if (err) throw err;
    // QUERYING: Checking if depName already exists
    conn.query({
      sql: "SELECT `DOC_NO` FROM `all_doctors` WHERE DOC_NO = ?",
      timeout: 40000,
      values: [id]
    }, (e, result) => {
      if (e) throw e;

      if (result.length > 0) {
        // Update department table
        var query = `
          UPDATE \`department\` SET \`D_NAME\` = ?, \`D_LOCATION\` = ?, \`FACILITIES\` = ? 
          WHERE D_NAME = (SELECT all_doctors.DEPARTMENT FROM all_doctors WHERE all_doctors.DOC_NO = ?);
          `;
        // Update all_doctors table
        query += `
          UPDATE \`all_doctors\` SET \`DEPARTMENT\` = ? WHERE DOC_NO = ?;
          `;

        // Update doc_on_call table
        query += `
          UPDATE \`doc_on_call\` 
          SET \`D_NAME\` = ?,
            \`QUALIFICATION\` = ?,
            \`FS_PR_CL\` = ?,
            \`PYMT_DU\` = ?,
            \`ADDRESS\` = ?,
            \`PH_NO\` = ?
          WHERE DOC_NO = ?
          `;

        conn.query({
          sql: query,
          timeout: 40000,
          values: [
            depName, depLocation, facilities, id,
            depName, id,
            name, qualification, fpc, pd, address, phoneNo, id
          ]
        }, (e1, result1) => {
          if (e1) throw e1;

          console.log(result1);
          res.status(201).json({
            message: 'Updated successfully!'
          });
        });
      } else {
        res.status(500).json({
          message: 'Something went wrong',
        });
      }

      // When done with the connection, release it.
      conn.release();

      // Handle error after the release.
      if (e) throw e;
    });
  });
});

app.delete('/deleteDoctor', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;

    connection.query({
      sql: 'DELETE FROM `department` WHERE D_NAME = (SELECT all_doctors.DEPARTMENT FROM all_doctors WHERE all_doctors.DOC_NO = ?)',
      timeout: 40000,
      values: [req.query.id]
    }, (e, result) => {
      if (e) throw e;
      console.log(result);

      res.status(200).json({
        message: 'Deleted successfully!'
      });

      // When done with the connection, release it.
      connection.release();

      // Handle error after the release.
      if (e) throw e;
    });
  });
});

app.use('/patient', patientApi);
app.use('/room', roomApi);

module.exports = app;