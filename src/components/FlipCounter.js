import { useEffect, useState } from "react";
import "../styles/flip.css";

export default function FlipCounter({ value }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;

    if (start === end) return;

    const duration = 7000; // total animation time
    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      setCurrent(start);

      if (start === end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="flip-card">
      <div className="flip-inner">
        <div key={current} className="flip-number">
          {current} <span className="text-4xl font-bold ml-1">%</span>
        </div>
      </div>
    </div>
  );
}

