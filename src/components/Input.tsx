import React from "react";
import styled from "styled-components";

const Input = styled.input`
  direction: ltr;
  border-radius: 5px;
  padding: 0 4px;
  background-color: ${({type}) => type === 'submit' ? "#1990ff" : "white"};
  color: ${({type}) => type === 'submit' ? "white" : "black"};
  width: 100%;
  height: 42px;
  margin: 10px 0 0 0;
  border: ${({type}) => type === 'submit' ? "none" : "1px solid #888888"};
`

export default Input