import client from "../../instances/client";
import {getAccessToken} from "../../storage/AccessToken";


const Options = [
    {
        label: 'ساخت کاربر',
        value: 'ROLE_CREATE_USER'
    },
    {
        label: 'بروزرسانی کاربر',
        value: 'ROLE_UPDATE_USER'
    },
    {
        label: 'حذف کاربر',
        value: 'ROLE_DELETE_USER'
    },
    {
        label: 'تغییرات نقش ها',
        value: 'ROLE_CREATE_ROLE'
    }
];


export type Role = {
    id: number,
    name: string
    permissions: string[]
}

export type RoleRequest = {
    id?: number,
    name: string
    permissions: string[]
}

export async function getRoles(): Promise<any> {
    let data = null;
    await client
        .get("/roles", {
            headers: {
                "Authorization": "Bearer " + getAccessToken()
            }
        })
        .then(response => {
            data = response.data;
        });
    return data;
}

export async function getRole(id?: number): Promise<any> {
    let data = null;
    await client
        .get("/roles/" + id, {
            headers: {
                "Authorization": "Bearer " + getAccessToken()
            }
        })
        .then(response => {
            data = response.data;
        });
    return data;
}


export async function deleteRole(id?: number): Promise<any> {
    let data = null;
    await client
        .delete("/roles/" + id, {
            headers: {
                "Authorization": "Bearer " + getAccessToken()
            }
        })
        .then(response => {
            data = response.data;
        });
    return data;
}

export async function createRole(request: RoleRequest): Promise<any> {
    let data = null;
    await client
        .post("/roles",
            {
                name: request.name,
                permissions: request.permissions
            },
            {
                headers: {
                    "Authorization": "Bearer " + getAccessToken()
                }
            })
        .then(response => {
            data = response.data;
        });
    return data;
}

export async function updateRole(request: RoleRequest): Promise<any> {
    let data = null;
    await client
        .put("/roles/" + request.id,
            {
                name : request.name,
                permissions : request.permissions
            },
            {
                headers: {
                    "Authorization": "Bearer " + getAccessToken()
                }
            })
        .then(response => {
            data = response.data;
        });
    return data;
}

export {Options}