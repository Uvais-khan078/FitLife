import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import WaterIntake from './pages/WaterIntake';
import SleepTraker from './pages/SleepTraker';
import WorkoutTraker from './pages/WorkoutTraker';
import WeightTraker from './pages/WeightTraker';
import ErrorPage from './pages/ErrorPage';
import Test from './pages/Test';

function App() {

  return (
   <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/water-intake" element={<WaterIntake />}/>
        <Route path="/workout-traker" element={<WorkoutTraker />}/>
        <Route path="/sleep-traker" element={<SleepTraker />}/>
        <Route path="/weight-traker" element={<WeightTraker />}/>
        <Route path="/Dev" element={<Test />}/>
        <Route path="*" element={<ErrorPage />} />
        </Routes>
    </Router>
  )
}

export default App
