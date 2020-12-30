const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//Middleware
app.use(cors());
app.use(express.json()); //Allows the usage of req.body

//ROUTES
//Create todo
// INSERT INTO <table name> (column name) VALUES($1) RETURNING *, [value];
app.post("/todos", async(req, res) => {
    try {
        const { description } = req.body;

        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );

        res.json(newTodo.rows[0]);

    } catch (error) {
        console.error(error.message);
    }
});

//get all todos
// SELECT * FROM <table name>;
app.get("/todos", async(req, res) => {
    try {
      const allTodos = await pool.query(
          "SELECT * FROM todo"
      );
  
      res.json(allTodos.rows);
      
  } catch (error) {   
      console.error(error.message);
  }
  });

//get specific todo 
// SELECT * FROM <table name> WHERE <column name> = $1, [value];
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const specificTodo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1",
            [ id ]
        );

        res.json(specificTodo.rows[0]);
    } catch (error) {
        console.error(error);
    }
});

//update todo
// UPDATE <table name> SET <column name> = $1 WHERE <some other column> = $2,[value1, value2];
app.put("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;

        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
        );

        res.json("Todo was updated");
    } catch (err) {
        console.error(err.message);
    }
});

//delete todo
// DELETE FROM <table name> WHERE <column name> = $1, [value];
app.delete("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [ id ]
            );

        res.json("Todo was deleted!");
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(5000, () => {
    console.log("Server started on port 5000!");
})