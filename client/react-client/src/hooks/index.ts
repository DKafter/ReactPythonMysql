import { useContext, useState } from "react";
import OrdersStore from "../store/orders";
import ProductsStore from "../store/products";

export const useFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => {
        htmlElRef.current && htmlElRef.current.focus
    };

    return [htmlElRef, setFocus]
}


export const usePersistenceValue = (initialValue: any) => {
    return useState({
        current: initialValue
    })[0];
}