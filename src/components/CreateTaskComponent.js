import React, { useState, useRef } from "react";

export default function CreateTaskComponent(props) {
    const [taskName, setTaskName] = useState(props?.taskName ?? "");
    const [taskDescription, setTaskDescription] = useState(props?.taskDescription ?? "");

    function onAddTask() {
        props.addTask({ name: taskName, description: taskDescription });
        setTaskName("");
        setTaskDescription("");
    }

    return (
        <div className="container" style={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            alignItems: "center"}}>
            <form className="border p-4 rounded bg-light shadow">
                <div className="form-floating mb-3">
                    <input className="form-control" placeholder="needed-for-form-control" type="text" value={taskName} onChange={e => setTaskName(e.target.value)}></input>
                    <label className="form-label">Task Name</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea className="form-control" placeholder="needed-for-form-control" type="text" value={taskDescription} onChange={e => setTaskDescription(e.target.value)}></textarea>
                    <label className="form-label">Task Description</label>
                </div>
                <button className="btn btn-primary w-100" onClick={onAddTask}>Create</button>
            </form>
        </div>
    );
}
