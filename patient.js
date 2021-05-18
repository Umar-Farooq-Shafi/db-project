const app = require('express')();
const pool = require('./MySQLCon');

const addIntoEntry = require('./patHelper');

// GET: get pat_reg data
app.get('/regular', (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query({
            sql: `SELECT 
            p.PAT_NO,
            p.PAT_NAME,
            p.PT_AGE,
            p.SEX,
            p.ADDRESS,
            p.DEPARTMENT,
            d.D_NAME,
            r.cond,
            r.PAYMT FROM pat_reg r
                INNER JOIN pat_entry p ON p.PAT_NO = r.PAT_NO
                INNER JOIN doc_reg d ON d.DOC_NO = r.DOC_NO`,
            timeout: 40000,
            values: []
        }, (e, result) => {
            if (e) throw e;

            console.log(result);

            res.status(200).json(result);

            conn.release();

            if (e) throw e;
        });
    });
});

// GET: get pat_admit data
app.get('/admit', (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query({
            sql: `SELECT p.PAT_NO, p.PAT_NAME, p.PT_AGE, p.SEX, p.ADDRESS, p.DEPARTMENT, d.D_NAME, a.INVSTGTN_DN, a.ADV_PYMT, a.COND_ON FROM pat_admit a INNER JOIN pat_entry p ON p.PAT_NO = a.PAT_NO INNER JOIN doc_reg d ON d.DOC_NO = a.TRMT_SDT`,
            timeout: 40000,
            values: []
        }, (e, result) => {
            if (e) throw e;

            console.log(result);

            res.status(200).json(result);

            conn.release();

            if (e) throw e;
        });
    });
});

// GET: get pat_dis data
app.get('/discharge', (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query({
            sql: `SELECT p.PAT_NO, p.PAT_NAME, p.PT_AGE, p.SEX, p.ADDRESS, p.DEPARTMENT, d.D_NAME, a.TR_ADVS, a.TR_GVN, a.DIS_ON FROM pat_dis a INNER JOIN pat_entry p ON p.PAT_NO = a.PAT_NO INNER JOIN doc_reg d ON d.DOC_NO = p.RFD`,
            timeout: 40000,
            values: []
        }, (e, result) => {
            if (e) throw e;

            console.log(result);

            res.status(200).json(result);

            conn.release();

            if (e) throw e;
        });
    });
});

// GET: get pat_opr data
app.get('/operation', (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query({
            sql: `SELECT p.PAT_NO, p.PAT_NAME, p.PT_AGE, p.SEX, p.ADDRESS, p.DEPARTMENT, d.D_NAME, a.DATE_OPR, a.IN_COND, a.TY_OPERATION, a.OTHER_SUG FROM pat_opr a INNER JOIN pat_entry p ON p.PAT_NO = a.PAT_NO INNER JOIN doc_reg d ON d.DOC_NO = p.RFD`,
            timeout: 40000,
            values: []
        }, (e, result) => {
            if (e) throw e;

            console.log(result);

            res.status(200).json(result);

            conn.release();

            if (e) throw e;
        });
    });
});

// POST: insert into pat_reg table 
app.post('/regular', (req, res) => {
    addIntoEntry(1, req.body);

    res.status(200).json({
        message: "OK"
    });
});

// POST: insert into pat_admit table 
app.post('/admit', (req, res) => {
    addIntoEntry(2, req.body);

    res.sendStatus(200).json({
        message: 'OK'
    });
});

// POST: insert into pat_dis table 
app.post('/discharge', (req, res) => {
    addIntoEntry(3, req.body);

    res.sendStatus(200).json({
        message: 'OK'
    });
});

// POST: insert into pat_opr table 
app.post('/operation', (req, res) => {
    addIntoEntry(4, req.body);

    res.sendStatus(200).json({
        message: 'OK'
    });
});

// GET: get pat_reg {id}
app.get('/getRegular', (req, res) => {
    const id = req.query.id;

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query({
            sql: `SELECT 
            e.PAT_NAME, e.ADDRESS, e.PH_NO, e.CITY, e.SEX, e.RFD, e.DEPARTMENT, e.CHKUP_DT, r.TREATMENT, 
            e.DIAGNOSIS, r.DATE_VIS, r.MEDICINES, r.TREATMENT, e.PT_AGE, r.cond FROM pat_entry e
            INNER JOIN pat_reg r ON e.PAT_NO = r.PAT_NO
        WHERE r.PAT_NO = ?`,
            timeout: 40000,
            values: [id]
        }, (e, result) => {
            if (e) throw e;

            res.status(200).json(result);

            conn.release();

            if (e) throw e;
        });
    });
});

// PUT: update pat_reg {id}
app.put('/updateRegular', (req, res) => {
    const id = req.query.id;
    const {
        PAT_NAME,
        CHKUP_DT,
        PT_AGE,
        SEX,
        DIAGNOSIS,
        RFD,
        ADDRESS,
        CITY,
        PH_NO,
        DEPARTMENT,
        STATUS,
        TREATMENT,
        cond,
        MEDICINES,
        PAYMT,
        DATE_VIS
    } = req.body;

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query({
            sql: `UPDATE \`pat_entry\` 
                SET \`PAT_NAME\` = ?, 
                    \`CHKUP_DT\` = ?,
                    \`PT_AGE\`= ?, 
                    \`SEX\` = ?, 
                    \`DIAGNOSIS\` = ?, 
                    \`RFD\`= ?, 
                    \`ADDRESS\`=?,
                    \`CITY\` = ?,
                    \`PH_NO\` = ?,
                    \`DEPARTMENT\` = ? WHERE PAT_NO = ?;
                UPDATE \`pat_chkup\` 
                    SET \`DOC_NO\` = ?,
                    \`DIAGNOSIS\` = ?,
                    \`CHKUP_DT\` = ?,
                    \`STATUS\` = ?, 
                    \`TREATMENT\` = ? WHERE PAT_NO = ?;
                UPDATE \`pat_reg\` 
                SET \`DATE_VIS\` = ?,
                    \`cond\` = ?,
                    \`TREATMENT\` = ?,
                    \`MEDICINES\` = ?,
                    \`DOC_NO\` = ?,
                    \`PAYMT\` = ? WHERE PAT_NO = ?`,
            timeout: 40000,
            values: [
                PAT_NAME, CHKUP_DT, PT_AGE, SEX, DIAGNOSIS, RFD, ADDRESS, CITY, PH_NO, DEPARTMENT, id,
                RFD, DIAGNOSIS, CHKUP_DT, STATUS, TREATMENT, id,
                DATE_VIS, cond, TREATMENT, MEDICINES, RFD, PAYMT, id
            ]
        }, (e, result) => {
            if (e) throw e;

            console.log(result);
            res.status(200).send();

            conn.release();

            if (e) throw e;
        });
    });
});

// GET: get pat_admit {id}
app.get('/getAdmit', (req, res) => {
    const id = req.query.id;

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query({
            sql: `SELECT e.PAT_NAME, e.ADDRESS, e.PH_NO, e.CITY, e.SEX, e.RFD, e.DEPARTMENT, e.CHKUP_DT, a.ADV_PYMT, e.DIAGNOSIS, a.ROOM_NO, a.COND_ON, a.ATTDNT_NM, e.PT_AGE, c.TREATMENT FROM pat_entry e INNER JOIN pat_admit a ON e.PAT_NO = a.PAT_NO INNER JOIN pat_chkup c ON c.PAT_NO = a.PAT_NO WHERE a.PAT_NO = ?`,
            timeout: 40000,
            values: [id]
        }, (e, result) => {
            if (e) throw e;

            res.status(200).json(result);

            conn.release();

            if (e) throw e;
        });
    });
});

// PUT: update pat_admit {id}
app.put('/updateAdmit', (req, res) => {
    const id = req.query.id;
    const {
        PAT_NAME,
        CHKUP_DT,
        PT_AGE,
        SEX,
        DIAGNOSIS,
        RFD,
        ADDRESS,
        CITY,
        PH_NO,
        DEPARTMENT,
        STATUS,
        TREATMENT,
        ADV_PYMT,
        MODE_PYMT,
        ADMTD_ON,
        ROOM_NO,
        ATTDNT_NM,
        COND_ON
    } = req.body;

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query({
            sql: `UPDATE \`pat_entry\` 
                SET \`PAT_NAME\` = ?, 
                    \`CHKUP_DT\` = ?,
                    \`PT_AGE\`= ?, 
                    \`SEX\` = ?, 
                    \`DIAGNOSIS\` = ?, 
                    \`RFD\`= ?, 
                    \`ADDRESS\`=?,
                    \`CITY\` = ?,
                    \`PH_NO\` = ?,
                    \`DEPARTMENT\` = ? WHERE PAT_NO = ?;
                UPDATE \`pat_chkup\` 
                    SET \`DOC_NO\` = ?,
                    \`DIAGNOSIS\` = ?,
                    \`CHKUP_DT\` = ?,
                    \`STATUS\` = ?, 
                    \`TREATMENT\` = ? WHERE PAT_NO = ?;
                UPDATE \`pat_admit\` 
                    SET \`ADV_PYMT\` = ?,
                    \`MODE_PYMT\` = ?,
                    \`ROOM_NO\` = ?,
                    \`DEPTNAME\` = ?,
                    \`ADMTD_ON\` = ?,
                    \`COND_ON\` = ?,
                    \`INVSTGTN_DN\` = ?,
                    \`TRMT_SDT\` = ?,
                    \`ATTDNT_NM\` = ? WHERE PAT_NO = ?`,
            timeout: 40000,
            values: [
                PAT_NAME, CHKUP_DT, PT_AGE, SEX, DIAGNOSIS, RFD, ADDRESS, CITY, PH_NO, DEPARTMENT, id,
                RFD, DIAGNOSIS, CHKUP_DT, STATUS, TREATMENT, id,
                ADV_PYMT, MODE_PYMT, ROOM_NO, DEPARTMENT, ADMTD_ON, COND_ON, '', RFD, ATTDNT_NM, id
            ]
        }, (e, result) => {
            if (e) throw e;

            console.log(result);
            res.status(200).send();

            conn.release();

            if (e) throw e;
        });
    });
});

// GET: get pat_dis {id}
app.get('/getDischarge', (req, res) => {
    const id = req.query.id;

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query({
            sql: `SELECT e.PAT_NAME, e.ADDRESS, e.PH_NO, e.CITY, e.SEX, e.RFD, e.DEPARTMENT, e.CHKUP_DT, d.TR_GVN, e.DIAGNOSIS, d.TR_ADVS, d.PYMT_GV, e.PT_AGE, c.TREATMENT FROM pat_entry e INNER JOIN pat_dis d ON e.PAT_NO = d.PAT_NO INNER JOIN pat_chkup c ON c.PAT_NO = d.PAT_NO WHERE d.PAT_NO = ?`,
            timeout: 40000,
            values: [id]
        }, (e, result) => {
            if (e) throw e;

            res.status(200).json(result);

            conn.release();

            if (e) throw e;
        });
    });
});

// PUT: update pat_dis {id}
app.put('/updateDischarge', (req, res) => {
    const id = req.query.id;
    const {
        PAT_NAME,
        CHKUP_DT,
        PT_AGE,
        SEX,
        DIAGNOSIS,
        RFD,
        ADDRESS,
        CITY,
        PH_NO,
        DEPARTMENT,
        STATUS,
        TREATMENT,
        TR_ADVS,
        TR_GVN,
        MEDICINES,
        DIS_ON,
        PYMT_GV
    } = req.body;

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query({
            sql: `UPDATE \`pat_entry\` 
                SET \`PAT_NAME\` = ?, 
                    \`CHKUP_DT\` = ?,
                    \`PT_AGE\`= ?, 
                    \`SEX\` = ?, 
                    \`DIAGNOSIS\` = ?, 
                    \`RFD\`= ?, 
                    \`ADDRESS\`=?,
                    \`CITY\` = ?,
                    \`PH_NO\` = ?,
                    \`DEPARTMENT\` = ? WHERE PAT_NO = ?;
                UPDATE \`pat_chkup\` 
                    SET \`DOC_NO\` = ?,
                    \`DIAGNOSIS\` = ?,
                    \`CHKUP_DT\` = ?,
                    \`STATUS\` = ?, 
                    \`TREATMENT\` = ? WHERE PAT_NO = ?;
                UPDATE \`pat_dis\` 
                    SET \`TR_ADVS\` = ?,
                        \`TR_GVN\` = ?,
                        \`MEDICINES\` = ?,
                        \`PYMT_GV\` = ?,
                        \`DIS_ON\` = ? WHERE PAT_NO = ?`,
            timeout: 40000,
            values: [
                PAT_NAME, CHKUP_DT, PT_AGE, SEX, DIAGNOSIS, RFD, ADDRESS, CITY, PH_NO, DEPARTMENT, id,
                RFD, DIAGNOSIS, CHKUP_DT, STATUS, TREATMENT, id,
                TR_ADVS, TR_GVN, MEDICINES, PYMT_GV, DIS_ON, id
            ]
        }, (e, result) => {
            if (e) throw e;

            console.log(result);
            res.status(200).send();

            conn.release();

            if (e) throw e;
        });
    });
});

// GET: get pat_op {id}
app.get('/getOperation', (req, res) => {
    const id = req.query.id;

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query({
            sql: `SELECT e.PAT_NAME, e.ADDRESS, e.PH_NO, e.CITY, e.SEX, e.RFD, e.DEPARTMENT, e.CHKUP_DT, e.DIAGNOSIS, o.DATE_OPR, o.TY_OPERATION, e.PT_AGE, c.TREATMENT, o.IN_COND, o.AFOP_COND, o.OPTH_NO FROM pat_entry e INNER JOIN pat_opr o ON e.PAT_NO = o.PAT_NO INNER JOIN pat_chkup c ON c.PAT_NO = o.PAT_NO WHERE o.PAT_NO = ?`,
            timeout: 40000,
            values: [id]
        }, (e, result) => {
            if (e) throw e;

            res.status(200).json(result);

            conn.release();

            if (e) throw e;
        });
    });
});

// PUT: update pat_op {id}
app.put('/updateOperation', (req, res) => {
    const id = req.query.id;
    const {
        PAT_NAME,
        CHKUP_DT,
        PT_AGE,
        SEX,
        DIAGNOSIS,
        RFD,
        ADDRESS,
        CITY,
        PH_NO,
        DEPARTMENT,
        STATUS,
        TREATMENT,
        MEDICINES,
        DATE_OPR,
        AFOP_COND,
        IN_COND,
        TY_OPERATION,
        OPTH_NO
    } = req.body;

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query({
            sql: `UPDATE \`pat_entry\` 
                SET \`PAT_NAME\` = ?, 
                    \`CHKUP_DT\` = ?,
                    \`PT_AGE\`= ?, 
                    \`SEX\` = ?, 
                    \`DIAGNOSIS\` = ?, 
                    \`RFD\`= ?, 
                    \`ADDRESS\`=?,
                    \`CITY\` = ?,
                    \`PH_NO\` = ?,
                    \`DEPARTMENT\` = ? WHERE PAT_NO = ?;
                UPDATE \`pat_chkup\` 
                    SET \`DOC_NO\` = ?,
                    \`DIAGNOSIS\` = ?,
                    \`CHKUP_DT\` = ?,
                    \`STATUS\` = ?, 
                    \`TREATMENT\` = ? WHERE PAT_NO = ?;
                UPDATE \`pat_opr\`
                    SET \`DATE_OPR\` = ?,
                    \`IN_COND\` = ?, 
                    \`AFOP_COND\` = ?,
                    \`TY_OPERATION\` = ?,
                    \`MEDICINES\` = ?,
                    \`DOC_NO\` = ?,
                    \`OPTH_NO\` = ? WHERE PAT_NO = ?`,
            timeout: 40000,
            values: [
                PAT_NAME, CHKUP_DT, PT_AGE, SEX, DIAGNOSIS, RFD, ADDRESS, CITY, PH_NO, DEPARTMENT, id,
                RFD, DIAGNOSIS, CHKUP_DT, STATUS, TREATMENT, id,
                DATE_OPR, IN_COND, AFOP_COND, TY_OPERATION, MEDICINES, RFD, OPTH_NO, id
            ]
        }, (e, result) => {
            if (e) throw e;

            console.log(result);
            res.status(200).send();

            conn.release();

            if (e) throw e;
        });
    });
});

// DELETE: delete pat_reg {id}
app.delete('/deleteRegular', (req, res) => {
    const id = req.query.id;

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query({
            sql: 'DELETE FROM `pat_reg` WHERE PAT_NO = ?',
            timeout: 40000,
            values: [id]
        }, (e, r) => {
            if (e) throw e;
            console.log(r);

            res.status(200).send();

            conn.release();

            if (e) throw e;
        });
    });
});

// DELETE: delete pat_admit {id}
app.delete('/deleteAdmit', (req, res) => {
    const id = req.query.id;

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query({
            sql: 'DELETE FROM `pat_admit` WHERE PAT_NO = ?',
            timeout: 40000,
            values: [id]
        }, (e, r) => {
            if (e) throw e;
            console.log(r);

            res.status(200).send();

            conn.release();

            if (e) throw e;
        });
    });
});

// DELETE: delete pat_dis {id}
app.delete('/deleteDischarge', (req, res) => {
    const id = req.query.id;

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query({
            sql: 'DELETE FROM `pat_dis` WHERE PAT_NO = ?',
            timeout: 40000,
            values: [id]
        }, (e, r) => {
            if (e) throw e;
            console.log(r);

            res.status(200).send();

            conn.release();

            if (e) throw e;
        });
    });
});

// DELETE: delete pat_opr {id}
app.delete('/deleteOperation', (req, res) => {
    const id = req.query.id;

    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query({
            sql: 'DELETE FROM `pat_opr` WHERE PAT_NO = ?',
            timeout: 40000,
            values: [id]
        }, (e, r) => {
            if (e) throw e;
            console.log(r);

            res.status(200).send();

            conn.release();

            if (e) throw e;
        });
    });
});

module.exports = app;