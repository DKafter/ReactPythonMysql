import { Flex } from "@chakra-ui/react";
import React from "react"
const SFlex = ({ children, justify = "space-between" }: { children: React.ReactChild, justify: string }): JSX.Element => {
    return (
        <>
            <Flex
                w="100%"
                px="20"
                py="10"
                align="center"
                alignContent="center"
                justify={justify}
                backgroundColor="#002a38"
                color="#fff"
            >
                {children}
            </Flex>
        </>
    )
}

export default SFlex;