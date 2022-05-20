import client from "../../instances/client";
import {getAccessToken} from "../../storage/AccessToken";

const headers = {
    headers: {
        "Authorization": "Bearer " + getAccessToken()
    }
}
export type User = {
    username: string
    firstName: string
    lastName: string
    roleName: string
    roleId: number
}

export type UserRequest = {
    password: string
    username: string
    firstName: string
    lastName: string
    roleId: number
}

export async function getUsers(): Promise<any> {
    let data = null;
    await client
        .get("/users", headers)
        .then(response => {
            data = response.data;
        });
    return data;
}

export async function getUser(username?: string): Promise<any> {
    let data = null;
    await client
        .get("/users/" + username, headers)
        .then(response => {
            data = response.data;
        });
    return data;
}


export async function deleteUser(username: string): Promise<any> {
    let data = null;
    await client
        .delete("/users/" + username, headers)
        .then(response => {
            data = response.data;
        });
    return data;
}

export async function createUser(user: UserRequest): Promise<any> {
    let data = null;
    await client
        .post("/users",
            {
                username: user.username,
                password: user.password,
                roleId: user.roleId,
                firstName: user.firstName,
                lastName: user.lastName,
            }, headers)
        .then(response => {
            data = response.data;
        });
    return data;
}

export async function updateUser(user: UserRequest): Promise<any> {
    let data = null;
    await client
        .put("/users/" + user.username,
            {
                password: user.password,
                roleId: user.roleId,
                firstName: user.firstName,
                lastName: user.lastName,
            }, headers)
        .then(response => {
            data = response.data;
        });
    return data;
}
