import styled from "styled-components";

const UserPageWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: black solid 1px;
  border-radius: 5px;
  background-color: midnightblue;
  flex-direction: column;
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 0 10px 10px 10px;
  direction: rtl;
  width: 256px;
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
`;


const MainContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0 20px;
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const CloseButton = styled.div`
  background-color: white;
  color: black;
  width: 15px;
  height: 15px;
  float: right;
  align-self: start;
  margin: 2px;
  align-items: center;
  justify-items: self-end;
  display: flex;
`;

export {
    UserPageWrapper,
    FormContainer,
    Form,
    InputWrapper,
    MainContainer,
    TableContainer,
    CloseButton
}