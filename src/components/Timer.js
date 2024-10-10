import React, { useState, useEffect } from 'react';

const Timer = ({ startPomodoro, onBreak, mins, secs}) => {
    return (
        <div className={"card card-body w-100 h-100 centered-on-page" + (onBreak ? " shadow" : "")}>
            <p className="fs-1 fw-bold" style={{}}>{mins}m {secs}s</p>
            <button disabled={!onBreak} className="btn btn-primary" onClick={startPomodoro}>Continue Task</button>
        </div>
    );
};

export default Timer;