import { NavLink, Link } from "react-router-dom";
import { NAV_TABS } from "./nav.config";
import Button from "../../common/Button";
import { Logo } from "../../../assets";
const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `
    text-dark-blue cursor-pointer
    transition-all duration-300
    ${isActive ? "font-bold underline" : "font-medium hover:underline"}
  `;

const Navbar = () => {
  return (
    <header className="max-w-[1136px] w-full mx-auto flex items-center justify-between py-[33.5px] px-3">
      <img src={Logo} alt="App Logo" className="h-8" />

      <nav className="flex items-center gap-[80px]">
        <ul className="flex items-center gap-[32px]">
          {NAV_TABS.map(({ label, path }) => (
            <li key={path}>
              <NavLink to={path} className={navLinkClass}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-[16px]">
          <Link to="/login">
            <Button title="Login" />
          </Link>

          <Link to="/signup">
            <Button title="Sign Up" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
