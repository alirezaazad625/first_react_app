import React, {useEffect} from "react";
import styled from "styled-components";
import Input from "../../components/Input";
import {SubmitHandler, useForm} from "react-hook-form";
import {SignUpFormData} from "./SignUpAPI";
import {useNavigate} from "react-router-dom";

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

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
`;


const Login = styled.div`
  background-color: transparent;
  color: white;
  padding-top: 10px;

  a {
    padding-right: 10px;
    color: deepskyblue;
  }
`;

const SignUpPage: React.FC = () => {
    const navigator = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("access_token")) navigator("/users")
    }, []);
    const {register, handleSubmit} = useForm<SignUpFormData>();
    const onSubmit: SubmitHandler<SignUpFormData> = () => {
        // navigator("/login");
    };
    return (
        <Wrapper>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputWrapper>
                    <Input type="text" {...register("firstName")} placeholder="نام"/>
                </InputWrapper>
                <InputWrapper>
                    <Input type="text" {...register("lastName")} placeholder="نام خانوادگی"/>
                </InputWrapper>
                <InputWrapper>
                    <Input type="text" {...register("phoneNumber")} placeholder="نام کاربری"/>
                </InputWrapper>
                <InputWrapper>
                    <Input type="password" {...register("password")} placeholder="رمز عبور"/>
                </InputWrapper>
                <InputWrapper>
                    <Input type="password" {...register("password")} placeholder="تکرار رمز عبور"/>
                </InputWrapper>
                <br/>
                <Input type="submit" value="ثبت نام"/>
            </Form>
            <Login>
                <span>
                    قبلا ثبت نام کرده اید؟
                </span>
                <a href="/login">ورود</a>
            </Login>
        </Wrapper>);
}


export default SignUpPage