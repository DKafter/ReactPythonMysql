import React from 'react'
import { chakra } from "@chakra-ui/react";
const Main = ({ children }: { children: React.ReactChild }): JSX.Element => {
    return (
        <>
            <chakra.main
                display="flex"
                alignContent="center"
                justifyContent="space-between"
                backgroundColor="#002a38"
                color="#fff"
                borderTop="3px solid #5a6fa3"
            >
                {children}
            </chakra.main>
        </>
    )
}


export default Main