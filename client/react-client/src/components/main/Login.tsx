import { chakra, Button, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import SFlex from "./views/SFlex";
import { FiUser } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../services/jwt.auth";
import Main from "./views/Main";
import { json } from "../services/response";
import { observer } from "mobx-react";
import UserLoginStore from "../../store/user/login"

const Login = (): JSX.Element => {
    const {setDataLogin, getIsLogin} = useContext(UserLoginStore);
    const location = useNavigate();
    const onSubmit = async (event: any) => {
        event.preventDefault();

        setDataLogin({
            password: event.target.password.value,
            email: event.target.email.value
        });

        location("/About");
    }

    return (
        <>
            <Main>
                <SFlex justify="center">
                    <>
                        <chakra.form method="POST" action="POST" onSubmit={onSubmit}>
                            <FormControl isRequired>
                                <FormLabel textAlign="center" htmlFor="email">Почта</FormLabel>
                                <InputGroup>
                                    <Input type="email" placeholder="Почта" id="email" textAlign="center" />
                                    <InputLeftElement>
                                        <AiOutlineMail />
                                    </InputLeftElement>
                                </InputGroup>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel textAlign="center" htmlFor="password">Пароль</FormLabel>
                                <InputGroup>
                                    <Input type="password" placeholder="Пароль" id="password" textAlign="center" />
                                    <InputLeftElement>
                                        <RiLockPasswordLine />
                                    </InputLeftElement>
                                </InputGroup>
                            </FormControl>

                            <Button mt={6} colorScheme="teal" type="submit">
                                Логин
                            </Button>


                            {
                                getIsLogin ? <>
                                    <Text textAlign="end" color="green.300" textDecoration="underline">Вы авторизовались</Text>
                                </> : <></>
                            }

                        </chakra.form>
                    </>
                </SFlex>
            </Main>
        </>
    )
}


export default observer(Login);