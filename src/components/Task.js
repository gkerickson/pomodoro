import React, { useState, useRef } from "react";

export default function Task({ name, description }) {
    const ref = useRef();
    return (
        <div className="task">
            <h3>Task Name</h3>
            <p className="taskName">{name}</p>
            {
                description ? <>
                    <h3>Task Description</h3>
                    <p className="taskDescription">{description}</p>
                </> : <></>
            }
        </div>
    );
}