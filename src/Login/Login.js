import React, { useState } from 'react';
import logo from '../Cabeza_Logo.jpg';
import PropTypes from 'prop-types';

async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

export default function Login({ setToken }) {
    const [id_number, setIDNumber] = useState();
    const [password, setPassword] = useState();
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          id_number,
          password
        });
        setToken(token);
      }
    return(
        <>
        <img src={logo} className="App-logo" alt="logo" />
        <div className="login">
        <h2 className="title">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <h4>Matrícula/Número de control</h4>
          <input type="text" id="id number" placeholder="Matrícula/Número de control" onChange={e => setIDNumber(e.target.value)}/>
          <h4>Contraseña</h4>
          <input type="password" id="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)}/>
          <input type="submit" id="save" value="Ingresar" className="ingress"/>
          <p>Si es tu primera vez en el sistema, la contraseña es tu matrícula</p>
        </form>
      </div>
      </>
    )
  }

  Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }