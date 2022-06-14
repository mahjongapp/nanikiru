import type { NextPage } from 'next'
import { Stack, Box } from '@chakra-ui/react'
import Header from '../components/header'

const Home: NextPage = () => {
  return (
    <Stack>
      <Header></Header>
      <Box>ボディーだよ</Box>
    </Stack>
  )
}

export default Home
