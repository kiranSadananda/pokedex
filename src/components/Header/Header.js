import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/img/pokedex.png";
import "./header.css"
const Header = () => {
    return(
        <header>
            <Container fluid className="mb-5">
                <Link to='/'>
                    <div className="text-center mt-2">
                        <img className="logo-img"src={logo} title="Go to Home" alt="LOGO Go To Home" />
                    </div>
                </Link>
            </Container>
        </header>
    )
}

export default Header;