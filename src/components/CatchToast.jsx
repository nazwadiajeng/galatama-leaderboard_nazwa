function CatchToast({ catchInfo }) {
  if (!catchInfo) {
    return null;
  }

  const weight = Number(catchInfo.weight || 0);
  const isBigCatch = weight > 7;

  return (
    <div
      className={`catch-toast ${
        isBigCatch ? "big-catch-toast" : ""
      }`}
    >
      <div className="toast-icon">
        {isBigCatch ? "🔥" : "🐟"}
      </div>

      <div className="toast-content">
        <span className="toast-title">
          {isBigCatch
            ? "TANGKAPAN BESAR!"
            : "TANGKAPAN BARU!"}
        </span>

        <strong>
          {catchInfo.playerName}
        </strong>

        <span className="toast-weight">
          {weight.toFixed(1)} kg
        </span>
      </div>
    </div>
  );
}

export default CatchToast;