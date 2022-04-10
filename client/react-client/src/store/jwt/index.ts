import { action, computed, observable, makeAutoObservable } from 'mobx';
import { createContext } from 'react';
import { Buffer } from 'buffer';
import * as fetch from "../../components/services/http"
import { IResponseData } from '../type';

export class JwtStore {
    constructor(){
        makeAutoObservable(this);
    }

    @observable jwt_data: IResponseData = this.getFromJsonData || {};

    @action verifyToken = async () => {
        const dataJwt = this.getJwt;
        const data = this.getData;
        const dataJsonJwt = this.getFromJsonData;
        const dateTime = Date.now();

        if(!dataJwt || !data || !dataJsonJwt) return false;

        const jwt: any = Buffer.from(dataJwt.split(".")[1], "base64").toString("binary")
        const { iat } = jwt;

        if(dateTime >= iat) {
            localStorage.removeItem("data");
            const response = await fetch.put<IResponseData, IResponseData>(
                "http://localhost:4000/user/login", 
                dataJsonJwt,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });

            this.jwt_data = response;
            localStorage.setItem("data", JSON.stringify(this.jwt_data));
            this.verifyToken();
        }

        if(dateTime < iat) {
            return true;
        }
    }

    @action clearData = () => {
        this.jwt_data = {};
        window.localStorage.clear();
        window.location.reload();
    }

    @computed get getData(): string | null {
        return localStorage.getItem("data") as string || null;
    }

    @computed get getJwt(): string | null {
        const json_parse: IResponseData | null = this.getFromJsonData || null;
        if(!json_parse || !json_parse.jwt_token) return null;
        return json_parse.jwt_token;
    }

    @computed get getFromJsonData(): IResponseData | null {
        if(!this.getData) return null;
        return JSON.parse(this.getData) as IResponseData;
    }
}


export default createContext(new JwtStore());