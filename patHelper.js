const pool = require('./MySQLCon');

const addIntoEntry = (type, data) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.beginTransaction((e) => {
            if (e) throw e;

            connection.query({
                sql: `INSERT INTO \`pat_entry\`(
                    \`PAT_NAME\`, 
                    \`CHKUP_DT\`,
                    \`PT_AGE\`, 
                    \`SEX\`, 
                    \`DIAGNOSIS\`, 
                    \`RFD\`, 
                    \`ADDRESS\`, 
                    \`CITY\`,
                    \`PH_NO\`, 
                    \`DEPARTMENT\`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
                    SELECT MAX(\`PAT_NO\`) as no FROM pat_entry`,
                timeout: 50000,
                values: [
                    data.PAT_NAME, data.CHKUP_DT, data.PT_AGE, data.SEX,
                    data.DIAGNOSIS, data.RFD, data.ADDRESS, data.CITY, data.PH_NO, data.DEPARTMENT
                ]
            }, (e, result) => {
                if (e)
                    return connection.rollback(function () {
                        throw e;
                    });

                addIntoCheckup(connection, type, data, result[1][0].no);
            });
        });
    });
}
 
const addIntoCheckup = (connection, type, data, id) => {
    connection.query({
        sql: `INSERT INTO \`pat_chkup\`(
                \`PAT_NO\`,
                \`DOC_NO\`, 
                \`DIAGNOSIS\`, 
                \`CHKUP_DT\`, 
                \`STATUS\`, 
                \`TREATMENT\`) VALUES (?, ?, ?, ?, ?, ?)`,
        timeout: 50000,
        values: [id, data.RFD, data.DIAGNOSIS, data.CHKUP_DT, data.STATUS, data.TREATMENT]
    }, (e, result) => {
        if (e)
            return connection.rollback(function () {
                throw e;
            });

        if (type === 1)
            addIntoRegular(connection, data, id);
        else if (type === 2)
            addIntoAdmit(connection, data, id);
        else if (type === 3)
            addIntoDischarge(connection, data, id);
        else
            addIntoOperation(connection, data, id);
    });
}

const addIntoRegular = (connection, data, id) => {
    connection.query({
        sql: `INSERT INTO \`pat_reg\`(
                \`PAT_NO\`,
                \`DATE_VIS\`, 
                \`cond\`,
                \`TREATMENT\`, 
                \`MEDICINES\`, 
                \`DOC_NO\`, 
                \`PAYMT\`) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        timeout: 50000,
        values: [id, data.DATE_VIS, data.cond,
            data.TREATMENT, data.MEDICINES, data.RFD, data.PYMT_GV
        ]
    }, (e, result) => {
        if (e)
            return connection.rollback(function () {
                throw e;
            });

        console.log(result);

        connection.commit(function (err) {
            if (err) {
                return connection.rollback(function () {
                    throw err;
                });
            }
            console.log('success!');
        });
    });
}

const addIntoAdmit = (connection, data, id) => {
    connection.query({
        sql: `INSERT INTO \`pat_admit\`(
                \`PAT_NO\`,
                \`ADV_PYMT\`, 
                \`MODE_PYMT\`, 
                \`ROOM_NO\`, 
                \`DEPTNAME\`, 
                \`ADMTD_ON\`, 
                \`COND_ON\`, 
                \`TRMT_SDT\`, 
                \`ATTDNT_NM\`) VALUES (?,?,?,?,?,?,?,?,?)`,
        timeout: 50000,
        values: [id, data.ADV_PYMT, data.MODE_PYMT, data.ROOM_NO, data.DEPARTMENT,
            data.ADMTD_ON, data.COND_ON, data.RFD, data.ATTDNT_NM
        ]
    }, (e, result) => {
        if (e)
            return connection.rollback(function () {
                throw e;
            });

        console.log(result);

        connection.commit(function (err) {
            if (err) {
                return connection.rollback(function () {
                    throw err;
                });
            }
            console.log('success!');
        });
    });
}

const addIntoDischarge = (connection, data, id) => {
    connection.query({
        sql: `INSERT INTO \`pat_dis\`(
            \`PAT_NO\`,
            \`TR_ADVS\`,
            \`TR_GVN\`, 
            \`MEDICINES\`, 
            \`PYMT_GV\`, 
            \`DIS_ON\`) VALUES (?, ?,?,?,?,?)`,
        timeout: 50000,
        values: [id, data.TR_ADVS, data.TR_GVN, data.MEDICINES,
            data.PYMT_GV, ''
        ]
    }, (e, result) => {
        if (e)
            return connection.rollback(function () {
                throw e;
            });

        console.log(result);

        connection.commit(function (err) {
            if (err) {
                return connection.rollback(function () {
                    throw err;
                });
            }
            console.log('success!');
        });
    });
}

const addIntoOperation = (connection, data, id) => {
    connection.query({
        sql: `INSERT INTO \`pat_opr\`(
            \`PAT_NO\`,
            \`DATE_OPR\`, 
            \`IN_COND\`, 
            \`AFOP_COND\`, 
            \`TY_OPERATION\`, 
            \`MEDICINES\`, 
            \`DOC_NO\`, 
            \`OPTH_NO\`, 
            \`OTHER_SUG\`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        timeout: 50000,
        values: [id, data.DATE_OPR, data.IN_COND, data.AFOP_COND,
            data.TY_OPERATION, data.MEDICINES, data.RFD, data.DEPARTMENT, ''
        ]
    }, (e, result) => {
        if (e)
            return connection.rollback(function () {
                throw e;
            });

        console.log(result);

        connection.commit(function (err) {
            if (err) {
                return connection.rollback(function () {
                    throw err;
                });
            }
            console.log('success!');
        });
    });
}

module.exports = addIntoEntry;