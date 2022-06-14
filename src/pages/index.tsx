import type { NextPage } from 'next'
import { VStack, Box } from '@chakra-ui/react'
import Header from '../components/header'

const Home: NextPage = () => {
  return (
    <VStack>
      <Header></Header>
      <Box>ボディーだよ</Box>
    </VStack>
  )
}

export default Home
