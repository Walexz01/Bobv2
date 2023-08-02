import whyus from "../../assets/whyus.png";
import { WhyUsList } from "../../data_landing";
const WhyUS = () => {
  return (
    <section className="Whyus__section">
      <div className="container whyus_container">
        <div className="whyus_left">
          <img src={whyus} alt="" />
        </div>
        <div className="whyus_right">
          <span className="bg_text bg_sect_head">WHY CHOOSE US</span>
          <div className="whyus_right_conntent">
            <h2>Unleash Your Potential</h2>
            <p>
              we take pride in our fully equipped gyming center designed to
              elevate your fitness experience. Step into a world of cutting-edge
              fitness equipment and an inviting ambiance that sets the stage for
              transformative workouts.
            </p>
            <div className="whys_list">
              {WhyUsList.map(({ image, text }, index) => (
                <div key={index} className="why">
                  <img src={image} alt="" />
                  <h3>{text}</h3>
                </div>
              ))}
            </div>
            <button className="btn get_start_btn ">OUR CLASSES</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUS;
