import React, { useState, useRef } from "react";

export default function CreateTaskComponent({ taskName, taskDescription, addTask }) {
    const [name, setName] = useState(taskName ?? "");
    const [description, setDescription] = useState(taskDescription ?? "");

    function onAddTask() {
        addTask({ name: name, description: description });
        setName("");
        setDescription("");
    }

    return (
        <form className="border p-4 rounded bg-light shadow">
            <div className="form-floating mb-3">
                <input className="form-control" placeholder="needed-for-form-control" type="text" value={name} onChange={e => setName(e.target.value)}></input>
                <label className="form-label">Task Name</label>
            </div>
            <div className="form-floating mb-3">
                <textarea className="form-control" placeholder="needed-for-form-control" type="text" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                <label className="form-label">Task Description</label>
            </div>
            <button className="btn btn-primary w-100" type="button" onClick={onAddTask}>Create</button>
        </form>
    );
}
