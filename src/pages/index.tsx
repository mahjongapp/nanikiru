import type { NextPage } from 'next'
import { VStack, Stack } from '@chakra-ui/react'
import Header from '../components/header'
import PostPreview from '../components/PostPreview'

const Home: NextPage = () => {
  return (
    <VStack>
      <Header></Header>
      <Stack>
        <PostPreview title='hoge'></PostPreview>
        <PostPreview title='age'></PostPreview>
        <PostPreview title='uge'></PostPreview>
      </Stack>
    </VStack>
  )
}

export default Home
