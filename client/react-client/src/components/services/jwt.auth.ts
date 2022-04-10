import React from "react";
import { useCookies } from "react-cookie";
import { Buffer } from 'buffer';

export interface responseData {
    email?: string,
    id?: string,
    isLogin?: string,
    jwt_token: string
}

function getExpirationDate(data?: responseData): number | null {
    if(!data) return null;
    const string_jwt = getToken();
    if(!string_jwt) return null;
    const jwt: any = Buffer.from(string_jwt.split(".")[1], "base64").toString("binary")
    
    return jwt.iat;
}

function json(response: Response) {
    return response.json()
}

const isExpired = (exp?: number | null) => {
    if (!exp) {
        return false;
    }

    return Date.now() > exp;
};

export const getData = (): string | null => {
    const data: string | null = localStorage.getItem("data");

    if (!data) {
        return null;
    }

    return data;
};

export const getVerifyWithData = (): any => {
    const json_data = getJsonData();
    console.log(json_data);
    if(json_data)
        return isExpired(getExpirationDate(json_data)) ? {} : getJsonData();
}

export const getJsonData = (): responseData | null => {
    const data = getData();
    if(!data) return null;
    return JSON.parse(data);
}

const getToken = (): string | null => {
    const data: string | null = localStorage.getItem("data");
    if(!data) return null;
    const json_parse: responseData = JSON.parse(data);
    return json_parse.jwt_token;
}


export const setToken = async (data: responseData) => {
    const _isExpired = isExpired(getExpirationDate(data));

    isNotVerifyToken(data, _isExpired);
    verifyToken(_isExpired);
}

export const verifyToken = async (isExpired: boolean) => {
    if(isExpired) {
        const data = getData();
        localStorage.removeItem("data");
        await fetch("http://localhost:4000/user/login", {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(json)
        .then(data => {
            localStorage.setItem("data", JSON.stringify(data));
        })
    }
}

const isNotVerifyToken = async(data: responseData, isExpired: boolean) => {
    if(!isExpired) {
        localStorage.setItem("data", JSON.stringify(data));
    }
}