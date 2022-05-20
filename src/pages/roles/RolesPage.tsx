import React, {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import Popup from 'reactjs-popup';
import Input from "../../components/Input";
import Select from "react-select";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {Form, FormContainer, InputWrapper, MainContainer, TableContainer} from "../Styled";
import {createRole, deleteRole, getRoles, Options, Role, RoleRequest} from "./RolesAPI";


export default () => {

    const navigator = useNavigate();
    const [roles, setRoles] = useState<Role[]>([]);
    useEffect(
        () => {
            updateRoles()
        }
        , []
    );

    function removeRole(role: Role) {
        deleteRole(role.id).then(() => {
                let newRoles = roles.filter(function (u) {
                    return u !== role
                })
                setRoles(newRoles)
            }
        )
    }

    const updateRoles = () => getRoles().then(content => {
        setRoles(content);
    });

    const {register, handleSubmit, setValue} = useForm<RoleRequest>();
    const createRoleAction: SubmitHandler<RoleRequest> = (role) => {
        createRole(role).then(() => getRoles().then(() => updateRoles()));
    };

    return (
        <MainContainer>
            <Popup key={"create_role"}
                   trigger={<button className={"create-button"}>ساخت</button>}
                   position="center center"
                   modal nested closeOnEscape>
                <FormContainer>
                    <Form onSubmit={handleSubmit(createRoleAction)}>
                        <InputWrapper>
                            <Input type="text" {...register("name")} placeholder="نام"/>
                        </InputWrapper>
                        <br/>
                        <Select options={Options}
                                isMulti
                                isClearable={false}
                                placeholder={"دسترسی ها"}
                                onChange={options => {
                                    setValue("permissions", options.map(o => o.value))
                                }}
                        />
                        <br/>
                        <Input type="submit" value="ساخت"/>
                    </Form>
                </FormContainer>
            </Popup>
            <TableContainer>
                <table>
                    <thead>
                    <tr>
                        <td>نام</td>
                        <td>دسترسی ها</td>
                        <td>ویرایش</td>
                        <td>حذف</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        roles.map(
                            role => (
                                <tr key={role.id}>
                                    <td>{role.name}</td>
                                    <td>{role.permissions.map(
                                        value => {
                                            if (value == 'ROLE_CREATE_USER')
                                                return 'ساخت کاربر';
                                            else if (value == 'ROLE_DELETE_USER')
                                                return 'حذف کاربر';
                                            else if (value == 'ROLE_UPDATE_USER')
                                                return 'بروزرسانی کاربر';
                                            else if (value == 'ROLE_CREATE_ROLE')
                                                return 'ساخت نقش';
                                        }
                                    ).join(",")}</td>
                                    <td>
                                        <FontAwesomeIcon
                                            cursor={"pointer"}
                                            icon={faPenToSquare}
                                            onClick={() => navigator("/roles/" + role.id)}
                                        />
                                    </td>
                                    <td>
                                        <FontAwesomeIcon
                                            cursor={"pointer"}
                                            icon={faTrash}
                                            onClick={() => removeRole(role)}
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