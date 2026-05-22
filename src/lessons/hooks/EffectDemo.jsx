import { useEffect, useState } from "react";

export default function EffectDemo() {
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState("waiting...");

  useEffect(() => {
    const timerId = setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (seconds === 2) {
      setStatus("Pretend API finished loading");
    }
  }, [seconds]);

  return (
    <div className="demo-grid">
      <div className="demo-box">
        <h3>Timer: {seconds}s</h3>
        <p>The first effect starts a timer when the component mounts.</p>
      </div>
      <div className="demo-box">
        <h3>Effect result</h3>
        <p>{status}</p>
        <p>When seconds changes, React can run another effect.</p>
      </div>
    </div>
  );
}
