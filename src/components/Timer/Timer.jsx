import React, { useState, useEffect } from 'react';

const Timer = ({ startTime }) => {
    const [currentTime, setCurrentTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const timeDifference = Math.floor((currentTime - startTime) / 1000);
    let seconds = 59 - (timeDifference % 60);

    // Reset the timer if it reaches 0
    if (seconds < 0) {
        seconds = 59;
    }

    return (
        <div className='d-flex align-items-center'>
            <div className='mr-2'>Timer - &nbsp; </div>
            <div> 00:{seconds < 10 ? `0${seconds}` : seconds}</div>
        </div>
    );
};

export default Timer;
