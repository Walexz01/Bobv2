import { trainers } from "../../data_landing";

const Trainers = () => {
  return (
    <section className="trainers__section">
      <div className="container trainers_container">
        <span className="bg_text bg_sect_head">Our Trainers</span>
        <div className="cards trainers_cards">
          {trainers.map(({ image, name, role, links }, index) => (
            <div key={index} className="card trainers_card">
              <img src={image} alt="" />
              <div className="details">
                <h2>{name}</h2>
                <p>{role}</p>
                <div className="trainer_links">
                  {links.map(({ Icon, link }, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="trainer_link"
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trainers;
