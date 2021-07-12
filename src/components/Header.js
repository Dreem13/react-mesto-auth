import logo from '../images/logo_w.svg';

function Header() {
    return (
        <header className="header">
            <a className="header__logo"><img src={logo} alt="Логотип портала Место" /></a>
        </header>
    )
}

export default Header;
