import React, { useEffect, useState } from 'react';
import Registro from "../AdicionarRegistro"
import "../../App.css";
import api from '../../services/api';

const Resumo = ({ tabela, setTabela }) => {

  useEffect(() => {
    pegarExtrato();
  });

  const token = localStorage.getItem("token");
  const [entrada, setEntrada] = useState(0);
  const [saida, setSaida] = useState(0);
  const [saldo, setSaldo] = useState(0);

  const [isVisible, setIsVisible] = useState(false);

  const openModal = (event) => {
    setIsVisible(true);
  }


  const closeModal = (event) => {
    setIsVisible(false);
  }

  const pegarExtrato = async (event) => {

    try {
      const response = await api.get("/transacao/extrato",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setEntrada(response.data.entrada);
      setSaida(response.data.saida);
      setSaldo(response.data.entrada - response.data.saida);

    } catch (error) {
    }
  }




  return (
    <>
      <div className="div-resumo">
        <h1 className="h1-resumo rubik700">Resumo</h1>
        <div className="conteudo-resumo">
          <li className="li-resumo rubik500">Entradas</li>
          <li className="li-resumo rubik500 font_roxa">R$ {entrada.toFixed(2)}</li>
          <li className="li-resumo rubik500">Saidas</li>
          <li className="li-resumo rubik500 font_laranja">R$ {saida.toFixed(2)}</li>
          <li className="rubik700">saldo</li>
          <li className="li-resumo rubik500 font_azul">R$ {saldo.toFixed(2)}</li>
        </div>
        <button onClick={openModal} className="adicionarRegistro">Adicionar Registros</button>
      </div>
      {isVisible && (<Registro onClose={closeModal} tabela={tabela} setTabela={setTabela} />)}

    </>
  )
}

export default Resumo;
