import { offer } from "../../data_landing";
const Offer = () => {
  return (
    <section className="offer__section">
      <div className="container offer_container">
        <div className="offer_left">
          <h2>{offer.head}</h2>
          <p>{offer.desc}</p>
          <button className="btn get_start_btn ">OUR CLASSES</button>
        </div>
        <div className="offer_right">
          <img src={offer.image} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Offer;
