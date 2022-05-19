import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Input from "../../components/Input";
import Select from "react-select";
import {Form, FormContainer, InputWrapper, UserPageWrapper} from "../Styled";
import {SubmitHandler, useForm} from "react-hook-form";
import {getRole, Options, Role, RoleRequest, updateRole} from "./RolesAPI";

const RolePage: React.FC = () => {
    let params = useParams();
    const navigator = useNavigate();
    const updateForm = useForm<RoleRequest>();
    const [role, setRole] = useState<Role>();
    const updateRoleAction: SubmitHandler<RoleRequest> = (request) => {
        updateRole(request).then(() => navigator("/roles"));
    };
    useEffect(() => {
        getRole(params.id ? parseInt(params.id) : 0).then((response) => {
            setRole(response);
            updateForm.setValue("name", response.name);
            updateForm.setValue("id", params.id ? parseInt(params.id) : 0);
            updateForm.setValue("permissions", response.permissions)
        })
    }, []);

    return (
        <>
            {role && <UserPageWrapper>
                <h1>
                    نقش : {role.name}
                </h1>
                <FormContainer>
                    <Form
                        onSubmit={updateForm.handleSubmit(updateRoleAction)}>
                        <InputWrapper>
                            <Input type="text" {...updateForm.register("name")} placeholder="نام"/>
                        </InputWrapper>
                        <br/>
                        <Select options={Options}
                                isMulti
                                isClearable={false}
                                placeholder={"دسترسی ها"}
                                onChange={options => {
                                    updateForm.setValue("permissions", options.map(o => o.value))
                                }}
                                defaultValue={
                                    role.permissions.map(value => {
                                        return {
                                            value: value,
                                            label: Options.filter(cell => cell.value == value)[0].label
                                        }
                                    })
                                }
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

export default RolePage