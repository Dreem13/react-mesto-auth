import logo from '../images/logo_w.svg';
import { Route, Switch, Link } from 'react-router-dom';

function Header({userEmail, onSignOut}) {

    return (
        <header className="header">
            <a className="header__logo"><img src={logo} alt="Логотип портала Место" /></a>
            <div className="header__menu">
                <Switch>
                    <Route path="/sign-up"><Link className="header__item" to="/sign-in">Вход</Link></Route>
                    <Route path="/sign-in"><Link className="header__item" to="/sign-up">Регистрация</Link></Route>
                    <Route exact path="/">
                        <p className="header__email">{userEmail}</p>
                        <button className="header__item" onClick={onSignOut}>Выйти</button>
                    </Route>
                </Switch>
            </div>
        </header>
    )
}

export default Header;
