import Input from "../../components/Input";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from 'react-router-dom'
import {login, LoginFormData} from "./LoginAPI";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 20;
  height: 100vh;
  background-color: midnightblue;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 24px 30px;
  direction: rtl;
  width: 256px;
  background-color: white;
`;

const Error = styled.div`
  margin: 10px;
  //padding: 0 10px;
  color: red;
`;

const SignUp = styled.div`
  background-color: transparent;
  color: white;
  padding-top: 10px;

  a {
    padding-right: 10px;
    color: deepskyblue;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
`;


const LoginPage: React.FC = () => {
    const [error, setError] = useState<number>(200);
    const navigator = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("username")) navigator("/add")
    }, []);
    const {register, handleSubmit} = useForm<LoginFormData>();
    const onSubmit: SubmitHandler<LoginFormData> = (form) =>
        login(form).then(
            status => {
                if (status === 200) navigator("/users");
                else setError(status);
            }
        );
    return (
        <Wrapper>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputWrapper>
                    <Input id="username" type="text" {...register("username")} placeholder="نام کاربری"/>
                </InputWrapper>
                <InputWrapper>
                    <Input id="password" type="password" {...register("password")} placeholder="رمز عبور"/>
                </InputWrapper>
                <br/>
                <Error>
                    {error == 400 && <p> bad data </p> || error == 401 && <p> bad credentials </p>}
                </Error>
                <Input type="submit" value="ورود"/>
            </Form>
            <SignUp>
                <span>
                    هنوز ثبت نام نکرده اید؟
                </span>
                <a href="/signup">ثبت نام</a>
            </SignUp>
        </Wrapper>
    );
}

export default LoginPage