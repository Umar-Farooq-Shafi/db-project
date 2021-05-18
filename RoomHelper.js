const app = require('express')();

const pool = require('./MySQLCon');

// GET: get all rooms
app.get('/', (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) throw err;
        
        conn.query({
            sql: `
            SELECT * FROM room_details
            `,
            timeout: 50000,
            values: []
        }, (e, r) => {
            if (e) throw e;

            console.log(r);
            res.status(200).json(r);

            conn.release();

            if (e) throw e;

        });
    });
});

// GET: single room by id
app.get('/single', (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) throw err;
        const id = req.query.id;
        
        conn.query({
            sql: `
            SELECT * FROM room_details WHERE ROOM_NO = ?
            `,
            timeout: 50000,
            values: [id]
        }, (e, r) => {
            if (e) throw e;

            console.log(r);
            res.status(200).json(r);

            conn.release();

            if (e) throw e;

        });
    });
});

// POST: Add new room detail
app.post('/', (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) throw err;

        const {
            TYPE, STATUS, RM_DL_CRG, OTHER_CRG
        } = req.body;
        
        conn.query({
            sql: `
            INSERT INTO \`room_details\`(
                \`TYPE\`,
                \`STATUS\`,
                \`RM_DL_CRG\`,
                \`OTHER_CRG\`
            )
            VALUES(
                ?,
                ?,
                ?,
                ?
            )
            `,
            timeout: 50000,
            values: [TYPE, STATUS, RM_DL_CRG, OTHER_CRG]
        }, (e, r) => {
            if (e) throw e;

            console.log(r);
            res.status(200).send();

            conn.release();

            if (e) throw e;

        });
    });
});

// PUT: update room by {id}
app.put('/single', (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) throw err;
        
        const {
            TYPE, STATUS, RM_DL_CRG, OTHER_CRG
        } = req.body;
        const id = req.query.id;

        conn.query({
            sql: `
            UPDATE
            \`room_details\`
        SET
            \`TYPE\` = ?,
            \`STATUS\` = ?,
            \`RM_DL_CRG\` = ?,
            \`OTHER_CRG\` = ?
        WHERE
            ROOM_NO = ?
            `,
            timeout: 50000,
            values: [TYPE, STATUS, RM_DL_CRG, OTHER_CRG, id]
        }, (e, r) => {
            if (e) throw e;

            console.log(r);
            res.status(200).send();

            conn.release();

            if (e) throw e;

        })


    });
});

// DELETE room
app.delete('/', (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) throw err;
        const id = req.query.id;

        conn.query({
            sql: 'DELETE FROM `room_details` WHERE ROOM_NO = ?',
            timeout: 50000,
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
