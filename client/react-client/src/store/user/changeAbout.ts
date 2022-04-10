import { IUser } from './../type';
import { useContext, createContext } from 'react';
import UserLoginStore from './login';
import { computed, makeAutoObservable, observable, action } from 'mobx';
import * as fetch from "../../components/services/http"

export class ChangeUserAboutStore {
    @observable user: IUser = {};
    constructor() {
        makeAutoObservable(this);
    }

    @action setInformation = async (new_user: IUser) => {
        const prevEmail = this.getData.prevEmail;
        this.setDataUser(new_user);
        const response = await fetch.put<IUser, ({
            executed: boolean
        })>("http://localhost:4000/user/change", {
            ...this.user,
            prevEmail: prevEmail
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );

        if(response.executed)
            localStorage.setItem("data", JSON.stringify(this.user));

        return Promise.resolve(Boolean(response.executed));
    }

    @action setDataUser = (new_user: IUser) => {
        this.user = {
            ...this.getData,
            home: new_user.home,
            phone: new_user.phone,
            name: new_user.name,
            surname: new_user.surname,
            email: new_user.email
        }

        // localStorage.setItem("data", JSON.stringify(this.user));
    }

    @computed get getData() {
        const storage = localStorage.getItem("data") || null;
        if(!storage) return {};
        return JSON.parse(storage) as IUser;
    }

    @computed get getDate() {
        return new Date(this.getData["current_day"] as string).toLocaleDateString()
    }
}

export default createContext(new ChangeUserAboutStore());