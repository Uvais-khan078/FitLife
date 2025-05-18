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

function SleepCard() {
  const MIN_SLEEP_HOURS = 4;
  const [sleepHours, setSleepHours] = React.useState(() => {
    return parseFloat(localStorage.getItem("sleepHours")) || 0;
  });

  React.useEffect(() => {
    localStorage.setItem("sleepHours", sleepHours);
  }, [sleepHours]);

  const isLowSleep = sleepHours < MIN_SLEEP_HOURS;

  return (
    <div
      className={`w-full max-w-md p-6 rounded-3xl shadow-lg border transition-all duration-500 text-center mb-6
        ${isLowSleep
          ? 'bg-red-100 border-red-200 text-red-800'
          : 'bg-gradient-to-br from-purple-100 to-purple-50 border-purple-100 text-purple-900'}
      `}
      style={{ minHeight: 140 }}
    >
      <div className="text-2xl font-bold mb-2">Last Night's Sleep</div>
      <div className="text-4xl font-extrabold mb-1">{sleepHours.toFixed(1)} hrs</div>
      <div className="text-base font-medium">
        {isLowSleep ? 'Try to get at least 4 hours of sleep.' : 'Good job on your sleep!'}
      </div>
    </div>
  );
}

function Home() {
  return (
    <div>
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
        <div className="w-full max-w-7xl p-14 rounded-3xl shadow-2xl border bg-gradient-to-br from-purple-100 to-purple-50 border-purple-100 text-purple-900 text-center mb-12 transition-all duration-500 flex flex-col items-center">
          <div className="text-5xl font-extrabold mb-8 tracking-tight">Why Sleep Well?</div>
          <p className="text-xl font-medium leading-relaxed mb-10 max-w-4xl mx-auto">
            Sleep is essential for your overall health and well-being. It helps your body repair itself, supports brain function, and boosts your immune system. Quality sleep improves memory, mood, and cognitive performance.<br/><br/>
            Getting enough sleep daily can reduce the risk of chronic diseases, improve heart health, and enhance physical performance. It also helps regulate hormones that control appetite and stress.<br/><br/>
            Experts recommend aiming for 7-9 hours of sleep per night for most adults. Prioritizing sleep can lead to better energy, focus, and a healthier lifestyle.<br/><br/>
            <span className="font-semibold text-purple-700">Fun Fact:</span> Consistent good sleep can improve your mental health and reduce the risk of depression and anxiety. Make sleep a priority for a happier, healthier you!
          </p>
          <SleepCard />
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default Home;