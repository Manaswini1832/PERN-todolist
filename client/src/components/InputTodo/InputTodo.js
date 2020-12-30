import { useState } from "react";

const InputTodo = () => {

    const [ description, setDescription ] = useState("");

    function handleDescripChange(e) {
        setDescription(e.target.value);
    }

    async function createTodo(e){
        e.preventDefault();
        try {
          const body = {description};
          const response = await fetch("http://localhost:5000/todos", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body)
          });
          window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    return(
        <>
            <h1>My todo list</h1>
            <form onSubmit={createTodo}>
                <input onChange={handleDescripChange} type="text" value={description}/>
                <button type="submit">Add</button>
            </form>
        </>
    )
}

export default InputTodo;