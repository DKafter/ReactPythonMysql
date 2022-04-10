import { chakra, Flex, OrderedList, Text } from "@chakra-ui/react";
import { inject, observer } from "mobx-react";
import React, { Suspense, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./header/Header";
import Logout from "./header/Logout";
import Hello from "./main/Hello";
import UserOrder from "./main/parts/User.Order";
import UserOrderProducts from "./main/parts/User.OrderProducts";
import UserLoginStore from "../store/user/login"

const Register = React.lazy(() => import("./main/Register"));
const Login = React.lazy(() => import("./main/Login"));
const User = React.lazy(() => import("./main/User"));

const App = () => {
  const { getIsLogin, getVerifyLogin } = useContext(UserLoginStore);
  getVerifyLogin;
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Hello />} />
        {
          !getIsLogin && <>
            <Route path="Register" element={
              <Suspense fallback={<></>}>
                <Register />
              </Suspense>} />
            <Route path="Login" element={<Suspense fallback={<></>}><Login /></Suspense>} />
          </>
        }

        {
          getIsLogin && <>
            <Route path="About" element={<Suspense fallback={<></>}><User /></Suspense>} />
            <Route path="OrderList" element={<Suspense fallback={<></>}><UserOrder /></Suspense>} />
            <Route path="OrderProducts" element={<Suspense fallback={<></>}><UserOrderProducts /></Suspense>} />
            <Route path="Logout" element={<Logout />} />
          </>
        }

        <Route
          path="*"
          element={
            <chakra.main id="main" style={{ padding: "1rem" }}>
              <Flex
                w="100%"
                h="100%"
                alignItems="center"
                justify="center"
              >
                <Text fontSize="5xl">There's nothing here!</Text>
              </Flex>
            </chakra.main>
          } />
      </Routes>
    </>
  )
}

export default inject("AppStore")(observer(App));
