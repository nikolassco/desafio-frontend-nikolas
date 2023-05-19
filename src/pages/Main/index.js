import React, { useState, useEffect } from "react";
import Filtrar from "../../assets/filtrar.svg";
import Data from "../../assets/data-tabela.svg";
import caneta from "../../assets/pen.png";
import lixeira from "../../assets/lix.png";
import '../../App.css';
import Header from '../../components/Header';
import Resumo from "../../components/Resumo";
import api from "../../services/api";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import Editar from "../../components/EditarRegistro";
import Deletar from "../../components/Deletar/Deletar";

const Main = () => {

    const [isVisible, setIsVisible] = useState(false);
    const [isDeletar, setIsDeletar] = useState(false);
    const [tabela, setTabela] = useState([]);
    const [registroId, setRegistroId] = useState(null);
    const [transacaoEditada, setTransacaoEditada] = useState(null)
    const token = localStorage.getItem("token");

    const del = async (id) => {
        try {
            await api.delete(`/transacao/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            atualizarInformacoes();
        } catch (error) {
        }
    };

    const openModal = (event, modalType, registroId, transacao) => {
        event.preventDefault();
        event.stopPropagation();
        if (modalType === 'editar') {
            setIsVisible(true);
            setTransacaoEditada(transacao);
        } else if (modalType === 'deletar') {
            setIsDeletar(true);
            setRegistroId(registroId);
        }
    }

    const closeModal = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsVisible(false);
        setIsDeletar(false)
    };

    const atualizarInformacoes = async () => {
        try {
            const response = await api.get("/transacao", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const novoRegistro = response.data
            const novaTabela = [...novoRegistro];
            setTabela(novaTabela);
        } catch (error) {
            alert(JSON.stringify(error.response.data.mensagem));
        }
    }
    useEffect(() => {
        atualizarInformacoes();
    });




    return (
        <>
            <Header />
            <div className="bordas">
                <div className="filtrar">
                    <img src={Filtrar} alt="Filtrar" />
                    <li>Filtrar</li>
                </div>
                <main className="main-tabela">
                    <table className="tabela">
                        <tbody>
                            <tr >
                                <td className="coluna fontes700">Data <img src={Data} alt="icone de ordenação" /></td>
                                <td className="coluna fontes700">Dia da Semana</td>
                                <td className="coluna fontes700">Descrição</td>
                                <td className="coluna fontes700">Categoria</td>
                                <td className="coluna fontes700">valor</td>
                                <td className="coluna fontes700"></td>
                            </tr>
                            {tabela.map((novoRegistro, index) => (
                                <tr key={index}>
                                    <td className={`fontes700 ${novoRegistro.tipo === "entrada" ? "texto-laranja" : "texto-vermelha"}`}>
                                        {format(parseISO(novoRegistro.data), "dd/MM/yyyy")}</td>
                                    <td className={`fontes400 ${novoRegistro.tipo === "entrada" ? "texto-laranja" : "texto-vermelha"}`}>
                                        {format(parseISO(novoRegistro.data), "iii", { locale: ptBR })}</td>
                                    <td className={`fontes400 ${novoRegistro.tipo === "entrada" ? "texto-laranja" : "texto-vermelha"}`}>
                                        {novoRegistro.descricao}</td>
                                    <td className={`fontes400 ${novoRegistro.tipo === "entrada" ? "texto-laranja" : "texto-vermelha"}`}>
                                        {novoRegistro.categoria_nome}</td>
                                    <td className={`fontes700 ${novoRegistro.tipo === "entrada" ? "texto-laranja" : "texto-vermelha"}`}>
                                        {`R$ ${novoRegistro.valor},00`}</td>

                                    <td className="editarDeletar"><img
                                        onClick={(event) => openModal(event, 'editar', novoRegistro.id, novoRegistro)}
                                        className="editar"
                                        src={caneta}
                                        alt="editar" />
                                        <img
                                            onClick={() => del(novoRegistro.id)}
                                            className="deletar"
                                            src={lixeira}
                                            alt="excluir"
                                        />                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Resumo tabela={tabela} setTabela={setTabela} />

                </main>
            </div>
            {isDeletar && (<Deletar onclose={closeModal}
                onDelete={() => del(registroId)}
            />)}
            {isVisible && (<Editar onClose={closeModal} transacaoEditada={transacaoEditada} />)}


        </>
    );
};

export default Main;
