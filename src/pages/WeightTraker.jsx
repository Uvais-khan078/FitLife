import Footer from "../components/Footer";
import Header from "../components/Header";

function WeightTraker() {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center h-screen bg-yellow-50">
        <div className="w-full max-w-7xl p-14 rounded-3xl shadow-2xl border bg-gradient-to-br from-yellow-100 to-yellow-50 border-yellow-100 text-yellow-900 text-center mb-12 transition-all duration-500">
          <div className="text-5xl font-extrabold mb-8 tracking-tight">
            Why Weight Control?
          </div>
          <p className="text-xl font-medium leading-relaxed mb-10 max-w-4xl mx-auto">
            Maintaining a healthy weight is crucial for overall well-being. It
            reduces the risk of chronic diseases such as diabetes, heart disease,
            and certain cancers. A balanced weight improves energy levels,
            mobility, and self-confidence.
            <br />
            <br />
            Healthy weight management involves a combination of regular physical
            activity, balanced nutrition, and adequate sleep. It also helps
            regulate hormones and supports mental health.
            <br />
            <br />
            <span className="font-semibold text-yellow-700">Fun Fact:</span> Even
            small, consistent changes in your daily habits can lead to
            significant improvements in weight control and overall health!
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
export default WeightTraker;