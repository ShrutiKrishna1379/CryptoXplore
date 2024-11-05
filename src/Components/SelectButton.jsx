import React from 'react';
import { styled } from '@mui/material/styles';

const SelectButton = ({ children, selected, onClick }) => {
  const StyledButton = styled('span')(({ theme }) => ({
    border: '1px solid #078dfa',
    borderRadius: 5,
    padding: '10px 20px',
    fontFamily: 'Montserrat',
    cursor: 'pointer',
    backgroundColor: selected ? '#078dfa' : '',
    color: selected ? 'black' : '',
    fontWeight: selected ? 700 : 500,
    '&:hover': {
      backgroundColor: '#078dfa',
      color: 'black',
    },
    width: '22%',
    margin: 5,
  }));

  return (
    <StyledButton onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default SelectButton;