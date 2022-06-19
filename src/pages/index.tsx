import type { NextPage } from 'next'
import { Stack, VStack } from '@chakra-ui/react'
import Header from '../components/header'
import PostPreview from '../components/PostPreview'
import client from '../lib/client'
import { useQuery } from 'react-query'

const Home: NextPage = () => {
  const { data, isLoading, isError } = useQuery('getPosts', () => client.GetPosts())
  console.log(data)
  return (
    <Stack spacing={8}>
      <Header></Header>
      <VStack spacing={8}>
        {data?.posts.map((post, index) => (
          <PostPreview
            key={index}
            title={post?.title}
            body={post?.body}
            choices={post?.choices}
          ></PostPreview>
        ))}
      </VStack>
    </Stack>
  )
}

export default Home
