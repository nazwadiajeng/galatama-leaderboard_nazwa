function HeaviestCatch({ heaviestCatch }) {
  return (
    <div className="heaviest-card">
      <div className="section-header">
        <span className="section-label">
          BEST CATCH
        </span>
      </div>

      {!heaviestCatch ? (
        <div className="empty-catch">
          <div>🐟</div>

          <p>
            Belum ada
            <br />
            tangkapan
          </p>

          <span>
            Mulai kompetisi untuk
            <br />
            mendapatkan tangkapan terbaik
          </span>
        </div>
      ) : (
        <div className="heaviest-content">
          <div
            className={
              heaviestCatch.weight > 7
                ? "big-fish"
                : "fish-icon"
            }
          >
            
          </div>

          <div className="heaviest-weight">
            {heaviestCatch.weight.toFixed(1)}
            <span> kg</span>
          </div>

          <p>
            {heaviestCatch.playerName}
          </p>

          {heaviestCatch.weight > 7 && (
            <div className="big-catch-badge">
              🔥 Tangkapan Besar!
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default HeaviestCatch;