import React, { useState, useRef, useEffect } from "react";

export default function ActiveTask({ name, description }) {
    const ref = useRef(Date.now());
    useEffect(() => {
        setInterval(() => {

        }, 100)
    }, []);
    return (
        <div className="task">
            <h3>Task Name</h3>
            <p className="taskName">{name}</p>
            {
                description ?
                    <>
                        <h3>Task Description</h3>
                        <p className="taskDescription">{description}</p>
                    </> : <></>
            }
        </div>
    );
}