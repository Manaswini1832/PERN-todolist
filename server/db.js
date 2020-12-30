const Pool = require("pg").Pool;

//Database details go here
const pool = new Pool({
    user: "",
    password: "",
    database : "",
    host: "",
    port: <port number here>
});

module.exports = pool;