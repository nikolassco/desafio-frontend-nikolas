import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import polygon from "../../assets/Polygon 1.svg"
import polygon2 from "../../assets/Polygon 2.svg"
import profile from "../../assets/profile-img.svg"
import unlog from "../../assets/unlog.svg"
import EditarPerfil from "../EditarPerfil";

const Header = () => {
    const [isVisible, setIsVisible] = useState(false);

    const navigate = useNavigate();

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const { nome } = usuario;

    const deslogar = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        navigate("/login");
    }

    const abrirModal = () => {
        setIsVisible(true);
    }

    const fecharModal = () => {
        setIsVisible(false);
    }

    return (
        <>
            {isVisible && <EditarPerfil fecharModal={fecharModal} />}
            <header className="header-main">
                <img className="img-poligono" src={polygon} alt="poligono" />
                <img className="img-poligono2" src={polygon2} alt="poligono" />
                <h1 className="h1-header">Dindin</h1>
                <div className="div-perfil">
                    <div className="perfil">
                        <img className="img-perfil" src={profile} alt="profile" onClick={abrirModal} />
                    </div>
                    <ul>{nome}</ul>
                    <img className="img-deslog" src={unlog} alt="deslogar" onClick={deslogar} />
                </div>
            </header>
        </>
    );
};

export default Header;
