const sql = require('mssql')
require("dotenv").config()

async function dbConnection() {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        return await sql.connect(`Server=${process.env.SERVER},1433;Database=${process.env.DATABASE};User Id=${process.env.USER_ID};Password=${process.env.PASSWORD};Encrypt=true;TrustServerCertificate=True`)
            //Server=localhost;Database=master;Trusted_Connection=True;
            //return await sql.connect(`Server=localhost;Database=StudentRestApiDb;Trusted_Connection=True;`)
    } catch (err) {
        // ... error checks
        console.log(err.stack);
    }
}

module.exports = dbConnection;