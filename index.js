const sql = require('mssql')
const express = require("express")
const dbConnection = require("./utilities/connection")
const port = 3005
const app = express()

//Three important concepts in express

//midllewares
app.use(express.json())

//routers

//controllers
app.get('/students', async(req, res) => {
    const connection = await dbConnection()
        /*var config = {
            server: 'localhost',
            database: 'StudentRestApiDb',
            user: 'Jaysen',
            password: 'GECA1234',
            port: 1433
        };
        //var connection = new sql.ConnectionPool(config).;*/
    try {
        connection.connect()
        const students = await (await new sql.ConnectionPool(config).connect()).query(`select * from students`)
        console.log(students)
        res.send({
            "status": "success",
            "data": []
        }).end()
    } catch (error) {
        console.log(error.stack)
        res.send({
            "status": "error",
            "data": []
        }).end()
    } finally {
        connection.close()
    }
})

app.post('/students', async(req, res) => {
    const connection = await dbConnection()
    try {
        connection.connect()
        const students = await connection.query(`insert into students values(${req.body.id}, ${req.body.name})`)
        console.log(students)
        res.send({
            "status": "success"
        }).end()
    } catch (error) {
        console.log(error.stack)
        res.send({
            "status": "error"
        }).end()
    } finally {
        connection.close()
    }
})

app.put('/students/:id', async(req, res) => {
    const connection = await dbConnection()
    try {
        connection.connect()
        const students = await connection.query(`update students set name=${req.body.name} where id = ${req.body.id}`)
        console.log(students)
        res.send({
            "status": "success"
        }).end()
    } catch (error) {
        console.log(error.stack)
        res.send({
            "status": "error"
        }).end()
    } finally {
        connection.close()
    }
})

app.delete('/students/:id', async(req, res) => {
    const connection = await dbConnection()
    try {
        connection.connect()
        const students = await connection.query(`delete from students where id = ${req.body.id}`)
        console.log(students)
        res.send({
            "status": "success"
        }).end()
    } catch (error) {
        console.log(error.stack)
        res.send({
            "status": "error"
        }).end()
    } finally {
        connection.close()
    }
})

app.listen(port, () => {
    console.log(`Server listning on port no ${port}`)
})