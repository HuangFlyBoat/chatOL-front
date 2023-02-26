import React from 'react';
import styled from 'styled-components';
import Robot from '../assets/robot.gif';
function Welcome({ currentUser }) {
  return (
    <Container>
      <img src={Robot} alt='Robot' />
      <h1>
        欢迎,<span>{currentUser.username}!</span>
      </h1>
      <h3>请选择一个对话开始聊天 </h3>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  img {
    height: 20rem;
  }
  span {
    color: #4e00ff;
  }
`;
export default Welcome;
