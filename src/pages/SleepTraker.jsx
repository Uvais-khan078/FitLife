import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import alarmClock from "../assets/timer-clock.svg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const TOTAL_EMOJIS = 16; // 16 emojis for 0.5 hours each
const MAX_SLEEP_HOURS = 8;
const SLEEP_FACTS = [
  "Quality sleep boosts your immune system.",
  "Sleep helps improve memory and learning.",
  "Good sleep reduces stress and anxiety.",
  "Sleep is essential for muscle recovery.",
  "Proper sleep improves heart health.",
  "Sleep helps regulate your metabolism.",
  "Getting enough sleep enhances mood and focus.",
  "Sleep is vital for overall mental health.",
];

function getRandomFact(currentFact) {
  let newFact;
  do {
    newFact = SLEEP_FACTS[Math.floor(Math.random() * SLEEP_FACTS.length)];
  } while (newFact === currentFact && SLEEP_FACTS.length > 1);
  return newFact;
}

function SleepTraker() {
  const [emojisClicked, setEmojisClicked] = useState(
    () => JSON.parse(localStorage.getItem("emojisClicked")) || Array(TOTAL_EMOJIS).fill(false)
  );

  const [history, setHistory] = useState(
    () => JSON.parse(localStorage.getItem("sleepHistory")) || []
  );

  const [currentDate, setCurrentDate] = useState(
    () => localStorage.getItem("sleepTrackerDate") || new Date().toISOString().slice(0, 10)
  );

  const [showHappy, setShowHappy] = useState(Array(TOTAL_EMOJIS).fill(false));
  const [showSad, setShowSad] = useState(Array(TOTAL_EMOJIS).fill(false));
  const [fact, setFact] = useState(() => getRandomFact());
  const [factAnim, setFactAnim] = useState(false);

  const [data, setData] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem("sleepHistory")) || [];
    return {
      labels: savedData.length > 0 ? savedData.map((_, index) => `Day ${index + 1}`) : ["Day 1"],
      datasets: [
        {
          label: "Sleep Hours",
          data: savedData.length > 0 ? savedData.map((entry) => entry.hours) : [0],
          fill: true,
          backgroundColor: "rgba(128, 90, 213, 0.3)",
          borderColor: "rgba(128, 90, 213, 1)",
          tension: 0.3,
          pointRadius: 10,
          pointHoverRadius: 14,
          pointBorderWidth: 4,
          pointBackgroundColor: '#805ad5',
          pointBorderColor: '#fff',
          borderWidth: 5,
        },
      ],
    };
  });

  // Change fact every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setFact((prev) => getRandomFact(prev));
      setFactAnim(true);
      setTimeout(() => setFactAnim(false), 600);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    if (currentDate !== today) {
      const totalSleepHours = emojisClicked.filter(Boolean).length * 0.5;
      const newHistory = [...history];
      if (newHistory.length >= 7) {
        newHistory.shift();
      }
      newHistory.push({ date: currentDate, hours: totalSleepHours });
      setHistory(newHistory);
      localStorage.setItem("sleepHistory", JSON.stringify(newHistory));

      const resetEmojis = Array(TOTAL_EMOJIS).fill(false);
      setEmojisClicked(resetEmojis);
      localStorage.setItem("emojisClicked", JSON.stringify(resetEmojis));
      setCurrentDate(today);
      localStorage.setItem("sleepTrackerDate", today);
    }
  }, [currentDate, emojisClicked, history]);

  const handleEmojiClick = (index) => {
    const newEmojis = [...emojisClicked];
    const togglingOn = !newEmojis[index];
    newEmojis[index] = togglingOn;
    setEmojisClicked(newEmojis);
    localStorage.setItem("emojisClicked", JSON.stringify(newEmojis));

    if (togglingOn) {
      const newShowHappy = [...showHappy];
      newShowHappy[index] = true;
      setShowHappy(newShowHappy);
      setTimeout(() => {
        const resetShowHappy = [...showHappy];
        resetShowHappy[index] = false;
        setShowHappy(resetShowHappy);
      }, 1200);
    } else {
      const newShowSad = [...showSad];
      newShowSad[index] = true;
      setShowSad(newShowSad);
      setTimeout(() => {
        const resetShowSad = [...showSad];
        resetShowSad[index] = false;
        setShowSad(resetShowSad);
      }, 1200);
    }
  };

  const fillPercent = (emojisClicked.filter(Boolean).length / TOTAL_EMOJIS) * 100;

  const dataValues = [...history, { date: currentDate, hours: emojisClicked.filter(Boolean).length * 0.5 }];

  const labels = dataValues.map((_, index) => `Day ${index + 1}`);
  const dataPoints = dataValues.map((entry) => entry.hours);

  const lineColors = dataPoints.map((value, index) => {
    if (index === 0) return "rgba(128, 90, 213, 1)";
    return value < dataPoints[index - 1] ? "rgba(239, 68, 68, 1)" : "rgba(34, 197, 94, 1)";
  });

  useEffect(() => {
    const futureLineColors = dataPoints.map((value, index) => {
      if (index === 0) return "rgba(128, 90, 213, 1)";
      if (index === dataPoints.length - 1) return "rgba(128, 90, 213, 0.5)"; // future point color
      return value < dataPoints[index - 1] ? "rgba(239, 68, 68, 1)" : "rgba(34, 197, 94, 1)";
    });

    setData({
      labels,
      datasets: [
        {
          label: "Sleep Hours",
          data: dataPoints,
          borderColor: futureLineColors,
          backgroundColor: "rgba(128, 90, 213, 0.3)",
          tension: 0.3,
          pointRadius: 10,
          pointHoverRadius: 14,
          pointBorderWidth: 4,
          pointBackgroundColor: '#805ad5',
          pointBorderColor: '#fff',
          borderWidth: 5,
        },
      ],
    });
  }, [emojisClicked, history, currentDate]);

  const handleClearData = () => {
    localStorage.removeItem("emojisClicked");
    localStorage.removeItem("sleepHistory");
    localStorage.removeItem("sleepTrackerDate");
    setEmojisClicked(Array(TOTAL_EMOJIS).fill(false));
    setHistory([]);
    setCurrentDate(new Date().toISOString().slice(0, 10));

    setData({
      labels: ["Day 1"],
      datasets: [
        {
          label: "Sleep Hours",
          data: [0],
          fill: true,
          backgroundColor: "rgba(128, 90, 213, 0.3)",
          borderColor: "rgba(128, 90, 213, 1)",
          tension: 0.3,
          pointRadius: 10,
          pointHoverRadius: 14,
          pointBorderWidth: 4,
          pointBackgroundColor: '#805ad5',
          pointBorderColor: '#fff',
          borderWidth: 5,
        },
      ],
    });
  };

  const handleFactClick = () => {
    setFact((prev) => getRandomFact(prev));
    setFactAnim(true);
    setTimeout(() => setFactAnim(false), 600);
  };

  const handleNextDay = () => {
    const today = history.length > 0 ? new Date(history[history.length - 1].date) : new Date();
    const totalSleepHours = emojisClicked.filter(Boolean).length * 0.5;

    const updatedHistory = [...history];
    const todayDate = today.toISOString().slice(0, 10);
    const todayIndex = updatedHistory.findIndex((entry) => entry.date === todayDate);

    if (todayIndex !== -1) {
      updatedHistory[todayIndex].hours = totalSleepHours;
    } else {
      updatedHistory.push({ date: todayDate, hours: totalSleepHours });
    }

    if (updatedHistory.length > 7) {
      updatedHistory.splice(0, updatedHistory.length - 7);
    }

    setHistory(updatedHistory);
    localStorage.setItem("sleepHistory", JSON.stringify(updatedHistory));

    const labels = updatedHistory.map((_, index) => `Day ${index + 1}`);
    setData({
      labels,
      datasets: [
        {
          label: "Sleep Hours",
          data: updatedHistory.map((entry) => entry.hours),
          fill: true,
          backgroundColor: "rgba(128, 90, 213, 0.3)",
          borderColor: "rgba(128, 90, 213, 1)",
          tension: 0.3,
          pointRadius: 10,
          pointHoverRadius: 14,
          pointBorderWidth: 4,
          pointBackgroundColor: '#805ad5',
          pointBorderColor: '#fff',
          borderWidth: 5,
        },
      ],
    });

    today.setDate(today.getDate() + 1);
    const nextDayDate = today.toISOString().slice(0, 10);

    const resetEmojis = Array(TOTAL_EMOJIS).fill(false);
    setEmojisClicked(resetEmojis);
    localStorage.setItem("emojisClicked", JSON.stringify(resetEmojis));

    if (!updatedHistory.some((entry) => entry.date === nextDayDate)) {
      updatedHistory.push({ date: nextDayDate, hours: 0 });
      setHistory(updatedHistory);
      localStorage.setItem("sleepHistory", JSON.stringify(updatedHistory));

      const updatedLabels = updatedHistory.map((_, index) => `Day ${index + 1}`);
      setData({
        labels: updatedLabels,
        datasets: [
          {
            label: "Sleep Hours",
            data: updatedHistory.map((entry) => entry.hours),
            fill: true,
            backgroundColor: "rgba(128, 90, 213, 0.3)",
            borderColor: "rgba(128, 90, 213, 1)",
            tension: 0.3,
            pointRadius: 10,
            pointHoverRadius: 14,
            pointBorderWidth: 4,
            pointBackgroundColor: '#805ad5',
            pointBorderColor: '#fff',
            borderWidth: 5,
          },
        ],
      });
    }
  };

  const factCardClass = `absolute inset-0 p-6 rounded-3xl shadow-lg border border-purple-100 bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center w-full h-full select-none cursor-pointer transition-transform duration-700 ease-in-out [transform-style:preserve-3d] ${factAnim ? 'rotate-y-180 scale-110' : ''}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-col flex-grow p-4 max-w-full mx-auto" style={{ paddingTop: "4rem" }}>
        <div className="mt-0 mb-12 w-full max-w-4xl mx-auto flex items-center justify-center" style={{ minHeight: '400px', height: '400px' }}>
          <div className="relative w-full h-full [perspective:1200px] flex items-center justify-center">
            <div className={factCardClass} style={{ minWidth: '100%', maxWidth: '800px', margin: '0 auto' }} onClick={handleFactClick}>
              <div className="text-3xl font-bold text-purple-900 text-center flex items-center justify-center h-full">{fact}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-12 items-center w-full px-4 justify-center mx-auto">
          <div className="flex flex-wrap gap-6 md:w-1/2 items-center justify-center mx-auto" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {Array(TOTAL_EMOJIS)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="relative group">
                  <button
                    onClick={() => handleEmojiClick(i)}
                    aria-label={`Sleep emoji ${i + 1}`}
                    className={`w-16 h-16 text-4xl rounded-full border-2 border-purple-500 flex items-center justify-center cursor-pointer transition-transform duration-500 ${
                      emojisClicked[i]
                        ? "bg-purple-500 text-white scale-90"
                        : "bg-white text-purple-500 hover:bg-purple-100"
                    }`}
                    style={{
                      transformOrigin: "center bottom",
                      boxShadow: emojisClicked[i] ? "0 0 10px 2px rgba(128, 90, 213, 0.7)" : "none",
                    }}
                  >
                    {showHappy[i] && <span className="absolute text-5xl animate-fadeInOut">😊</span>}
                    {showSad[i] && <span className="absolute text-5xl animate-fadeInOut">😢</span>}
                    😴
                  </button>
                </div>
              ))}
          </div>
          <div className="relative max-w-md h-[32rem] rounded-3xl overflow-hidden flex justify-center items-center">
            <div
              className="absolute bottom-0 left-1/2"
              style={{
                width: '60%',
                transform: 'translateX(-50%)',
                height: `${fillPercent}%`,
                background: 'rgba(128, 90, 213, 0.85)',
                borderRadius: '0 0 2.5rem 2.5rem',
                boxShadow: '0 0 30px 10px rgba(128, 90, 213, 0.18) inset',
                zIndex: 2,
                transition: 'height 0.7s cubic-bezier(0.4,0,0.2,1)',
                position: 'absolute',
                bottom: 0,
                opacity: 0.85,
                pointerEvents: 'none',
              }}
            ></div>
            <img
              src={alarmClock}
              alt="Alarm Clock"
              className="relative max-h-full max-w-full z-10 select-none pointer-events-none"
              style={{ filter: 'drop-shadow(0 4px 16px rgba(128, 90, 213, 0.12))' }}
            />
          </div>
        </div>
        <div className="mt-12 p-6 rounded-3xl w-full max-w-4xl mx-auto overflow-x-auto shadow-2xl border border-purple-100 bg-gradient-to-br from-purple-100 to-purple-50">
          <h2 className="text-2xl font-semibold text-purple-900 mb-4 text-center">Your Weekly Sleep Hours</h2>
          <div
            style={{
              minWidth: "100%",
              maxWidth: "800px",
              height: "400px",
              margin: "0 auto",
            }}
          >
            <Line data={data} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: MAX_SLEEP_HOURS,
                  ticks: {
                    stepSize: 1,
                    callback: (value) => `${value} hrs`,
                  },
                },
                x: {
                  ticks: {
                    font: { size: 14 },
                  },
                },
              },
            }} />
          </div>
        </div>
        <div className="flex flex-row gap-4 mt-10 w-full max-w-md mx-auto justify-center transition-all duration-500 ease-in-out">
          <button
            onClick={handleNextDay}
            className="px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-full shadow-xl hover:from-blue-500 hover:to-blue-700 transition-all duration-300 text-base font-semibold min-w-[140px] border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transform hover:scale-105 active:scale-95"
          >
            Next Day
          </button>
          <button
            onClick={handleClearData}
            className="px-6 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-full shadow-xl hover:from-red-500 hover:to-red-700 transition-all duration-300 text-base font-semibold min-w-[140px] border-2 border-red-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transform hover:scale-105 active:scale-95"
          >
            Clear All Data
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default SleepTraker;
