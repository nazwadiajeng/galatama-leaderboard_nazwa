import { useEffect, useRef, useState } from "react";
import "./App.css";

import Timer from "./components/Timer";
import Leaderboard from "./components/Leaderboard";
import HeaviestCatch from "./components/HeaviestCatch";
import CatchToast from "./components/CatchToast";

import {
  INITIAL_PLAYERS,
  generateCatch,
  updatePlayerScore,
  sortLeaderboard,
  getHeaviestCatch,
  getRandomCatchDelay,
} from "./logic/gameLogic";

// Gambar ikan
import ikan1 from "./assets/ikan1.png";
import ikan2 from "./assets/ikan2.png";
import ikan3 from "./assets/ikan3.png";
import ikan4 from "./assets/ikan4.2.png";
import ikan5 from "./assets/ikan5.png";
import ikan6 from "./assets/ikan6.png";
import ikan7 from "./assets/ikan7.png";
import ikan8 from "./assets/ikan8.2.png";

// Suara
import backgroundMusic from "./assets/sounds/bg_sounds.mp3";
import bigCatchSound from "./assets/sounds/tangkap_sounds.mp3";
import sessionEndSound from "./assets/sounds/gameover_sounds.mp3";

function App() {
  // Data permainan
  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [catches, setCatches] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [sessionState, setSessionState] = useState("waiting");
  const [latestCatch, setLatestCatch] = useState(null);

  // Status audio
  const [musicEnabled, setMusicEnabled] = useState(true);

  // Referensi musik latar
  const musicRef = useRef(null);

  // Menyimpan semua suara efek yang sedang dimainkan
  const soundEffectsRef = useRef([]);

  // Menyimpan status audio terbaru
  const musicEnabledRef = useRef(true);

  // Menyimpan status permainan terbaru
  const sessionStateRef = useRef("waiting");

  // Menyamakan status ref dengan status permainan
  useEffect(() => {
    sessionStateRef.current = sessionState;
  }, [sessionState]);

  // Menyamakan status ref dengan status audio
  useEffect(() => {
    musicEnabledRef.current = musicEnabled;
  }, [musicEnabled]);

  // Memulai musik latar
  const startMusic = () => {
    if (!musicEnabledRef.current) {
      return;
    }

    if (!musicRef.current) {
      musicRef.current = new Audio(backgroundMusic);
      musicRef.current.loop = true;
      musicRef.current.volume = 0.18;
    }

    musicRef.current.play().catch(() => {
      console.log("Musik menunggu interaksi pengguna.");
    });
  };

  // Menghentikan musik latar
  const stopMusic = () => {
    if (!musicRef.current) {
      return;
    }

    musicRef.current.pause();
    musicRef.current.currentTime = 0;
  };

  // Menghentikan semua suara efek
  const stopAllSounds = () => {
    soundEffectsRef.current.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });

    soundEffectsRef.current = [];
  };

  // Memainkan suara efek
  const playSound = (sound, volume = 0.5) => {
    // Jangan memainkan suara jika audio OFF
    if (!musicEnabledRef.current) {
      return;
    }

    const audio = new Audio(sound);

    audio.volume = volume;

    // Simpan suara yang sedang dimainkan
    soundEffectsRef.current.push(audio);

    // Hapus dari daftar setelah suara selesai
    audio.addEventListener("ended", () => {
      soundEffectsRef.current =
        soundEffectsRef.current.filter(
          (item) => item !== audio
        );
    });

    audio.play().catch(() => {
      console.log("Suara menunggu interaksi pengguna.");
    });
  };

  // Suara ketika mendapatkan ikan besar
  const playBigCatchSound = () => {
    playSound(bigCatchSound, 0.7);
  };

  // Suara ketika permainan selesai
  const playSessionEndSound = () => {
    playSound(sessionEndSound, 0.7);
  };

  // Tombol musik ON/OFF
  const toggleMusic = () => {
    // Jika audio sedang ON
    if (musicEnabledRef.current) {
      musicEnabledRef.current = false;

      setMusicEnabled(false);

      // Hentikan musik
      stopMusic();

      // Hentikan suara efek yang sedang dimainkan
      stopAllSounds();

      return;
    }

    // Jika audio sedang OFF
    musicEnabledRef.current = true;

    setMusicEnabled(true);

    // Jika permainan sedang berjalan,
    // hidupkan kembali musik
    if (sessionStateRef.current === "running") {
      startMusic();
    }
  };

  // Timer permainan
  useEffect(() => {
    if (sessionState !== "running") {
      return;
    }

    // Jika waktu sudah habis
    if (timeLeft <= 0) {
      setTimeLeft(0);

      // Ubah status ref terlebih dahulu
      // supaya tidak ada tangkapan baru
      sessionStateRef.current = "ended";

      setSessionState("ended");

      // Hentikan musik
      stopMusic();

      // Hentikan suara efek sebelumnya
      stopAllSounds();

      // Mainkan suara game over
      // hanya jika audio sedang ON
      if (musicEnabledRef.current) {
        playSessionEndSound();
      }

      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((currentTime) => {
        if (currentTime <= 1) {
          return 0;
        }

        return currentTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [sessionState, timeLeft]);

  // Simulasi tangkapan ikan
  useEffect(() => {
    if (sessionState !== "running") {
      return;
    }

    let timeoutId = null;

    const scheduleCatch = () => {
      const delay = getRandomCatchDelay();

      timeoutId = setTimeout(() => {
        // Jangan membuat tangkapan
        // jika permainan sudah selesai
        if (sessionStateRef.current !== "running") {
          return;
        }

        // Membuat tangkapan baru
        const newCatch = generateCatch();

        // Suara hanya untuk ikan besar
        if (newCatch.weight > 7) {
          playBigCatchSound();
        }

        // Memperbarui skor pemain
        setPlayers((currentPlayers) =>
          updatePlayerScore(
            currentPlayers,
            newCatch
          )
        );

        // Menambahkan tangkapan baru
        setCatches((currentCatches) => [
          ...currentCatches,
          newCatch,
        ]);

        // Menampilkan notifikasi tangkapan
        setLatestCatch(newCatch);

        // Menjadwalkan tangkapan berikutnya
        if (sessionStateRef.current === "running") {
          scheduleCatch();
        }
      }, delay);
    };

    // Mulai jadwal tangkapan
    scheduleCatch();

    // Bersihkan timeout ketika sesi berubah
    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [sessionState]);

  // Menghilangkan notifikasi setelah 2 detik
  useEffect(() => {
    if (!latestCatch) {
      return;
    }

    const toastTimer = setTimeout(() => {
      setLatestCatch(null);
    }, 2000);

    return () => {
      clearTimeout(toastTimer);
    };
  }, [latestCatch]);

  // Memulai sesi baru
  const startSession = () => {
    const resetPlayers = INITIAL_PLAYERS.map(
      (player) => ({
        ...player,
      })
    );

    // Reset data permainan
    setPlayers(resetPlayers);
    setCatches([]);
    setLatestCatch(null);
    setTimeLeft(60);

    // Ubah status permainan
    sessionStateRef.current = "running";
    setSessionState("running");

    // Mulai musik jika audio ON
    if (musicEnabledRef.current) {
      startMusic();
    }
  };

  // Mereset sesi
  const resetSession = () => {
    const resetPlayers = INITIAL_PLAYERS.map(
      (player) => ({
        ...player,
      })
    );

    // Hentikan permainan
    sessionStateRef.current = "waiting";

    // Hentikan semua audio
    stopMusic();
    stopAllSounds();

    // Reset data permainan
    setPlayers(resetPlayers);
    setCatches([]);
    setLatestCatch(null);
    setTimeLeft(60);
    setSessionState("waiting");
  };

  // Mengurutkan pemain berdasarkan total berat
  const sortedPlayers = sortLeaderboard(players);

  // Mendapatkan tangkapan terberat
  const heaviestCatch = getHeaviestCatch(catches);

  // Menghitung total berat semua ikan
  const totalWeight = players.reduce(
    (total, player) =>
      total + Number(player.totalWeight || 0),
    0
  );

  // Mendapatkan teks status permainan
  const getStatusText = () => {
    if (sessionState === "waiting") {
      return "READY";
    }

    if (sessionState === "running") {
      return "LIVE";
    }

    return "FINISHED";
  };

  // Membersihkan semua audio ketika komponen dihapus
  useEffect(() => {
    return () => {
      stopMusic();
      stopAllSounds();

      if (musicRef.current) {
        musicRef.current = null;
      }
    };
  }, []);

  return (
    <div className="app">

      {/* Latar belakang air */}
      <div className="water-overlay" />

      {/* Gelembung air */}
      <div className="bubble bubble-1" />
      <div className="bubble bubble-2" />
      <div className="bubble bubble-3" />
      <div className="bubble bubble-4" />

      {/* Ikan yang berenang */}
      <div className="fish-layer">

        <img
          src={ikan1}
          className="moving-fish fish-one"
          alt="Ikan 1"
        />

        <img
          src={ikan2}
          className="moving-fish fish-two"
          alt="Ikan 2"
        />

        <img
          src={ikan3}
          className="moving-fish fish-three"
          alt="Ikan 3"
        />

        <img
          src={ikan4}
          className="moving-fish fish-four"
          alt="Ikan 4"
        />

        <img
          src={ikan5}
          className="moving-fish fish-five"
          alt="Ikan 5"
        />

        <img
          src={ikan6}
          className="moving-fish fish-six"
          alt="Ikan 6"
        />

        <img
          src={ikan7}
          className="moving-fish fish-seven"
          alt="Ikan 7"
        />

        <img
          src={ikan8}
          className="moving-fish fish-eight"
          alt="Ikan 8"
        />

      </div>

      {/* Nama permainan */}
      <div className="game-brand">
        <span>GALATAMA</span>
        <small>FISHING COMPETITION</small>
      </div>

      {/* Status permainan */}
      <div
        className={`game-status status-${sessionState}`}
      >
        <span className="status-dot" />
        {getStatusText()}
      </div>

      {/* Judul permainan */}
      <div
        className={`game-title ${
          sessionState !== "waiting"
            ? "game-title-hidden"
            : ""
        }`}
      >
        <div>FISHING</div>
        <div>COMPETITION</div>
        <div>SIMULATOR</div>
      </div>

      {/* Papan peringkat */}
      <Leaderboard
        players={sortedPlayers}
      />

      {/* Timer */}
      <Timer
        timeLeft={timeLeft}
      />

      {/* Tangkapan terberat */}
      <HeaviestCatch
        heaviestCatch={heaviestCatch}
      />

      {/* Informasi permainan */}
      <div className="game-info">

        <div className="info-item">
          <span>👥</span>

          <strong>
            {players.length}
          </strong>

          <small>
            PEMAIN
          </small>
        </div>

        <div className="info-item">
          <span>🐟</span>

          <strong>
            {catches.length}
          </strong>

          <small>
            TANGKAPAN
          </small>
        </div>

        <div className="info-item">
          <span>⚖️</span>

          <strong>
            {totalWeight.toFixed(1)}
          </strong>

          <small>
            TOTAL KG
          </small>
        </div>

      </div>

      {/* Tombol musik */}
      <button
        className="music-button"
        onClick={toggleMusic}
        type="button"
      >
        {musicEnabled
          ? "🔊 MUSIK ON"
          : "🔇 MUSIK OFF"
        }
      </button>

      {/* Kontrol sesi */}
      <div className="session-controls">

        {/* Tombol START */}
        {sessionState === "waiting" && (
          <button
            className="start-button"
            onClick={startSession}
            type="button"
          >
            <span>🎣</span>
            START
          </button>
        )}

        {/* Pesan ketika permainan berjalan */}
        {sessionState === "running" && (
          <div className="running-message">
            <span className="running-pulse">
              ●
            </span>

            KOMPETISI SEDANG BERLANGSUNG
          </div>
        )}

        {/* Tombol PLAY AGAIN */}
        {sessionState === "ended" && (
          <button
            className="start-button"
            onClick={startSession}
            type="button"
          >
            <span>🔄</span>
            PLAY AGAIN
          </button>
        )}

        {/* Tombol RESET */}
        {sessionState !== "waiting" && (
          <button
            className="reset-button"
            onClick={resetSession}
            type="button"
          >
            RESET
          </button>
        )}

      </div>

      {/* Notifikasi tangkapan */}
      <CatchToast
        catchInfo={latestCatch}
      />

      {/* Footer */}
      <div className="bottom-label">

        <span>
          © 2026 Galatama Fishing Simulator.
          All rights reserved.
        </span>

        <span>•</span>

        <span>
          Crafted by <strong>nazwa</strong>
        </span>

      </div>

    </div>
  );
}

export default App;