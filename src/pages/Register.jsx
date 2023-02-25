import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';
function Register(props) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const toastOptions = {
    autoClose: 3000,
    position: 'bottom-right',
    draggable: true,
    pauseOnHover: true,
    theme: 'dark',
  };

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/');
    }
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        navigate('/');
      }
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error('密码不一致', toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error('用户名不能少于三个', toastOptions);
      return false;
    } else if (username.length > 8) {
      toast.error('用户名最长为八个');
      return false;
    } else if (email === '') {
      toast.error('邮箱不能为空', toastOptions);
      return false;
    }
    return true;
  };

  console.log(ToastContainer);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
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
      <ToastContainer />
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
