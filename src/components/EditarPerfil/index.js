import React, { useState } from 'react';
import './styles.css';
import imgFechar from '../../assets/fechar.svg';
import api from '../../services/api';

const EditarPerfil = ({ fecharModal }) => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmsenha: ''
  });

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
      await api.put('/usuario', {
        ...form
      },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      localStorage.setItem("usuario", JSON.stringify({
        id: usuario.id,
        nome: form.nome,
        email: form.email
      }));
      fecharModal();
    } catch (error) {
      alert(JSON.stringify(error.response.data.mensagem));
    }
  }

  return (
    <div className='fundo-modal'>
      <div className='container-modal-editar'>
        <div className='header-modal-editar'>
          <h1>Editar Perfil</h1>
          <img src={imgFechar} alt="fechar" onClick={fecharModal} />
        </div>
        <form className='form-modal-editar' onSubmit={handleSubmit}>
          <label>Nome
            <input type="text" name='nome' value={form.nome || usuario.nome} onChange={(e) => handleChangeForm(e)} />
          </label>
          <label>E-mail
            <input type="email" name='email' value={form.email || usuario.email} onChange={(e) => handleChangeForm(e)} />
          </label>
          <label>Senha
            <input type="password" name='senha' value={form.senha} onChange={(e) => handleChangeForm(e)} />
          </label>
          <label>Confirmação de senha
            <input type="password" name='confirmsenha' value={form.confirmsenha} onChange={(e) => handleChangeForm(e)} />
          </label>
          <button>Confirmar</button>
        </form>
      </div>
    </div>
  )
}

export default EditarPerfil;
