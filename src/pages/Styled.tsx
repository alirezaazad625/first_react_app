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
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 10px;
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
`;

const TableContainer = styled.div`
  width: 100%;
  border: black solid 1px;
  overflow-x: auto;
`;

export {
    UserPageWrapper,
    FormContainer,
    Form,
    InputWrapper,
    MainContainer,
    TableContainer
}