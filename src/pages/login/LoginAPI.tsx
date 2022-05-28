import client from "../../instances/client";
import {setAccessToken} from "../../storage/AccessToken";


export interface LoginFormData {
    username: string,
    password: string,
}

export async function login(form: LoginFormData): Promise<number> {
    let status = 101;
    await client
        .post("/login", {
            "username": form.username,
            "password": form.password
        })
        .then(response => {
            setAccessToken(response.data.access_token);
            status = response.status;
        })
        .catch(error => {
            status = error.response.status;
        });
    return status;
}