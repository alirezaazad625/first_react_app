import {resolveSrv} from "dns";

const ACCESS_TOKEN_KEY = "access_token";

function getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
}

function setAccessToken(accessToken: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
}

function removeAccessToken(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
}

function getUserRoles(): string[] {
    let accessToken = getAccessToken();
    let roles = [];
    if (accessToken) {
        roles.push(...JSON.parse(atob(accessToken?.split(".")[1])).roles)
    }
    return roles;
}

function hasRole(role: string): boolean {
    return getUserRoles().includes(role);
}

export {getAccessToken, setAccessToken, hasRole, removeAccessToken}