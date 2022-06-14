import type { NextPage } from 'next'
import { Stack, Box } from '@chakra-ui/react'
import Header from '../components/header'
import PostPreview from '../components/PostPreview'

const Home: NextPage = () => {
  return (
    <Stack>
      <Header></Header>
      <Stack>
        <PostPreview title='hoge'></PostPreview>
        <PostPreview title='age'></PostPreview>
        <PostPreview title='uge'></PostPreview>
      </Stack>
    </Stack>
  )
}

export default Home
