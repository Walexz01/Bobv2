import Hero from "../components/Landing/Hero";
import Navbar from "../components/Landing/Navbar";
import "../landing.css";
const Landing = () => {
  return (
    <div className="landing">
      <Navbar />
      <Hero />
    </div>
  );
};

export default Landing;
