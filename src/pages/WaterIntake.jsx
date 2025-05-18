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
import personStanding from "../assets/person-standing.svg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const TOTAL_CUPS = 12;
const CUP_VOLUME_ML = 250;
const MAX_WATER_ML = TOTAL_CUPS * CUP_VOLUME_ML;

const WATER_FACTS = [
  "Drinking water can help boost your metabolism.",
  "Staying hydrated improves your mood and energy levels.",
  "Water helps flush out toxins from your body.",
  "Drinking enough water can improve your skin health.",
  "Hydration is essential for optimal brain function.",
  "Water makes up about 60% of your body weight.",
  "Even mild dehydration can affect your physical performance.",
  "Drinking water before meals can help with weight loss.",
  "Proper hydration supports heart health.",
  "Water helps regulate your body temperature.",
  "Aim for at least 3 liters of water a day for optimal hydration!",
  "3 liters of water daily can help you feel more energetic and focused.",
  "Drinking 3L of water a day supports kidney health and detoxification.",
  "3L a day keeps your skin glowing and your body refreshed!",
  "Hydrating with 3L daily can help curb unnecessary snacking.",
  "3L of water a day can help you stay active and alert all day long!"
];

function getRandomFact(currentFact) {
  let newFact;
  do {
    newFact = WATER_FACTS[Math.floor(Math.random() * WATER_FACTS.length)];
  } while (newFact === currentFact && WATER_FACTS.length > 1);
  return newFact;
}

function WaterIntake() {
  const [cupsClicked, setCupsClicked] = useState(
    () => JSON.parse(localStorage.getItem("cupsClicked")) || Array(TOTAL_CUPS).fill(false)
  );

  const [history, setHistory] = useState(
    () => JSON.parse(localStorage.getItem("waterHistory")) || []
  );

  const [currentDate, setCurrentDate] = useState(
    () => localStorage.getItem("waterIntakeDate") || new Date().toISOString().slice(0, 10)
  );

  const [showHappy, setShowHappy] = useState(Array(TOTAL_CUPS).fill(false));
  const [showSad, setShowSad] = useState(Array(TOTAL_CUPS).fill(false));
  const [fact, setFact] = useState(() => getRandomFact());
  const [factAnim, setFactAnim] = useState(false);

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
      const intakeCount = cupsClicked.filter(Boolean).length;
      const newHistory = [...history];
      if (newHistory.length >= 7) {
        newHistory.shift();
      }
      newHistory.push({ date: currentDate, intake: intakeCount * CUP_VOLUME_ML });
      setHistory(newHistory);
      localStorage.setItem("waterHistory", JSON.stringify(newHistory));

      const resetCups = Array(TOTAL_CUPS).fill(false);
      setCupsClicked(resetCups);
      localStorage.setItem("cupsClicked", JSON.stringify(resetCups));
      setCurrentDate(today);
      localStorage.setItem("waterIntakeDate", today);
    }
  }, [currentDate, cupsClicked, history]);

  const handleCupClick = (index) => {
    const newCups = [...cupsClicked];
    const togglingOn = !newCups[index];
    newCups[index] = togglingOn; // toggle cup state on click
    setCupsClicked(newCups);
    localStorage.setItem("cupsClicked", JSON.stringify(newCups));

    // Show happy or sad face animation
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

  const fillPercent = (cupsClicked.filter(Boolean).length / TOTAL_CUPS) * 100;

  const todayIntake = cupsClicked.filter(Boolean).length * CUP_VOLUME_ML;
  const graphDataPoints = [...history, { date: currentDate, intake: todayIntake }];

  const labels = graphDataPoints.map((d) => d.date.slice(5));
  const dataValues = graphDataPoints.map((d) => d.intake / 1000); // convert ml to liters

  let lineColor = "green";
  let bgColor = "rgba(255,255,255,0.7)";
  let isRed = false;
  // Only compare the last two days for color
  if (dataValues.length > 1) {
    const prev = dataValues[dataValues.length - 2];
    const curr = dataValues[dataValues.length - 1];
    if (curr < prev) {
      lineColor = "red";
      bgColor = "rgba(255, 200, 200, 0.7)";
      isRed = true;
    }
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Water Intake (L)",
        data: dataValues,
        fill: {
          target: 'origin',
          above: isRed ? 'rgba(255, 200, 200, 0.7)' : 'rgba(255,255,255,0.7)',
        },
        borderColor: lineColor,
        backgroundColor: isRed ? 'rgba(255, 200, 200, 0.7)' : 'rgba(255,255,255,0.7)',
        tension: 0.3,
        pointRadius: 10,
        pointHoverRadius: 14,
        pointBorderWidth: 4,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        borderWidth: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.parsed.y + " L";
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: MAX_WATER_ML / 1000,
        ticks: {
          stepSize: 0.5, // Only show every 0.5L
          callback: function(value) {
            return value + " L";
          },
          font: { size: 18 }, // Larger font
        },
        grid: {
          color: '#c7d2fe', // Tailwind blue-200
          lineWidth: 2,
        },
      },
      x: {
        ticks: {
          font: { size: 18 }, // Larger font
        },
        grid: {
          color: '#e0e7ff', // Tailwind blue-100
          lineWidth: 2,
        },
      },
    },
    elements: {
      point: {
        radius: 10,
        hoverRadius: 14,
        borderWidth: 4,
      },
      line: {
        borderWidth: 5,
      },
    },
  };

  const handleClearData = () => {
    localStorage.removeItem("cupsClicked");
    localStorage.removeItem("waterHistory");
    localStorage.removeItem("waterIntakeDate");
    setCupsClicked(Array(TOTAL_CUPS).fill(false));
    setHistory([]);
    setCurrentDate(new Date().toISOString().slice(0, 10));
  };

  // Handler for clicking the card
  const handleFactClick = () => {
    setFact((prev) => getRandomFact(prev));
    setFactAnim(true);
    setTimeout(() => setFactAnim(false), 600);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-col flex-grow p-4 max-w-full mx-auto" style={{ paddingTop: "4rem" }}>
        {/* Water Motivation Card moved to top */}
        <div className="mt-0 mb-12 w-full max-w-4xl mx-auto flex items-center justify-center" style={{ minHeight: '400px', height: '400px' }}>
          <div
            className={`relative w-full h-full [perspective:1200px] flex items-center justify-center`}
          >
            <div
              className={`absolute inset-0 p-6 rounded-3xl shadow-lg border border-blue-100 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center w-full h-full select-none cursor-pointer transition-transform duration-500 [transform-style:preserve-3d] ${factAnim ? 'animate-factFlip' : ''}`}
              style={{ minWidth: '100%', maxWidth: '800px', margin: '0 auto' }}
              onClick={handleFactClick}
            >
              <div className="text-3xl font-bold text-blue-900 text-center flex items-center justify-center h-full">{fact}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-12 items-center w-full px-4 justify-center mx-auto">
          <div className="flex flex-wrap gap-6 md:w-1/2 items-center justify-center mx-auto" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {Array(TOTAL_CUPS)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="relative group">
                  <button
                    onClick={() => handleCupClick(i)}
                    aria-label={`Cup ${i + 1} of water`}
                    className={`w-20 h-28 rounded-2xl border-2 border-blue-500 flex flex-col justify-center items-center cursor-pointer transition-transform duration-500 ${
                      cupsClicked[i]
                        ? "bg-blue-500 text-white scale-90"
                        : "bg-white text-blue-500 hover:bg-blue-100"
                    }`}
                    style={{
                      transformOrigin: "center bottom",
                      boxShadow: cupsClicked[i] ? "0 0 10px 2px rgba(59, 130, 246, 0.7)" : "none",
                    }}
                  >
                    <div className="text-6xl mb-1">💧</div>
                    <div className="text-lg font-semibold">{CUP_VOLUME_ML / 1000} L</div>
                  </button>
                  <span
                    className="absolute bottom-full mb-2 px-2 py-1 text-sm text-white bg-blue-500 rounded shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Click to log your water intake!
                  </span>
                  {showHappy[i] && (
                    <span
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl pointer-events-none animate-fadeInOut"
                      style={{ zIndex: 10 }}
                    >
                      😊
                    </span>
                  )}
                  {showSad[i] && (
                    <span
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl pointer-events-none animate-fadeInOut"
                      style={{ zIndex: 10 }}
                    >
                      😞
                    </span>
                  )}
                </div>
              ))}
          </div>
          <div className="flex flex-col items-center justify-center " >
            <div className="relative  max-w-md h-[32rem] rounded-3xl overflow-hidden flex justify-center items-center">
              <div
                className="absolute bottom-0 left-1/2"
                style={{
                  width: '60%',
                  transform: 'translateX(-50%)',
                  height: `${fillPercent}%`,
                  background: 'rgba(59,130,246,0.85)',
                  borderRadius: '0 0 2.5rem 2.5rem',
                  boxShadow: '0 0 30px 10px rgba(59,130,246,0.18) inset',
                  zIndex: 2,
                  transition: 'height 0.7s cubic-bezier(0.4,0,0.2,1)',
                  position: 'absolute',
                  bottom: 0,
                  opacity: 0.85,
                  pointerEvents: 'none',
                }}
              ></div>
              <img
                src={personStanding}
                alt="Person Standing"
                className="relative max-h-full max-w-full z-10 select-none pointer-events-none"
                style={{ filter: 'drop-shadow(0 4px 16px rgba(59,130,246,0.12))' }}
              />
            </div>
            <div className="mt-8 font-semibold text-2xl">
              {cupsClicked.filter(Boolean).length} / {TOTAL_CUPS} cups consumed
            </div>
          </div>
        </div>
        <div className="mt-12 p-6 rounded-3xl w-full max-w-4xl mx-auto overflow-x-auto shadow-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100 transition-all duration-700 ease-in-out">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center"> Your Weakly Water Intake </h2>
          <div
            style={{
              minWidth: "100%",
              maxWidth: "800px",
              height: "400px",
              margin: "0 auto",
            }}
            className="sm:min-w-[320px] sm:max-w-[95vw] sm:h-[220px] transition-all duration-700 ease-in-out"
          >
            <Line data={data} options={options} />
          </div>
        </div>
        <div className="flex flex-row gap-4 mt-10 w-full max-w-md mx-auto justify-center transition-all duration-500 ease-in-out">
          <button
            onClick={handleClearData}
            className="px-6 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-full shadow-xl hover:from-red-500 hover:to-red-700 transition-all duration-300 text-base font-semibold min-w-[140px] border-2 border-red-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transform hover:scale-105 active:scale-95"
          >
            <span role="img" aria-label="Clear Data" className="mr-2">🗑️</span>Clear All Data
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default WaterIntake;