import Footer from "../components/Footer";
import Header from "../components/Header";
import React, { useEffect, useState } from "react";

function WaterIntakeCard() {
  const [todayIntake, setTodayIntake] = useState(0);

  useEffect(() => {
    const cupsClicked = JSON.parse(localStorage.getItem("cupsClicked")) || Array(12).fill(false);
    const intake = cupsClicked.filter(Boolean).length * 0.25;
    setTodayIntake(intake);
  }, []);

  const isLow = todayIntake < 1.5;

  return (
    <div
      className={`w-full max-w-md p-6 rounded-3xl shadow-lg border transition-all duration-500 text-center mb-6
        ${isLow
          ? 'bg-red-100 border-red-200 text-red-800'
          : 'bg-gradient-to-br from-blue-100 to-blue-50 border-blue-100 text-blue-900'}
      `}
      style={{ minHeight: 140 }}
    >
      <div className="text-2xl font-bold mb-2">Today's Water Intake</div>
      <div className="text-4xl font-extrabold mb-1">{todayIntake.toFixed(2)} L</div>
      <div className="text-base font-medium">
        {isLow ? 'Keep hydrating! Aim for at least 1.5L.' : 'Great job staying hydrated!'}
      </div>
    </div>
  );
}

function Home ()
{
  return (
    <div >
      <Header />
      <main className="flex flex-col items-center justify-center min-h-[60vh] py-8 px-4">
        <div className="w-full max-w-7xl p-14 rounded-3xl shadow-2xl border bg-gradient-to-br from-blue-100 to-blue-50 border-blue-100 text-blue-900 text-center mb-12 transition-all duration-500 flex flex-col items-center">
          <div className="text-5xl font-extrabold mb-8 tracking-tight">Why Drink More Water?</div>
          <p className="text-xl font-medium leading-relaxed mb-10 max-w-4xl mx-auto">
            Water is the foundation of life and essential for every cell, tissue, and organ in your body. Staying hydrated helps regulate body temperature, lubricate joints, and transport nutrients. It flushes out toxins, supports digestion, and keeps your skin healthy and glowing. Hydration is also key for mental clarity, energy, and a positive mood.<br/><br/>
            Drinking enough water daily can boost your metabolism, aid in weight management, and help prevent headaches and fatigue. It supports heart, kidney, and muscle health, and is especially important during exercise or hot weather. <br/><br/>
            Experts recommend drinking at least 2–3 liters of water daily. Even mild dehydration can impact your focus, mood, and physical performance. Start your day with a glass of water, keep a bottle nearby, and make hydration a habit for a healthier, more energetic you!<br/><br/>
            <span className="font-semibold text-blue-700">Fun Fact:</span> Proper hydration can improve your mood, memory, and attention. Studies show that even mild dehydration can negatively affect your brain and energy levels. So, drink up and let your body and mind thrive!
          </p>
          <WaterIntakeCard />
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default Home;