import { Button, chakra, Flex, HStack, Image, Link, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SFlex from "../main/views/SFlex";
import UserLoginStore from "../../store/user/login"
import { observer } from "mobx-react";
import HeaderData from "./Header.Data";

const Header = () => {
    return (
        <>
            <chakra.header id="header">
                <SFlex justify="space-between">
                    <>
                        <HeaderData />
                    </>
                </SFlex>
            </chakra.header>
        </>
    )
}

export default observer(Header);