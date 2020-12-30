import { useState } from "react";

const EditTodo = ({todo}) => {

    const [description, setDescription] = useState(todo.description);

    function handleChange(e){
        setDescription(e.target.value);
    }

    async function editTodo(e){
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const json = await response.json();
            console.log(json);       
        } catch (err) {
            console.error(err.message)
        }
    }

    return(
        <form>
            <input onChange={handleChange} type="text" value={description}/>
            <button onClick={editTodo} type="submit">Save</button>
            <button onClick={() => setDescription(todo.description)} type="submit">Cancel</button>
        </form>
    )
}

export default EditTodo;