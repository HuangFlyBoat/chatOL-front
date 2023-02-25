import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
function Register(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('form');
  };
  const handleChange = (e) => {};
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)} action=''>
          <div className='brand'>
            <img src={Logo} alt='' />
            <h1>snappy</h1>
          </div>
          <input
            type='text'
            name='username'
            placeholder='用户名'
            onChange={(e) => handleChange(e)}
          />
          <input
            type='email'
            name='email'
            placeholder='邮箱'
            onChange={(e) => handleChange(e)}
          />
          <input
            type='password'
            name='password'
            placeholder='密码'
            onChange={(e) => handleChange(e)}
          />
          <input
            type='password'
            name='confirmPassword'
            placeholder='确认密码'
            onChange={(e) => handleChange(e)}
          />
          <button type='submit'>注册</button>
          <span>
            已有账号？ <Link to='/login'>登录</Link>
          </span>
        </form>
      </FormContainer>
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register;
