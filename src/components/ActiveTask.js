import React, { useState, useRef, useEffect } from "react";

const disabledDiv = {
    PointerEvent: "none",
    opacity: "0.5"
}

export default function ActiveTask({ onBreak, activeTask, startBreak, endTask }) {  
    return (
        <div className={"card text-bg-primary" + (onBreak ? "" : " shadow")} style={{ ...(onBreak ? disabledDiv : {}) }}>
            <div className="card-body">
                <h2 className="card-title">Active Task</h2>
                <p style={{ fontSize: "1.5rem", fontWeight: "bold" }} className="card-text">{activeTask.name}</p>
                <p className="card-text">{activeTask.description}</p>
                <button disabled={onBreak} type="button" onClick={startBreak} className="btn btn-secondary w-100">Take a break</button>
                <button disabled={onBreak} type="button" onClick={endTask} className="btn btn-danger w-100">End Task</button>
            </div>
        </div>
    );
}