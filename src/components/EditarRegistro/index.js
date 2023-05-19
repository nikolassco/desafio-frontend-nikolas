import React, { useEffect, useState } from "react";
import "../styles.css"
import fechar from "../../assets/fechar.svg";
import api from "../../services/api";

const Registro = ({ onClose, transacaoEditada }) => {
    const [valor, setValor] = useState("");
    const [categoria, setCategoria] = useState("");
    const [data, setData] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tipo, setTipo] = useState("entrada")
    const [id, setId] = useState(null)

    const token = localStorage.getItem("token");



    useEffect(() => {

        if (transacaoEditada) {
            setId(transacaoEditada.id)
            setTipo(transacaoEditada.tipo)
            setDescricao(transacaoEditada.descricao);
            setCategoria(transacaoEditada.categoria_nome);
            setValor(transacaoEditada.valor);
            setData(transacaoEditada.data);


        }

    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation()

        if (valor && categoria && data && descricao) {
            try {

                const response = await api.put(`/transacao/${id}`, {
                    valor,
                    categoria,
                    data,
                    descricao
                },
                    {

                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                setValor("");
                setCategoria("");
                setData("");
                setDescricao("");
                onClose()
                window.location.reload();


            } catch (error) {

            }

        }

    };

    return (
        <div className="modal-registro visivel">
            <div className="div-registro">
                <h1>
                    Editar Registro
                    <img onClick={onClose} src={fechar} alt="Fechar" />
                </h1>
                <div className="div-button">
                    <button className={`button-entrada button-style ${tipo === "entrada" ? "selecionado" : ""}`}
                        onClick={() => setTipo("entrada")}>Entrada</button>
                    <button className={`button-saida button-style ${tipo === "saida" ? "selecionado" : ""}`}
                        onClick={() => setTipo("saida")}>Saída</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <label className="rubik500">Valor</label>
                    <input
                        type="text"
                        value={valor}
                        onChange={(event) => setValor(event.target.value)}
                        required
                    />
                    <label className="rubik500">Categoria</label>
                    <select
                        value={categoria}
                        onChange={(event) => setCategoria(event.target.value)}
                        required
                    >
                        <option value="">{categoria}</option>

                        <option
                            key={transacaoEditada.categoria_id}
                            value={transacaoEditada.categoria_nome}
                            className="rubik400"
                        >
                            {transacaoEditada.categoria_nome}
                        </option>

                    </select>
                    <label className="rubik500">Data</label>
                    <input
                        type="text"
                        value={data}
                        onChange={(event) => setData(event.target.value)}
                        required
                    />
                    <label className="rubik500">Descrição</label>
                    <input
                        type="text"
                        value={descricao}
                        onChange={(event) => setDescricao(event.target.value)}
                        required
                    />
                    <button className="adicionarRegistro margin" type="submit" >
                        Confirmar
                    </button>
                </form>
            </div>
        </div >
    );
};

export default Registro;
