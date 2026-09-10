export const INITIAL_PLAYERS = [
  {
    id: 1,
    name: "Bot 1",
    totalWeight: 0,
    catchCount: 0,
  },
  {
    id: 2,
    name: "Bot 2",
    totalWeight: 0,
    catchCount: 0,
  },
  {
    id: 3,
    name: "Bot 3",
    totalWeight: 0,
    catchCount: 0,
  },
  {
    id: 4,
    name: "Bot 4",
    totalWeight: 0,
    catchCount: 0,
  },
  {
    id: 5,
    name: "Bot 5",
    totalWeight: 0,
    catchCount: 0,
  },
];

// Fungsi murni untuk menentukan hasil tangkapan
export function generateCatch() {
  const playerId = Math.floor(Math.random() * 5) + 1;

  const weight =
    Math.round((Math.random() * 9.5 + 0.5) * 10) / 10;

  return {
    id: Date.now() + Math.random(),
    playerId,
    playerName: `Bot ${playerId}`,
    weight,
    timestamp: new Date(),
  };
}

// Menambahkan hasil tangkapan ke pemain
export function updatePlayerScore(players, newCatch) {
  return players.map((player) => {
    if (player.id !== newCatch.playerId) {
      return player;
    }

    return {
      ...player,
      totalWeight:
        Math.round((player.totalWeight + newCatch.weight) * 10) /
        10,
      catchCount: player.catchCount + 1,
    };
  });
}

// Mengurutkan leaderboard berdasarkan total berat
export function sortLeaderboard(players) {
  return [...players].sort(
    (a, b) => b.totalWeight - a.totalWeight
  );
}

// Mendapatkan tangkapan terberat
export function getHeaviestCatch(catches) {
  if (catches.length === 0) {
    return null;
  }

  return catches.reduce((heaviest, current) => {
    return current.weight > heaviest.weight
      ? current
      : heaviest;
  });
}

// Menghasilkan interval acak antara 3-6 detik
export function getRandomCatchDelay() {
  return Math.floor(Math.random() * 3000) + 3000;
}