// METHOD to insert data into department table
const insertIntoDepartment = (conn, type, data) => {
  const {
    depName,
    depLocation,
    facilities,
  } = data;
  
  conn.query({
    sql: "INSERT INTO `department`(`D_NAME`, `D_LOCATION`, `FACILITIES`) VALUES (?, ?, ?)",
    timeout: 40000,
    values: [depName, depLocation, facilities]
  }, (e) => {
    if (e) {
      return conn.rollback(function () {
        throw e;
      });
    }

    insertIntoAllDoctors(conn, type, data);
  });
};

// METHOD to insert in all_doctors table
const insertIntoAllDoctors = (conn, type, data) => {
  const {
    id,
    depName,
  } = data;
  console.log(data);

  conn.query({
    sql: "INSERT INTO `all_doctors`(`DOC_NO`, `DEPARTMENT`) VALUES (?, ?)",
    timeout: 40000,
    values: [id, depName]
  }, (error) => {
    if (error) {
      return conn.rollback(function () {
        throw error;
      });
    } 

    if (type !== 1) {
      insertIntoDocOnCall(conn, data);
    } else {
      insertIntoDocReg(conn, data);
    }
  });
}

// METHOD to insert into doc_on_call table
const insertIntoDocOnCall = (conn, data) => {
  const {
    id,
    name,
    address,
    phoneNo,
    qualification,
    fpc,
    pd
  } = data;

  conn.query({
    sql: `INSERT INTO \`doc_on_call\`(
      \`DOC_NO\`, \`D_NAME\`, \`QUALIFICATION\`, \`FS_PR_CL\`, \`PYMT_DU\`, \`ADDRESS\`, \`PH_NO\`
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    timeout: 40000,
    values: [id, name, qualification, fpc, pd, address, phoneNo]
  }, (error, res) => {
    if (error) {
      return conn.rollback(function () {
        throw error;
      });
    }

    console.log(res);

    conn.commit(function (err) {
      if (err) {
        return conn.rollback(function () {
          throw err;
        });
      }
    });
  });
};

// METHOD to insert in doc_reg table
const insertIntoDocReg = (conn, data) => {
  const {
    id,
    name,
    address,
    phoneNo,
    qualification,
    salary,
    doj,
    EN_TIME,
    EX_TIME
  } = data;

  conn.query({
    sql: `INSERT INTO \`doc_reg\`(
      \`DOC_NO\`, \`D_NAME\`, \`QUALIFICATION\`, \`SALARY\`, 
      \`EN_TIME\`, \`EX_TIME\`, \`ADDRESS\`, \`PH_NO\`, \`DOJ\`
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    timeout: 40000,
    values: [id, name, qualification, salary, EN_TIME, EX_TIME, address, phoneNo, doj]
  }, (e, res) => {
    if (e) throw e;

    console.log(res);

    conn.commit(function (err) {
      if (err) {
        return conn.rollback(function () {
          throw err;
        });
      }
    });
  });
}

module.exports = {
  insertIntoDepartment,
  insertIntoAllDoctors
};