import { chakra, Button, Input, keyframes, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useEffect, FormEvent, useContext, useState } from 'react'
import { getJsonData } from '../services/jwt.auth'
import OrdersStore from "../../store/orders";
import ChangeUserAboutStore from "../../store/user/changeAbout";
import Main from './views/Main';
import SFlex from './views/SFlex';
import { observer } from 'mobx-react';
import { useFocus } from '../../hooks';

const User = (): JSX.Element => {
    const data = useContext(ChangeUserAboutStore);
    const [isChange, setIsChange] = useState<boolean>(true);
    const [isColorChange, setIsColorChange] = useState<boolean>(false);
    function getData() {
        return data.getData && Object.fromEntries(Object.entries(data.getData).filter(([key, value]) => {
            if (key == "email" ||
                key == "fullname" ||
                key == "home" ||
                key == "phone")
                return true;
        }));
    }


    async function setNewInformationUser(e: FormEvent) {
        e.preventDefault();
        const email = e.target.email.value;
        const fullname = e.target.fullname.value;
        const [surname, name] = fullname.split(" ");
        const home = e.target.home.value;
        const phone = e.target.phone.value;

        setIsColorChange(await data.setInformation({
            email: email,
            name: name,
            surname: surname,
            fullname: fullname,
            home: home,
            phone: phone
        }))
    }

    function setChangeButton() {
        setIsChange(!isChange);
        isChange == false && setIsColorChange(false);
    }

    function validateTel(e: any, key: string) {
        if (key == "phone") {
            e.target.value = e.target.value.replace(/[/\D/\b]/gi, "");
            e.target.maxLength = 11;

            e.target.value = e.target.value.replace("+", "");
            e.target.value = "+" + e.target.value;
            const phoneTest = new RegExp(/(\+[3-8])[\s(]?(\d{3})[\s)]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2})/g);

            e.target.value = e.target.value.trim();
            const results = phoneTest.exec(e.target.value);
            console.log(results);
            if (results !== null && results[0].length < 14) {
                e.target.value = results[1] + " " + "(" + results[2] + ")" + " " + results.slice(3).join("-");
            }
        }
        e.target.maxLength = 18;
    }

    return (
        <>
            <Main>
                <>
                    <chakra.form onSubmit={setNewInformationUser} method="POST" action="#">
                        <Text align="center" mt="5">
                            Дата регистрации {data.getDate}
                        </Text>
                        <TableContainer p="5">
                            <Table variant="simple" style={{ tableLayout: "fixed" }}>
                                <Tbody>
                                    {
                                        data && data.getData && Object.entries(getData()).map(([key, value], i) => {
                                            return (
                                                <Tr key={key}>
                                                    <Th scope="row">
                                                        <Text textAlign="end" whiteSpace="break-spaces" overflowWrap="break-word" fontSize="0.3xl">
                                                            {key.toUpperCase()}
                                                        </Text>
                                                    </Th>

                                                    {
                                                        console.log(value)
                                                    }
                                                    <Td scope="row">
                                                        <Input
                                                            isRequired
                                                            type={key == "phone" ? "tel" : "text"}
                                                            onChange={(e) => validateTel(e, key)}
                                                            id={key}
                                                            borderColor={isChange ? "blackAlpha.900" : "lightblue"}
                                                            readOnly={isChange}
                                                            defaultValue={value ? value : undefined}
                                                            isReadOnly={isChange} whiteSpace="break-spaces" overflowWrap="break-word" fontSize="0.3xl" />
                                                    </Td>
                                                </Tr>
                                            )
                                        })
                                    }
                                </Tbody>
                            </Table>

                            <Button m={"4"} onClick={setChangeButton} as="button" type="button" colorScheme={isChange ? "telegram" : "cyan"}>
                                {
                                    isChange ? "Открыть поля на изменение" : "Закрыть поля на изменение"
                                }
                            </Button>

                            {
                                !isChange &&
                                <Button isDisabled={isColorChange} m={"4"} as="button" type="submit" colorScheme={isColorChange ? "cyan" : "telegram"}>
                                    {
                                        isColorChange ? "Изменено" : "Поменять?"
                                    }
                                </Button>
                            }
                        </TableContainer>
                    </chakra.form>
                </>
            </Main>
        </>
    )
}

export default observer(User);