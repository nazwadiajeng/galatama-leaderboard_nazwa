function Timer({ timeLeft }) {
  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");

  const seconds = (timeLeft % 60)
    .toString()
    .padStart(2, "0");

  const isWarning = timeLeft <= 10;

  return (
    <div
      className={`timer-card ${
        isWarning ? "timer-warning" : ""
      }`}
    >
      <div className="timer-icon">
        ⏳
      </div>

      <div className="timer-content">
        <span className="timer-label">
          WAKTU TERSISA
        </span>

        <div className="timer">
          {minutes}:{seconds}
        </div>

        <span className="timer-info">
          Durasi sesi 60 detik
        </span>
      </div>
    </div>
  );
}

export default Timer;