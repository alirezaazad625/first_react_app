import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {createUser, deleteUser, getUsers, User, UserRequest} from "./UsersAPI";
import {useNavigate} from "react-router-dom";
import {getRoles, Role} from "../roles/RolesAPI";
import Crud from "../../components/Crud";
import {hasRole} from "../../storage/AccessToken";


export default () => {
    const navigator = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    useEffect(() => {
        updateUsers().then()
        getRoles().then(content => setRoles(content))
    }, []);
    const updateUsers = () => getUsers().then(content => {
        setUsers(content);
    });
    const form = useForm<UserRequest>();

    let requestTextFields = [
        {register: form.register("username"), placeHolder: "نام کاربری"},
        {register: form.register("firstName"), placeHolder: "نام"},
        {register: form.register("lastName"), placeHolder: "نام خانوادگی"}
    ];
    let requestPasswordField = {register: form.register("password"), placeHolder: "رمز عبور"};
    let requestSelectField = {
        options: roles.map(role => {
            return {
                value: role.id,
                label: role.name,
            }
        }),
        placeHolder: "نقش",
        onChange: (option: any) => {
            form.setValue("roleId", option != null ? option.value : 0)
        },
        isMulti: false
    };
    let onDelete = hasRole('ROLE_DELETE_USER') ? (user: User) => {
        if (window.confirm(`are you sure about removing user ${user.username} ?`)) {
            deleteUser(user.username).then(() => {
                    updateUsers().then()
                }
            )
        }
    } : undefined;
    let onUpdate = hasRole('ROLE_UPDATE_USER') ? (user: User) => navigator("/users/" + user.username) : undefined;
    let onCreate = hasRole('ROLE_CREATE_USER') ? (formData: UserRequest) => {
        createUser(formData).then(() => {
            updateUsers().then()
        });
    } : undefined;
    let headers = [
        {name: "username", title: "نام کاربری"},
        {name: "firstName", title: "نام"},
        {name: "lastName", title: "نام خانوادگی"},
        {name: "roleName", title: "نقش"},
        {name: "birthDay", title: "تاریخ تولد"}
    ];
    return (
        <Crud
            form={form}
            onCreate={onCreate}
            onDelete={onDelete}
            onUpdate={onUpdate}
            data={users}
            headers={headers}
            requestTextFields={requestTextFields}
            requestPasswordField={requestPasswordField}
            requestSelectField={requestSelectField}
            onDatePicking={(value: string) => {
                console.log(value)
                form.setValue("birthDay", value)
            }}
        />
    )
}
