import { action, computed, makeAutoObservable, observable } from "mobx"
import { createContext } from "react";
import { json } from "../../components/services/response";
import { IOrderProduct } from './../type';


export class OrdersStore {
    @observable orders: IOrderProduct[] = [];
    constructor() { 
        makeAutoObservable(this);
    }

    @action addOrders = (list: IOrderProduct) => {
        this.orders.push(list);
        localStorage.setItem("orders", JSON.stringify(this.orders));
    }

    @action removeOrder = (id_order: String) => {
        this.orders = this.getOrders.filter(o => o.id_order !== id_order);
        localStorage.setItem("orders", JSON.stringify(this.orders));
    }

    @action setExecutedOrder = ({id_order}: IOrderProduct, isExecuted: boolean) => {
        const orders = this.getOrders.map(o => {
            if(o.id_order == id_order) {
                o.isExecuted = isExecuted;
            }

            return o;
        })

        localStorage.setItem("orders", JSON.stringify(orders));
        location.reload();
    }

    @action requestOrders = async (data: IOrderProduct) => {
        console.log(data);
        await fetch(`http://localhost:4000/user/products/register`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(json)
            .then((_data: {executed: boolean}) => {
                this.setExecutedOrder(data, _data["executed"]);
            })
    }

    @computed get getOrders(): IOrderProduct[] {
        const ordersJson = localStorage.getItem("orders") as string;
        return JSON.parse(ordersJson) as IOrderProduct[];
    }

    @computed getOrdersById(id: string): IOrderProduct[] {
        const ordersJson = localStorage.getItem("orders") as string;
        return (JSON.parse(ordersJson) as IOrderProduct[])
        .filter(f => f.id_order == id);
    }
}

export default createContext(new OrdersStore());