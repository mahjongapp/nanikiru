import { useRouter } from 'next/router'
import client from '../../lib/client'
import { useQuery } from 'react-query'
import { Stack, VStack } from '@chakra-ui/react'
import Header from '../../components/header'
import PostPreview from '../../components/PostPreview'

export default function Answer() {
  const router = useRouter()
  const { id } = router.query
  const { data, isLoading, isSuccess } = useQuery('GetPostByID', () =>
    client.GetPostByID({ postId: Number(id) }),
  )
  console.log(data)

  return (
    <Stack>
      <Header />
      <VStack>
        <PostPreview
          id={data?.post.id}
          title={data?.post.title}
          body={data?.post.body}
          imgurl={data?.post.imgurl}
          choices={data?.post.choices}
        />
      </VStack>
    </Stack>
  )
}
