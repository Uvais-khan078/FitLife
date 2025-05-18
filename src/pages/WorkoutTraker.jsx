import Footer from "../components/Footer";
import Header from "../components/Header";

function WorkoutTraker() {
  return (
    <div>
        <Header />
        <div className="flex flex-col items-center justify-center h-screen bg-green-50">
          <div className="w-full max-w-7xl p-14 rounded-3xl shadow-2xl border bg-gradient-to-br from-green-100 to-green-50 border-green-100 text-green-900 text-center mb-12 transition-all duration-500">
            <div className="text-5xl font-extrabold mb-8 tracking-tight">Why Regular Workouts?</div>
            <p className="text-xl font-medium leading-relaxed mb-10 max-w-4xl mx-auto">
              Regular exercise is a cornerstone of a healthy lifestyle. It strengthens your heart, muscles, and bones while improving flexibility and endurance. Exercise also boosts mood, reduces stress, and enhances mental clarity.<br/><br/>
              Engaging in physical activity helps manage weight, improves sleep quality, and reduces the risk of chronic diseases. It also promotes better posture and balance.<br/><br/>
              <span className="font-semibold text-green-700">Fun Fact:</span> Just 30 minutes of moderate exercise a day can significantly improve your overall health and well-being. Start small and stay consistent!
            </p>
          </div>
          <div className="flex items-center justify-center">
            <h1 className="text-3xl font-bold text-red-500">
              🚧 This feature is under development. 🚧
            </h1>
          </div>
        </div>
        <Footer />
    </div>
  );
}
export default WorkoutTraker;