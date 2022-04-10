import { IconButton } from "@chakra-ui/react";
import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import JwtStore from "../../store/jwt";

const Logout = (): JSX.Element => {
    const data = useContext(JwtStore);

    function clearRefresh() {
        data.clearData();
    }


    return (
        <>
            <IconButton onClick={clearRefresh} variant='outline'
                colorScheme='teal'
                aria-label='Call Sage'
                fontSize='20px'
                icon={<BiLogOut />} />
        </>
    )
}


export default observer(Logout);