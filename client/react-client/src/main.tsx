import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { chakra, ChakraProvider, Flex, Text } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/main/Register'
import Hello from './components/main/Hello'
import RootStore from "./store";
import { Provider, useObserver } from 'mobx-react'
const GlobalStore = createContext(new RootStore());

ReactDOM.render(
  <React.StrictMode>
    <Provider AppStore={GlobalStore}>
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
