import { useRouter } from 'next/router'
import client from '../../lib/client'
import { useQuery } from 'react-query'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  VStack,
} from '@chakra-ui/react'
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
        <Box>
          <form>
            <FormControl>
              <FormLabel>選択肢</FormLabel>
              <RadioGroup>
                <Stack>
                  {data?.post.choices?.map((choice, index) => (
                    <Radio key={index}>{choice?.name}</Radio>
                  ))}
                </Stack>
              </RadioGroup>
              <FormLabel>コメント</FormLabel>
              <Textarea />
            </FormControl>
            <Button type='submit' size='lg' mx={8} my={2} colorScheme={'green'}>
              投稿
            </Button>
          </form>
        </Box>
      </VStack>
    </Stack>
  )
}
