import React, { useEffect, useState } from "react";
import "../styles.css"
import fechar from "../../assets/fechar.svg";
import api from "../../services/api";

const Registro = ({ onClose, onSubmit, tabela, setTabela }) => {
    const [categorias, setCategorias] = useState([]);
    const [valor, setValor] = useState("");
    const [categoria, setCategoria] = useState("");
    const [data, setData] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tipo, setTipo] = useState("saida")

    const token = localStorage.getItem("token");



    useEffect(() => {
        fetchCategorias();
    });

    const fetchCategorias = async () => {
        try {
            const response = await api.get("/categoria", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCategorias(response.data);

        } catch (error) {
            alert(JSON.stringify(error.response.data.mensagem));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const categoriaSelecionada = categorias.find((cat) => cat.descricao === categoria);

        const registroData = {
            tipo,
            descricao,
            valor,
            data,
            categoria_id: categoriaSelecionada.id
        };
        try {
            const response = await api.post("/transacao", registroData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            const { data } = response;
            setValor("");
            setCategoria("");
            setData("");
            setDescricao("");
            onClose()
            setTabela([...tabela, data]);
        } catch (error) {
            alert(JSON.stringify(error.response.data.mensagem));
        }
    };

    return (
        <div className="modal-registro visivel">
            <div className="div-registro">
                <h1>
                    Adicionar Registro
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
                        type="number"
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
                        <option value="">Selecione uma categoria</option>
                        {categorias.map((categoria) => (
                            <option
                                key={categoria.id}
                                value={categoria.descricao}
                                className="rubik400"
                            >
                                {categoria.descricao}
                            </option>
                        ))}
                    </select>
                    <label className="rubik500">Data</label>
                    <input
                        type="date"
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
