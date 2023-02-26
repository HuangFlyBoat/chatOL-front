import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Buffer } from 'buffer';
import loader from '../assets/loader.gif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { setAvatarRoute } from '../utils/APIRoutes';
function SetAvatar(props) {
  const api = 'https://api.multiavatar.com/45678945';
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selcetedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    autoClose: 3000,
    position: 'bottom-right',
    draggable: true,
    pauseOnHover: true,
    theme: 'dark',
  };
  const setProfilePicture = async () => {
    if (selcetedAvatar === undefined) {
      toast.error('请选择头像', toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem('chat-app-user'));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selcetedAvatar],
      });
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem('chat-app-user', JSON.stringify(user));
        navigate('/');
      } else {
        toast.error('头像设置错误，请重试', toastOptions);
      }
    }
  };
  // 如果没有登录直接返回
  useEffect(() => {
    if (!localStorage.getItem('chat-app-user')) {
      navigate('/login');
    }
  }, []);
  //   获取头像
  useEffect(() => {
    async function getAva(params) {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString('base64'));
      }
      setAvatars(data);
      setIsLoading(false);
    }
    getAva();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt='loader' className='loader' />
        </Container>
      ) : (
        <Container>
          <div className='title-container'>
            <h1>选一个头像吧</h1>
          </div>
          <div className='avatars'>
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selcetedAvatar === index ? 'selected' : ''
                  }`}>
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt='avatar'
                    onClick={() => {
                      setSelectedAvatar(index);
                    }}
                  />
                </div>
              );
            })}
          </div>
          <button className='submit-btn' onClick={setProfilePicture}>
            设置为头像
          </button>
        </Container>
      )}

      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #997af0;
    color: white;
    padding: 1rem 1rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;

export default SetAvatar;
