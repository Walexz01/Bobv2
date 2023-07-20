import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import Logo from "../../assets/logo.png";
import { useState } from "react";
import { Links } from "../../data_landing";

const Navbar = () => {
  const [isNavShowing, setIsNavShowing] = useState(false);
  return (
    <nav className="nav ">
      <div className="nav__container container">
        <img src={Logo} alt="" />
        <ul className={isNavShowing ? "nav__links nav_show" : "nav__links"}>
          {Links.map(({ label, path }, index) => (
            <li className="nav__link" key={index}>
              <NavLink to={path}>{label}</NavLink>
            </li>
          ))}
        </ul>
        <div className="shop__show">
          <button className="btn shop_now">
            <Link to={"/dash/home"}>Shop Now</Link>
          </button>
          <div
            className="show_nav"
            onClick={() => setIsNavShowing(!isNavShowing)}
          >
            {isNavShowing ? <MdOutlineClose /> : <FaBars />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
