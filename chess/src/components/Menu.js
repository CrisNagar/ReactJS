import React from "react";

class Menu extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-light fixed-top">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Chees Cake</h5>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item" key="ni-1">
                                    <a className="nav-link active" aria-current="page" href="!#">Nueva partida</a>
                                </li>
                                <li className="nav-item" key="ni-2">
                                    <a className="nav-link" href="!#">Conceder</a>
                                </li>
                                <li className="nav-item dropdown" key="nid-1">
                                    <a className="nav-link dropdown-toggle" href="!#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Cambiar dificultad
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">
                                        <li key="di-1"><a className="dropdown-item" href="!#">Facil</a></li>
                                        <li key="di-2"><a className="dropdown-item" href="!#">Normal</a></li>
                                        <li key="di-3"><a className="dropdown-item" href="!#">Medio</a></li>
                                        <li key="di-4"><a className="dropdown-item" href="!#">Dificil</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Menu;