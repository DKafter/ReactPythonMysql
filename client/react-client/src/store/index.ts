import { Provider } from 'react-redux';
import React from 'react';
import { JwtStore } from './jwt';
import { OrdersStore } from './orders';
import { UserLoginStore } from './user/login';
import { UserRegisterStore } from './user/register';
import { ChangeUserAboutStore } from './user/changeAbout';

class RootStore {
    public jwt_store: JwtStore;
    public order_store: OrdersStore;
    public login_store: UserLoginStore;
    public register_store: UserRegisterStore;
    public changeAbout_store: ChangeUserAboutStore;
    
    constructor(){
        this.jwt_store = new JwtStore();
        this.order_store = new OrdersStore();
        this.login_store = new UserLoginStore();
        this.register_store = new UserRegisterStore();
        this.changeAbout_store = new ChangeUserAboutStore();
    }
}

export default RootStore;