import { chakra, Text } from '@chakra-ui/react'
import { observer } from 'mobx-react'
import React from 'react'
import Main from './views/Main'

function Hello() {
  return (
    <>
      <chakra.main>
        <Text mt="3" textAlign="center" color="#000" fontSize="4xl" fontWeight="900" letterSpacing="4px">Hello main</Text>
      </chakra.main>
    </>
  )
}


export default observer(Hello);