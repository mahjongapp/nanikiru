import { Text, Stack, HStack, Box, Avatar, Button, Textarea } from '@chakra-ui/react'
import client from '../lib/client'
import MahjongTailIcon from './MahjongTailIcon'
import UserBar from './UserBar'
import { useQuery } from 'react-query'

type Props = {
  id: number
  choice?: string
  body: string
  isSending: boolean
  index: number
  user: {
    name: string | null | undefined
    image: string | null | undefined
  }
}

export function Answer({ id, user, index, isSending, choice, body }: Props) {
  const { data, isError, isLoading, refetch } = useQuery(
    ['GetCommentsByAnswerId', id],
    () => client.GetCommentsByAnswerId({ answerId: id }),
    {
      enabled: false,
    },
  )
  return (
    <Stack w={400} background='gray.100'>
      <UserBar {...user} />
      <Box>{choice && <MahjongTailIcon name={choice} width={45} />}</Box>
      <Text color={index === 0 && isSending ? 'blackAlpha.600' : 'black'}>{body}</Text>
      <Textarea placeholder='コメントを入力' bg='white' />
      <Button w={100} bg='green.300'>
        返信
      </Button>
      <Button onClick={() => refetch()}>コメントを見る</Button>
      {data &&
        data.commentsByAnswerId &&
        data.commentsByAnswerId.map((comment, index) => <div key={index}>{comment?.body}</div>)}
    </Stack>
  )
}
