import image from "../../assets/gallery1.jpg";
import { packages } from "../../data_landing";
const Package = () => {
  return (
    <section className="package__section">
      <div className="container package_container">
        <span className="bg_text bg_sect_head">Choose Your Package</span>
        <div className="prices">
          {packages.map(({ price, head, benefit }, index) => (
            <div key={index} className="card price">
              <span className="price_tag">{price}</span>
              <img src={image} alt="" />
              <div className="details">
                <h2>{head} </h2>
                {benefit.map((value, index) => (
                  <span key={index}>{value}</span>
                ))}
                <button className="btn get_start_btn ">Join Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Package;
