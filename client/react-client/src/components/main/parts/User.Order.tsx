import { chakra, FormControl, Text, InputGroup, FormLabel, Divider, Button, Input, InputLeftElement, Menu, MenuButton, MenuOptionGroup, MenuItemOption, MenuList, Flex, Center, RadioGroup, Stack, Checkbox } from "@chakra-ui/react";
import { observer } from "mobx-react";
import React, { EffectCallback, FormEvent, useContext, useEffect, useMemo, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ProductsStore, { INameProducts } from "../../../store/products";
import OrdersStore from "../../../store/orders";
import { getJsonData } from "../../services/jwt.auth";

import Main from "../views/Main";
import SFlex from "../views/SFlex";
const UserOrder = (): JSX.Element => {
    const products = useContext(ProductsStore)
    const orders = useContext(OrdersStore);
    const { getProducts } = products;
    const { addOrders } = orders;

    const [copyProducts, setCopyProducts] = useState<INameProducts[]>(JSON.parse(JSON.stringify(getProducts)));
    const [isOwnOrder, setIsOwnOrder] = useState<boolean>(false);
    const [uuid, setId] = useState('');

    const data = useRef(getJsonData()).current || { id: "" };
    const navigate = useNavigate();

    const _onSubmit = (event: FormEvent) => {
        event.preventDefault();
        const orderNumber = (event.target.numberOrder as any).value;
        const clientNumber = (event.target.numberClient as any).value;
        const nameOfProcess = (event.target.nameOfProcess as any).value;

        addOrders({
            id_order: orderNumber,
            id_client: clientNumber,
            name_of_process: nameOfProcess,
            list: !isOwnOrder ? copyProducts : [],
            isExecuted: false
        });

        navigate("/OrderProducts");
        setCopyProducts(Object.assign([], getProducts));
    }


    const onActive = (event: any, n: number) => {
        event.preventDefault();
        let updatedCop: INameProducts[] = copyProducts.map((t, i) => {
            if (i == n) t.isActive = !t.isActive;
            return t;
        });

        setCopyProducts(updatedCop);
    }


    useEffect(() => {
        setId(uuidv4().replaceAll("-", ""));
        return () => {
            setCopyProducts(Object.assign([], getProducts))
        }
    }, [])

    return (
        <Main>
            <SFlex justify="center">
                <>
                    {
                        copyProducts && copyProducts.length > 0 ?
                            <chakra.form w="50%" name="form" mt={6} p="2.5" onSubmit={_onSubmit}>
                                {
                                    !isOwnOrder ?
                                        <React.Fragment>
                                            <FormControl>
                                                <Flex w="100%" align="center" justify="center" p="4" wrap="wrap" direction="column">
                                                    <FormLabel textAlign="center" htmlFor="numberOrder">?????????? ????????????</FormLabel>
                                                    <Input marginBottom="5" w="50%" readOnly id="numberOrder" value={uuid} />
                                                    <FormLabel textAlign="center" htmlFor="numberClient">?????????? ??????????????</FormLabel>
                                                    <Input marginBottom="5" w="50%" readOnly id="numberClient" value={data["id"]} />
                                                    <FormLabel textAlign="center" htmlFor="nameOfProcess">?????? ??????????????????</FormLabel>
                                                    <Input isRequired marginBottom="5" w="50%" id="nameOfProcess" />
                                                </Flex>
                                            </FormControl>

                                            <Flex mt="5">
                                                {
                                                    copyProducts.map((t, i) => {
                                                        return (
                                                            <FormControl p="5" key={t.name_product}>
                                                                <Flex basis="50%" align="center" justify="center" direction="column" wrap="wrap">
                                                                    <FormLabel textAlign="center" htmlFor={t.name_product}>
                                                                        <Text color="green">{t.name_product}</Text>
                                                                        <Text>???????? ???????????????? {t.price}</Text>
                                                                        <Text>{t.isStored ? "???? ????????????" : "?????? ???? ????????????"}</Text>
                                                                    </FormLabel>
                                                                    <Button colorScheme={t.isActive ? "green" : "facebook"} onClick={(e) => onActive(e, i)} type="button" id={t.name_product} value={data["id"]}>
                                                                        ???????????????? ?? ????????????
                                                                    </Button>
                                                                </Flex>
                                                            </FormControl>
                                                        )
                                                    })
                                                }
                                            </Flex>
                                        </React.Fragment> : <React.Fragment>
                                            <FormControl>
                                                <Flex w="100%" align="center" justify="center" p="4" wrap="wrap" direction="column">
                                                    <FormLabel textAlign="center" htmlFor="numberOrder">?????????? ????????????</FormLabel>
                                                    <Input marginBottom="5" w="50%" readOnly id="numberOrder" value={uuid} />
                                                    <FormLabel textAlign="center" htmlFor="numberClient">?????????? ??????????????</FormLabel>
                                                    <Input marginBottom="5" w="50%" readOnly id="numberClient" value={data["id"]} />
                                                    <FormLabel textAlign="center" htmlFor="nameOfProcess">?????? ???????????????????</FormLabel>
                                                    <Input isRequired marginBottom="5" w="50%" id="nameOfProcess" />
                                                </Flex>
                                            </FormControl>
                                        </React.Fragment>
                                }
                                <Flex align="center" justify="center" w="100%">
                                    <Button m="2" as="button" type="submit" colorScheme="facebook">
                                        ???????????????? ?? ??????????
                                    </Button>
                                    <Button m="2" onClick={() => setIsOwnOrder(!isOwnOrder)} as="button" type="button" colorScheme="cyan">
                                        {!isOwnOrder ? "???????? ??????????" : "??????????????????"}
                                    </Button>
                                </Flex>
                            </chakra.form>
                            : <>
                                <Text>?????????????????? ??????</Text>
                            </>
                    }
                </>
            </SFlex>
        </Main>
    )
}


export default observer(UserOrder);