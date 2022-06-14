import type { NextPage } from 'next'
import { Stack, VStack } from '@chakra-ui/react'
import Header from '../components/header'
import PostPreview from '../components/PostPreview'

const Home: NextPage = () => {
  return (
    <Stack>
      <Header></Header>
      <VStack>
        <PostPreview title='hoge'></PostPreview>
        <PostPreview title='age'></PostPreview>
        <PostPreview title='uge'></PostPreview>
      </VStack>
    </Stack>
  )
}

export default Home
