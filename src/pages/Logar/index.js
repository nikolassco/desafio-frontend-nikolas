import React, { useState } from 'react';
import './styles.css';
import Logo from '../../assets/Logo.png';
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';


const Logar = () => {
  const [form, setForm] = useState({
    email: '',
    senha: ''
  });

  const navigate = useNavigate();

  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.senha) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      const response = await api.post('/login', {
        ...form
      });
      const { token, usuario } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      navigate("/");
    } catch (error) {
      alert(JSON.stringify(error.response.data.mensagem));
    }
  };

  return (
    <div className='container-login'>
      <header>
        <img src={Logo} alt="Logo" />
      </header>
      <div className='container-section-form'>
        <section>
          <h1>Controle suas <span>finanças</span>, sem planilha chata.</h1>
          <p>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</p>
          <Link to="/signup">Cadastre-se</Link>
        </section>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <label>
            Email
            <input type="email" name='email' value={form.email} onChange={(e) => handleChangeForm(e)} />
          </label>
          <label>
            Senha
            <input type="password" name='senha' value={form.senha} onChange={(e) => handleChangeForm(e)} />
          </label>
          <button>Entrar</button>
        </form>
      </div>

    </div>
  )
}

export default Logar;
