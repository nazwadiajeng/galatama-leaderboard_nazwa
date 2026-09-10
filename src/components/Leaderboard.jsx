function Leaderboard({ players }) {
  return (
    <section className="leaderboard-card">

      {/* HEADER */}
      <div className="leaderboard-header">
        <div className="leaderboard-heading">
          <div className="trophy-icon">
            🏆
          </div>

          <div>
            <h2>LEADERBOARD</h2>
          </div>
        </div>

        <div className="live-indicator">
          <span></span>
          LIVE
        </div>
      </div>


      {/* PLAYER LIST */}
      <div className="leaderboard-list">

        {players.slice(0, 5).map((player, index) => (

          <div
            className={`player-row ${
              index === 0 ? "first-place" : ""
            }`}
            key={player.id}
          >

            {/* RANK */}
            <div
              className={`rank ${
                index === 0
                  ? "rank-gold"
                  : index === 1
                  ? "rank-silver"
                  : index === 2
                  ? "rank-bronze"
                  : ""
              }`}
            >
              {index === 0
                ? "🥇"
                : index === 1
                ? "🥈"
                : index === 2
                ? "🥉"
                : index + 1}
            </div>


            {/* AVATAR */}
            <div className="player-avatar">
              <span>🎣</span>
            </div>


            {/* PLAYER INFO */}
            <div className="player-info">

              <strong>
                {player.name}
              </strong>

              <span>
                {player.catchCount} tangkapan
              </span>

            </div>


            {/* SCORE */}
            <div className="player-score">

              <strong>
                {player.totalWeight.toFixed(1)}
              </strong>

              <span>
                KG
              </span>

            </div>

          </div>

        ))}

      </div>
    </section>
  );
}

export default Leaderboard;