import { INameProducts, IOrderProduct } from './../type';
import { action, computed, makeAutoObservable, observable, reaction } from "mobx";
import { createContext, useState } from "react";
import { json } from '../../components/services/response';



export class ProductStore {
    constructor() {
        makeAutoObservable(this);
        this.setFetchProducts();
    }

    @action getProductsByIsActive = (list: IOrderProduct[]) => {
        return list.map(t => {
            return t.list?.filter(f => f.isActive == true)
        })
    }


    @computed get getProducts() {
        const productsJson = localStorage.getItem("products") as string;
        return JSON.parse(productsJson) as INameProducts[];
    }

    @action setFetchProducts = () => {
        fetch(`http://localhost:4000/user/products`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(json).then(value => {
            localStorage.setItem("products", JSON.stringify(value));
        });
    }
}

// [{"id_product":"1","isStored":1,
// "name_product":"Ожерелье","price":3000},{"id_product":"2","isStored":0,"name_product":"Кольцо","price":1500},{"id_product":"3","isStored":1,"name_product":"Подвеска","price":600}]

export default createContext(new ProductStore());