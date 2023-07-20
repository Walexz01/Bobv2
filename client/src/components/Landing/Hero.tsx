import heroimg from "../../assets/main_header.png";
import { Header_hero } from "../../data_landing";

const Hero = () => {
  return (
    <section className="hero__section">
      <div className="container hero_container">
        <div className="hero__left">
          <div className="left__hero--content">
            <div className="hero__head__text">
              <span className="bg_text">{Header_hero.bg_text}</span>
              <h2>{Header_hero.htext}</h2>
            </div>
            <p className="hero__head__detail">{Header_hero.des}</p>
            <button className="btn get_start_btn">Get Started</button>
          </div>
        </div>
        <div className="hero__right">
          <div className="hero_img_con">
            <img src={heroimg} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
