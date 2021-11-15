import React, { useState, useEffect } from "react";
import { Oops } from './';

const Play = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  useEffect(() => {
    setInterval(() => {
      setIsMobile(window.innerWidth <= 900);
    }, 1000);
  }, []);

  return <>{isMobile ? <Oops /> : <div>play</div>}</>;
};

export default Play;
