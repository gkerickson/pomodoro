import React, { useState, useRef } from "react";

export default function Task({ name, description }) {
    return (
        <div className={"card text-bg-primary"}>
            <div className="card-body">
                <p style={{ fontSize: "1.5rem", fontWeight: "bold" }} className="card-text">{name}</p>
                <p className="card-text">{description}</p>
            </div>
        </div>
    );
}