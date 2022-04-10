import { chakra, Button, ButtonGroup, ChakraProvider, FormControl, FormLabel, Input, InputGroup, InputLeftElement, TagLeftIcon, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import SFlex from "./views/SFlex";
import { FiUser } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiFaceit } from "react-icons/si";
import { AiOutlineMail } from "react-icons/ai";
import { BsKey } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Main from "./views/Main";
import { json } from "../services/response";
import { observer } from "mobx-react";
import UserRegisterStore from "../../store/user/register";

const Register = (): JSX.Element => {
    const { setData, registerUser, isRegisterUser } = useContext(UserRegisterStore)
    const locations = useNavigate();

    const onSubmit = async (event: any) => {
        event.preventDefault();
        const fullname = (event.target.name.value as string);
        const [name, surname] = fullname.split(' ');
        setData({
            name: name,
            surname: surname,
            fullname: fullname,
            password: event.target.password.value,
            email: event.target.email.value,
            phone: "",
            home: ""
        });
        registerUser();

        setTimeout(() => {
            locations("/Login");
        }, 2000)
    }

    return (
        <>
            <Main>
                <SFlex justify="center">
                    <>
                        <chakra.form method="POST" action="POST" onSubmit={onSubmit}>
                            <FormControl isRequired>
                                <FormLabel textAlign="center" htmlFor="name">Полное имя</FormLabel>
                                <InputGroup>
                                    <Input type="text" placeholder="Имя Фамилия" id="name" textAlign="center" />
                                    <InputLeftElement>
                                        <FiUser />
                                    </InputLeftElement>
                                </InputGroup>
                            </FormControl>
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

                            <ButtonGroup display="flex" justifyContent="center" mt={6} colorScheme="messenger">
                                <Button leftIcon={<SiFaceit />} colorScheme="teal" type="submit">
                                    Зарегистрироваться
                                </Button>
                                <Button leftIcon={<BsKey />} type="button">
                                    <Link to="/Login">
                                        Логин
                                    </Link>
                                </Button>
                            </ButtonGroup>


                            {
                                isRegisterUser ? <>
                                    <Text textAlign="end" color="green.300" textDecoration="underline">Вы зарегистрировались</Text>
                                </> : <></>
                            }
                        </chakra.form>
                    </>
                </SFlex>
            </Main>
        </>
    )
}


export default observer(Register);