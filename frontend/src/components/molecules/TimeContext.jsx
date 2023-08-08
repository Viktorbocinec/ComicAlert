import React, { createContext, useState, useEffect } from 'react';

const TimeContext = createContext();

export const TimeProvider = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => {
      clearInterval(intervalId); // Clean up on component unmount
    };
  }, []);

  return (
    <TimeContext.Provider value={currentTime}>
      {children}
    </TimeContext.Provider>
  );
};

export default TimeContext;