import { chakra, Box, Heading, Stack, Text, Divider, Flex, Button } from "@chakra-ui/react"
import { observer } from "mobx-react";
import React, { useContext, useMemo, useRef, useState } from "react"
import { IOrderProduct } from "../../../store/orders";
import OrdersStore from "../../../store/orders";

const UserProducts = (): JSX.Element => {
    const _orders = useContext(OrdersStore);
    const { getOrders, removeOrder, getOrdersById, requestOrders } = _orders;
    const orders = getOrders;

    const [isReloaded, setIsReloaded] = useState<boolean>(false);

    function deleteOrder(id: string) {
        removeOrder(id);
        setIsReloaded(!isReloaded);
    }

    function registerOrder(id: string) {
        requestOrders(...getOrdersById(id) as IOrderProduct);
    }

    return (
        <chakra.div display="inline-block">
            <Stack spacing={6}>
                <Flex wrap="wrap" direction="row">
                    {
                        orders.map(o =>
                            <Box p={5} shadow="md" borderWidth='1px'>
                                <Heading fontSize="xl">
                                    <Text>Ваш заказ</Text>
                                </Heading>
                                <React.Fragment key={o.id_order}>
                                    <Text>Ваш личный ключ {o.id_client}</Text>
                                    <Text>Ваш ключ заказа {o.id_order}</Text>
                                    <Text>Название очистки {o.name_of_process}</Text>
                                    <Divider />
                                    {
                                        o.list && o.list.map(l => {
                                            return l.isActive &&
                                                <React.Fragment key={l.name_product}>
                                                    <Text>{l.name_product}</Text>
                                                    <Text>Цена {l.price}</Text>
                                                    <Text>{l.isStored == true ? "Да, есть в хранилище" : "Нет в хранилище"}</Text>
                                                </React.Fragment>
                                        })
                                        
                                    }

                                    <chakra.div>
                                        {
                                            o.isExecuted ? <>
                                                <Text colorScheme="green">
                                                    Ваш заказ отправлен
                                                </Text>
                                            </> : <>
                                                <Button onClick={() => registerOrder(o.id_order as string)} m="2" as="button" type="button" colorScheme="green">Заказать</Button>
                                                <Button onClick={() => deleteOrder(o.id_order as string)} m="2" as="button" type="button" colorScheme="red">Удалить заказ</Button>
                                            </>
                                        }
                                    </chakra.div>
                                </React.Fragment>
                            </Box>
                        )
                    }
                </Flex>
            </Stack>



        </chakra.div>
    )
}

export default observer(UserProducts);