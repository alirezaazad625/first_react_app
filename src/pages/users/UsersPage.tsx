import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import Popup from 'reactjs-popup';
import Input from "../../components/Input";
import Select from "react-select";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {createUser, deleteUser, getUsers, User, UserRequest} from "./UsersAPI";
import {useNavigate} from "react-router-dom";
import {Form, FormContainer, InputWrapper, MainContainer, TableContainer} from "../Styled";
import {getRoles, Role} from "../roles/RolesAPI";


export default () => {

    const navigator = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    useEffect(
        () => {
            updateUsers()
            getRoles().then(content => setRoles(content))
        }
        , []
    );

    function removeUser(user: User) {
        deleteUser(user.username).then(() => {
                let newUsers = users.filter(function (u) {
                    return u !== user
                })
                setUsers(newUsers)
            }
        )
    }

    const updateUsers = () => getUsers().then(content => {
        setUsers(content);
    });

    const {register, handleSubmit, setValue} = useForm<UserRequest>();

    return (
        <MainContainer>
            <Popup key={"create_user"}
                   trigger={<button className={"create-button"}>ساخت</button>}
                   position="center center"
                   modal nested closeOnEscape>
                {(close: () => any) => (
                    <FormContainer>
                        <Form onSubmit={handleSubmit((user) => {
                            createUser(user).then(() => {
                                getUsers().then(() => updateUsers())
                                close()
                            });
                        })}>
                            <InputWrapper>
                                <Input type="text" {...register("username")} placeholder="نام کاربری"/>
                            </InputWrapper>
                            <InputWrapper>
                                <Input type="text" {...register("firstName")} placeholder="نام"/>
                            </InputWrapper>
                            <InputWrapper>
                                <Input type="text" {...register("lastName")} placeholder="نام خانوادگی"/>
                            </InputWrapper>
                            <InputWrapper>
                                <Input type="password" {...register("password")} placeholder="رمز عبور"/>
                            </InputWrapper>
                            <br/>
                            <Select options={roles.map(role => {
                                return {
                                    value: role.name,
                                    label: role.name,
                                }
                            })}
                                    isMulti={false}
                                    isClearable={false}
                                    placeholder={"نقش"}
                                    onChange={option => {
                                        setValue("roleName", option != null ? option.value : "")
                                    }}
                            />
                            <br/>
                            <Input type="submit" value="ساخت"/>
                            <button onClick={() => close()}> بستن </button>
                        </Form>
                    </FormContainer>
                )}
            </Popup>
            <TableContainer>
                <table>
                    <thead>
                    <tr>
                        <td>نام کاربری</td>
                        <td>نام</td>
                        <td>نام خانوادگی</td>
                        <td>نقش</td>
                        <td>ویرایش</td>
                        <td>حذف</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map(
                            user => (
                                <tr key={user.username}>
                                    <td>{user.username}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.roleName}</td>
                                    <td>
                                        <FontAwesomeIcon
                                            cursor={"pointer"}
                                            icon={faPenToSquare}
                                            onClick={() => navigator("/users/" + user.username)}
                                        />
                                    </td>
                                    <td>
                                        <FontAwesomeIcon
                                            cursor={"pointer"}
                                            icon={faTrash}
                                            onClick={() => removeUser(user)}
                                        />
                                    </td>
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </table>
            </TableContainer>
        </MainContainer>
    );
}
