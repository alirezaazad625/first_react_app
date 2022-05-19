import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import Popup from 'reactjs-popup';
import Input from "../../components/Input";
import Select from "react-select";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose, faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {createUser, deleteUser, getUsers, User, UserRequest} from "./UsersAPI";
import {useNavigate} from "react-router-dom";
import {CloseButton, Form, FormContainer, InputWrapper, MainContainer, TableContainer} from "../Styled";
import {getRoles, Role} from "../roles/RolesAPI";


export default () => {

    const navigator = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    let currentUser = localStorage.getItem("access_token");
    if (!currentUser) currentUser = "";
    let hasDeletePermission = JSON.parse(atob(currentUser.split(".")[1])).roles.includes('ROLE_DELETE_USER');
    let hasUpdatePermission = JSON.parse(atob(currentUser.split(".")[1])).roles.includes('ROLE_UPDATE_USER');
    let hasCreatePermission = JSON.parse(atob(currentUser.split(".")[1])).roles.includes('ROLE_CREATE_USER');
    useEffect(
        () => {
            updateUsers().then()
            getRoles().then(content => setRoles(content))
        }, []
    );

    function removeUser(user: User) {
        if (window.confirm(`are you sure about removing user ${user.username} ?`)) {
            deleteUser(user.username).then(() => {
                    let newUsers = users.filter(function (u) {
                        return u !== user
                    })
                    setUsers(newUsers)
                }
            )
        }
    }

    const updateUsers = () => getUsers().then(content => {
        setUsers(content);
    });

    const {register, handleSubmit, setValue} = useForm<UserRequest>();

    return (
        <MainContainer>
            {hasCreatePermission &&
            <Popup key={"create_user"}
                   trigger={<button className={"create-button"}>ساخت</button>}
                   position="center center"
                   modal nested closeOnEscape>
                {(close: () => any) => (
                    <FormContainer>
                        <CloseButton>
                            <FontAwesomeIcon cursor={"pointer"} icon={faClose} height="100%" width="100%"
                                             onClick={() => close()}/>
                        </CloseButton>

                        <Form onSubmit={handleSubmit((user) => {
                            createUser(user).then(() => {
                                updateUsers().then()
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
                                    value: role.id,
                                    label: role.name,
                                }
                            })}
                                    isMulti={false}
                                    isClearable={false}
                                    placeholder={"نقش"}
                                    onChange={option => {
                                        setValue("roleId", option != null ? option.value : 0)
                                    }}
                            />
                            <br/>
                            <Input type="submit" value="ساخت"/>
                        </Form>
                    </FormContainer>
                )}
            </Popup>
            }
            <TableContainer>
                <table>
                    <thead>
                    <tr>
                        <td>نام کاربری</td>
                        <td>نام</td>
                        <td>نام خانوادگی</td>
                        <td>نقش</td>
                        {hasUpdatePermission && <td>ویرایش</td>}
                        {hasDeletePermission && <td>حذف</td>}
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
                                    {hasUpdatePermission &&
                                    <td>
                                        <FontAwesomeIcon
                                            cursor={"pointer"}
                                            icon={faPenToSquare}
                                            onClick={() => navigator("/users/" + user.username)}
                                        />
                                    </td>
                                    }
                                    {hasDeletePermission &&
                                    <td>
                                        <FontAwesomeIcon
                                            cursor={"pointer"}
                                            icon={faTrash}
                                            onClick={() => removeUser(user)}
                                        />
                                    </td>
                                    }
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
