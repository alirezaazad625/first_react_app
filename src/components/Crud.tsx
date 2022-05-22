import React from "react";
import {UnpackNestedValue, UseFormReturn} from "react-hook-form";
import Popup from 'reactjs-popup';
import Input from "./Input";
import Select from "react-select";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose, faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {CloseButton, Form, FormContainer, InputWrapper, MainContainer, TableContainer} from "../pages/Styled";
import {UseFormRegisterReturn} from "react-hook-form/dist/types/form";

interface IHeader {
    name: string
    title: string
}

interface IOption {
    value: number|string
    label: string
}

interface ISelect {
    options: IOption[]
    placeHolder: string
    onChange: (option: any) => void
    isMulti: boolean
}

interface IInput {
    register: UseFormRegisterReturn
    placeHolder: string
}

interface CrudInterface<Model extends object, RequestModel extends object> {
    form: UseFormReturn<RequestModel>
    onCreate?: (x: UnpackNestedValue<RequestModel>) => void
    onDelete?: (x: Model) => void
    onUpdate?: (x: Model) => void
    data: Model[]
    headers: IHeader[]
    requestTextFields: IInput[]
    requestPasswordField?: IInput
    requestSelectField: ISelect
}

export default <Model extends object, RequestModel extends object>(props: CrudInterface<Model, RequestModel>) => {
    return (
        <MainContainer>
            {props.onCreate != null &&
            <Popup key={"create"}
                   trigger={<button className={"create-button"}>ساخت</button>}
                   position="center center"
                   modal nested closeOnEscape>
                {(close: () => any) => (
                    <FormContainer>
                        <CloseButton>
                            <FontAwesomeIcon cursor={"pointer"} icon={faClose} height="100%" width="100%"
                                             onClick={() => close()}/>
                        </CloseButton>

                        <Form onSubmit={props.form.handleSubmit((formData) => {
                                props.onCreate != null ? props.onCreate(formData) : close()
                                close()
                            }
                        )}>
                            {props.requestTextFields.map(input =>
                                <InputWrapper>
                                    <Input type="text" {...input.register} placeholder={input.placeHolder}/>
                                </InputWrapper>
                            )}
                            {
                                props.requestPasswordField &&
                                <InputWrapper>
                                    <Input type="password"
                                           {...props.requestPasswordField.register}
                                           placeholder={props.requestPasswordField.placeHolder}/>
                                </InputWrapper>
                            }
                            <br/>
                            <Select options={props.requestSelectField.options}
                                    isMulti={props.requestSelectField.isMulti}
                                    isClearable={false}
                                    placeholder={props.requestSelectField.placeHolder}
                                    onChange={option => props.requestSelectField?.onChange(option)}
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
                        {props.headers.map(header => <td>{header.title}</td>)}
                        {props.onUpdate != null && <td>ویرایش</td>}
                        {props.onDelete != null && <td>حذف</td>}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        props.data.map(
                            model => (
                                <tr>
                                    {props.headers.map(header =>
                                        <td>
                                            {JSON.parse(JSON.stringify(model))[header.name]}
                                        </td>
                                    )}
                                    {props.onUpdate != null &&
                                    <td>
                                        <FontAwesomeIcon
                                            cursor={"pointer"}
                                            icon={faPenToSquare}
                                            onClick={() => {
                                                if (props.onUpdate != null) props.onUpdate(model);
                                            }}
                                        />
                                    </td>
                                    }
                                    {props.onDelete != null &&
                                    <td>
                                        <FontAwesomeIcon
                                            cursor={"pointer"}
                                            icon={faTrash}
                                            onClick={() => {
                                                if (props.onDelete != null) props.onDelete(model);
                                            }}
                                        />
                                    </td>
                                    }
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </TableContainer>
        </MainContainer>
    );
}
