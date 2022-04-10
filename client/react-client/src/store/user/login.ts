import { IUser } from '../type';
import { createContext, useContext } from 'react';
import { observable, makeAutoObservable, computed, action } from 'mobx';
import * as fetch from "../../components/services/http"
import JwtStore from '../jwt';


export class UserLoginStore {
    @observable dataLogin: IUser = this.getData || {};
    constructor() {
        makeAutoObservable(this);
    }

    @action setDataLogin = async (dataInput: IUser) => {
        if(dataInput) {
            const response = await fetch.post<IUser, IUser>("http://localhost:4000/user/login", 
                dataInput,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );

            this.dataLogin = response;
            this.dataLogin.prevEmail = response.email;
            localStorage.setItem("data", JSON.stringify(this.dataLogin));
            window.location.reload();
        }
    }

    @computed get getData(): IUser| null {
        const storage = localStorage.getItem("data") || null;
        if(!storage) return null;
        return JSON.parse(storage) as IUser;
    }

    @computed get getVerifyLogin() {
        const context = useContext(JwtStore);
        const { verifyToken, jwt_data } = context;
        verifyToken();
        if(!jwt_data || !jwt_data.isLogin) return false;

        this.dataLogin.isLogin = jwt_data.isLogin;
        return this.dataLogin.isLogin;
    }

    @computed get getIsLogin(): boolean {
        return Boolean(this.dataLogin.isLogin);
    }
}


export default createContext(new UserLoginStore());