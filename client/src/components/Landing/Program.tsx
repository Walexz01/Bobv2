import { OurProgram } from "../../data_landing";
const Program = () => {
  return (
    <section className="feature__section">
      <div className="container feature_container">
        <span className="bg_text bg_sect_head">Our Program</span>
        <div className="cards">
          {OurProgram.map(({ heading, details, image }, index) => (
            <div key={index} className="card">
              <img src={image} alt="" />
              <h2>{heading}</h2>
              <p>{details} </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Program;
