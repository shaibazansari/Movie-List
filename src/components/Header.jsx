import Logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo-box">
        <img className="header__logo" src={Logo} alt="Movies App logo" />
      </div>
    </header>
  );
};

export default Header;
