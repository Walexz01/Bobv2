import Hero from "../components/Landing/Hero";
import Navbar from "../components/Landing/Navbar";
import Trainers from "../components/Landing/Trainers";
import Program from "../components/Landing/Program";
import WhyUS from "../components/Landing/WhyUS";
import "../landing.css";
import Offer from "../components/Landing/Offer";
import WorkoutGallery from "../components/Landing/WorkoutGallery";
import Package from "../components/Landing/Package";
const Landing = () => {
  return (
    <div className="landing">
      <Navbar />
      <Hero />
      <Program />
      <Trainers />
      <WhyUS />
      <Offer />
      <WorkoutGallery />
      <Package />
    </div>
  );
};

export default Landing;
