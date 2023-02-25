import React from 'react';
import styled from 'styled-components';
function Register(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('form');
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)} action=''>
          <div className='brand'>
            <img src='' alt='' />
          </div>
        </form>
      </FormContainer>
    </>
  );
}

const FormContainer = styled.div``;

export default Register;
