import { action, computed, makeAutoObservable, observable, observe } from 'mobx';
import { IUser } from '../type';
import * as fetch from "../../components/services/http"
import { createContext } from 'react';
import { observer } from 'mobx-react';


export class UserRegisterStore {
    @observable dataRegister: IUser = {};
    constructor() {
        makeAutoObservable(this);
    }

    @action setData = ({
        name = "",
        surname = "",
        fullname,
        password = "",
        email = "",
        phone = "",
        home = "",
        isRegisterUser = false
    }: IUser) => {
        this.dataRegister = {
            name,
            surname,
            fullname,
            password,
            email,
            phone,
            home,
            isRegisterUser
        }
    }

    @action registerUser = async () => {
        const response = await fetch.post<IUser, IUser>(
            "http://localhost:4000/user/register",
            this.dataRegister,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )

        this.dataRegister.isRegisterUser = Boolean(response.isRegisterUser);
        localStorage.setItem("data", JSON.stringify(this.dataRegister));
    }

    @computed get isRegisterUser(): boolean {
        return Boolean(this.dataRegister.isRegisterUser);
    }
}

export default createContext(new UserRegisterStore());


// "name: name,
// surname: surname,
// password: event.target.password.value,
// email: event.target.email.value,
// phone: "",
// home: """