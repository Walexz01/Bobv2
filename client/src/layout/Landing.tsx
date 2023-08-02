import Hero from "../components/Landing/Hero";
import Navbar from "../components/Landing/Navbar";
import Trainers from "../components/Landing/Trainers";
import "../landing.css";
import Program from "../components/Landing/Program";
import WhyUS from "../components/Landing/WhyUS";
const Landing = () => {
  return (
    <div className="landing">
      <Navbar />
      <Hero />
      <Program />
      <Trainers />
      <WhyUS />
    </div>
  );
};

export default Landing;
