import React, { useState } from 'react';
import './styles.css';
import Logo from '../../assets/Logo.png';
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';

const Cadastrar = () => {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmsenha: ''
  });

  const navigate = useNavigate();


  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nome || !form.email || !form.senha || !form.confirmsenha) {
      alert("Preencha todos os campos");
      return;
    }

    if (form.senha !== form.confirmsenha) {
      alert("A senha é confirmação de senha precisam ser iguais");
      return;
    }

    try {
      await api.post('/usuario', {
        ...form
      });
      navigate("/login");
    } catch (error) {
      alert(JSON.stringify(error.response.data.mensagem));
    }
  };

  return (
    <div className='container-signup'>
      <header>
        <img src={Logo} alt="Logo" />
      </header>
      <form onSubmit={handleSubmit}>
        <h1>Cadastre-se</h1>
        <label>
          Nome
          <input type="text" name='nome' value={form.nome} onChange={(e) => handleChangeForm(e)} />
        </label>
        <label>
          Email
          <input type="email" name='email' value={form.email} onChange={(e) => handleChangeForm(e)} />
        </label>
        <label>
          Senha
          <input type="password" name='senha' value={form.senha} onChange={(e) => handleChangeForm(e)} />
        </label>
        <label>
          Confirmação de senha
          <input type="password" name='confirmsenha' value={form.confirmsenha} onChange={(e) => handleChangeForm(e)} />
        </label>
        <button>Cadastrar</button>
        <Link to="/login">Já tem cadastro? Clique aqui!</Link>
      </form>
    </div >
  )
}

export default Cadastrar;
