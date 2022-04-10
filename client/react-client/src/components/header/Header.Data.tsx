import { useEffect, useState } from "react"
import { getData, getVerifyWithData, responseData } from "../services/jwt.auth";
import { Circle, HStack, IconButton, Text, Image, Link, Button } from "@chakra-ui/react";
import logo from "../../assets/imgs/Logo.png";
import { SiTruenas, SiTurbosquid } from "react-icons/si";
import { BiUserCircle, BiLogOut } from "react-icons/bi";
import Logout from "./Logout";
import UserLoginStore from "../../store/user/login"
import { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { usePersistenceValue } from "../../hooks";
import React from "react";
import { observer } from "mobx-react";

const _logo = logo;

const HeaderData = (): JSX.Element => {
    const locations = useLocation();
    const data = useContext(UserLoginStore);
    const [verify, setVerify] = useState(data.getVerifyLogin);

    const [headerData, setHeaderData] = useState({
        imgs: {
            link: [_logo],
            name: [],
            alt: ["Logo"],
            title: ["It's logo title"],
            to: ["/"]
        },

        links: verify ? [
            {
                name: "Заказать",
                to: "/OrderList",
                isLocate: true,
            },
            {
                name: "Ваши заказы",
                to: "/OrderProducts",
                isLocate: true,
            },
            {
                name: <>
                    <IconButton variant='outline'
                        colorScheme='teal'
                        aria-label='Call Sage'
                        fontSize='20px'
                        icon={<BiUserCircle />} />
                </>,
                to: "/About",
                isLocate: false,
            },
            {
                name: <>
                    <Logout />
                </>,
                to: "/",
                isLocate: false,
            }
        ] : [
            {
                name: "Зарегистрироваться",
                to: "/Register",
                isLocate: true,
            },
            {
                name: "Логин",
                to: "/Login",
                isLocate: true,
            },
        ]
    });
    useEffect(() => {
        setVerify(data.getIsLogin)
        setHeaderData(headerData);
        console.table(headerData);
    }, [])

    const logo = usePersistenceValue(headerData.imgs).current;

    return (
        <>
            <NavLink style={{display: "contents"}} to={logo.to[0]}>
                <Image w="15%" h="15%" src={logo.link[0]} alt={logo.alt[0]} title={logo.title[0]} />
            </NavLink>
            <HStack as="nav" spacing="5">
                {
                    headerData.links.map((item: any, i: number) => {
                        return (
                            <React.Fragment key={i}>
                                {data.getIsLogin ?
                                    item.isLocate ?
                                        <NavLink to={item.to} style={{ display: item.to == locations.pathname ? "none" : "block" }}>
                                            <Link display="block">
                                                <Button
                                                    variant="nav"
                                                    letterSpacing="2px"
                                                    p="0"
                                                    fontWeight="900"
                                                >
                                                    <Text fontSize="0.9xl">
                                                        {item.name}
                                                    </Text>
                                                </Button>
                                            </Link>
                                        </NavLink>
                                        : <NavLink to={item.to}>
                                            <Link display="block">
                                                <Button
                                                    variant="nav"
                                                    letterSpacing="2px"
                                                    p="0"
                                                    fontWeight="900"
                                                >
                                                    <Text fontSize="0.9xl">
                                                        {item.name}
                                                    </Text>
                                                </Button>
                                            </Link>
                                        </NavLink>
                                    : <NavLink to={item.to}>
                                        <Link display="block">
                                            <Button
                                                variant="nav"
                                                letterSpacing="2px"
                                                p="0"
                                                fontWeight="900"
                                            >
                                                <Text fontSize="0.9xl">
                                                    {item.name}
                                                </Text>
                                            </Button>
                                        </Link>
                                    </NavLink>
                                }

                            </React.Fragment>
                        )
                    })
                }
            </HStack>
        </>
    )
}

export default observer(HeaderData);