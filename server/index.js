import json  from 'body-parser';
import express from 'express';
import cors from 'cors';
import {pool} from './db.js';

const port = 8000;

const app = express();

app.use(cors());

app.use(express.json());


app.post("/submit", async (req, res) => {
    try {
        const { addressTo, amount, keyword, message } = req.body;
        const addToDB = await pool.query("INSERT INTO TRANSACTION_LOG (address_to, amount, keyword, message) VALUES($1, $2, $3, $4)", 
            [addressTo, amount, keyword, message]);
        res.json(addToDB.rows[0]);
    } catch (error) {
        console.log(error);
    }
});

app.get("/", async (req, res) => {
    try {
        const showAllDB = await pool.query('SELECT * FROM TRANSACTION_LOG');
        res.json(showAllDB.rows);
    } catch (error) {
        console.log(error);
    }
})

app.listen(port, () => {
    console.log("server stated");
});