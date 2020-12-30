import { useEffect, useState } from "react";

import EditTodo from "../EditTodo/EditTodo";

const ListTodos = () => {

    const [todos, setTodos] = useState([]);

    async function getTodos() {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();

            setTodos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    async function deleteTodo(id){
        try {
            const deleteResponse = await fetch(`http://localhost:5000/todos/${id}`, { 
                method: "DELETE"
             });
             console.log(deleteResponse);
             setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getTodos();
    }, []);

    return(
        <>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>
                                <EditTodo todo={todo}/>
                            </td>
                            <td><button type="submit" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ListTodos;