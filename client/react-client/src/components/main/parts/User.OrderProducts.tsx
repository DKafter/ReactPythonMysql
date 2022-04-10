import { Button, Divider, Link } from "@chakra-ui/react";
import { observer } from "mobx-react"
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import OrdersStore from "../../../store/orders";
import SFlex from "../views/SFlex";
import UserProducts from "./User.Products";

const OrderProducts = (): JSX.Element => {
    const orders = useContext(OrdersStore);
    const { getOrders } = orders;
    return (
        <>
            <SFlex justify="center">
                {
                    getOrders ? <>
                        <UserProducts />
                    </> : <>
                        <NavLink to="/OrderList">
                            <Button mt={6} colorScheme="facebook">
                                <Link as="a" textDecor="none">У вас нет заказов, создать?</Link>
                            </Button>
                        </NavLink>
                    </>
                }
            </SFlex>

        </>
    )
}


export default observer(OrderProducts);