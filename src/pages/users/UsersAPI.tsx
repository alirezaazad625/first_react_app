import client from "../../instances/client";

export type User = {
    username: string
    firstName: string
    lastName: string
    roleName: string
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
        .get("/users", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token")
            }
        })
        .then(response => {
            data = response.data;
        });
    return data;
}

export async function getUser(username? : string): Promise<any> {
    let data = null;
    await client
        .get("/users/" + username, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token")
            }
        })
        .then(response => {
            data = response.data;
        });
    return data;
}


export async function deleteUser(username: string): Promise<any> {
    let data = null;
    await client
        .delete("/users/" + username, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token")
            }
        })
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
                username : user.username,
                password : user.password,
                roleId : user.roleId,
                firstName : user.firstName,
                lastName : user.lastName,
            },
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("access_token")
                }
            })
        .then(response => {
            data = response.data;
        });
    return data;
}

export async function updateUser(user: UserRequest): Promise<any> {
    let data = null;
    await client
        .put("/users/"+user.username,
            {
                password : user.password,
                roleId : user.roleId,
                firstName : user.firstName,
                lastName : user.lastName,
            },
            {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("access_token")
                }
            })
        .then(response => {
            data = response.data;
        });
    return data;
}
