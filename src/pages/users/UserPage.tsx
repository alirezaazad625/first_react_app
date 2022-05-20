import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getUser, updateUser, User, UserRequest} from "./UsersAPI";
import Input from "../../components/Input";
import Select from "react-select";
import {Form, FormContainer, InputWrapper, UserPageWrapper} from "../Styled";
import {SubmitHandler, useForm} from "react-hook-form";
import {getRoles, Role} from "../roles/RolesAPI";

const UserPage: React.FC = () => {
    let params = useParams();
    const navigator = useNavigate();
    const [user, setUser] = useState<User>();
    const updateForm = useForm<UserRequest>();
    const [roles, setRoles] = useState<Role[]>([]);

    const updateUserAction: SubmitHandler<UserRequest> = (user) => {
        updateUser(user).then(() => navigator("/users"));
    };
    useEffect(() => {
        getUser(params.username).then((response) => {
            setUser(response);
            updateForm.setValue("username", params.username ? params.username : "");
            updateForm.setValue("roleId", response.roleName)
            getRoles().then(content => setRoles(content))
        })
    }, []);

    return (
        <>
            {user && <UserPageWrapper>
                <h1>
                    نام کاربری : {user.username}
                </h1>
                <FormContainer>
                    <Form
                        onSubmit={updateForm.handleSubmit(updateUserAction)}>
                        <InputWrapper>
                            <Input type="text" {...updateForm.register("firstName")}
                                   placeholder="نام" defaultValue={user.firstName}/>
                        </InputWrapper>
                        <InputWrapper>
                            <Input type="text" {...updateForm.register("lastName")}
                                   placeholder="نام خانوادگی" defaultValue={user.lastName}/>
                        </InputWrapper>
                        <InputWrapper>
                            <Input type="password" {...updateForm.register("password")}
                                   placeholder="رمز عبور"/>
                        </InputWrapper>
                        <br/>
                        <Select options={roles.map(role => {
                            return {
                                value: role.id,
                                label: role.name,
                            }
                        })}
                                isMulti={false}
                                isClearable={false}
                                placeholder={"نقش"}
                                onChange={option => {
                                    updateForm.setValue("roleId", option != null ? option.value : 0)
                                }}
                                defaultValue={[{
                                    label: user.roleName,
                                    value: user.roleId
                                }]}
                        />
                        <br/>
                        <Input type="submit" value="بروزرسانی"/>
                    </Form>
                </FormContainer>
            </UserPageWrapper>
            }
        </>
    )
}

export default UserPage