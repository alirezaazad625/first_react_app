import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {createRole, deleteRole, getRoles, Options, Role, RoleRequest} from "./RolesAPI";
import Crud from "../../components/Crud";
import {hasRole} from "../../storage/AccessToken";


export default () => {

    const navigator = useNavigate();
    const [roles, setRoles] = useState<Role[]>([]);
    useEffect(
        () => {
            updateRoles()
        }
        , []
    );

    const onDelete = hasRole('ROLE_CREATE_ROLE') ? (role: Role) => {
        if (window.confirm(`are you sure about removing role : ${role.name} ?`)) {
            deleteRole(role.id).then(() => {
                    let newRoles = roles.filter(function (u) {
                        return u !== role
                    })
                    setRoles(newRoles)
                }
            )
        }
    } : undefined;

    const onUpdate = hasRole('ROLE_CREATE_ROLE') ? (role: Role) => navigator("/roles/" + role.id) : undefined;
    const updateRoles = () => getRoles().then(content => {
        setRoles(content);
    });

    const form = useForm<RoleRequest>();
    const onCreate = hasRole('ROLE_CREATE_ROLE') ? (role: RoleRequest) => {
        createRole(role).then(() => getRoles().then(() => updateRoles()));
    } : undefined;


    let requestTextFields = [{register: form.register("name"), placeHolder: "نام"}];

    let headers = [
        {name: "name", title: "نام"},
        {name: "permissions", title: "دسترسی ها"},
    ];

    let requestSelectField = {
        options: Options,
        placeHolder: "دسترسی",
        onChange: (options: any) => {
            form.setValue("permissions", options.map((o: any) => o.value))
        },
        isMulti: true
    };
    return (
        <Crud
            form={form}
            onCreate={onCreate}
            onDelete={onDelete}
            onUpdate={onUpdate}
            data={roles.map(role => {
                return {
                    name: role.name,
                    id: role.id,
                    permissions: [role.permissions.map(
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
                    ).join(",")]
                }
            })}
            headers={headers}
            requestTextFields={requestTextFields}
            requestSelectField={requestSelectField}
        />
    );
}