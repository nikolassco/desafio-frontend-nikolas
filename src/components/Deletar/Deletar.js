import React, { useState } from "react";
import "../../App.css";
import api from "../../services/api"
import { del } from "../../pages/Main/index"


const Deletar = ({ onClose, onDelete }) => {
    const [isDeletar, setIsDeletar] = useState(false);
    // ...

    const del = async () => {
        try {
            await onDelete();
            setIsDeletar(false);
        } catch (error) {
        }
    };
    const token = localStorage.getItem("token");

    const delegar = async () => {
        try {
            const response = await api.get("/transacao", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const id = response.data

            const resposta = async () => {
                await api.delete(`/transacao:${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            }
            resposta()
        } catch (error) {

        }
    }

    return (
        <div className="modal-registro">
            <div className="apagarItem modal-deletar">
                <h1 className="h1Apagar">Apagar Item?</h1>
                <div className="botoes">
                    <button onClick={del} className="botaoAzul">Sim</button>
                    <button className="botaoRosa">Não</button>
                </div>
            </div>
        </div>
    );
};

export default Deletar;