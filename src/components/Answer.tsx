import { Text, Stack, HStack, Box, Avatar, Button, Textarea } from '@chakra-ui/react'
import client from '../lib/client'
import MahjongTailIcon from './MahjongTailIcon'
import UserBar from './UserBar'
import { useQuery } from 'react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'

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

type Inputs = {
  comment: string
}

export function Answer({ id, user, index, isSending, choice, body }: Props) {
  const { register, handleSubmit, reset } = useForm<Inputs>()
  const { data: session } = useSession()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    session?.user.id &&
      client.CreateComment({
        body: data.comment,
        userId: session.user.id as string,
        answerId: id,
      })
    reset()
  }
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          placeholder='コメントを入力'
          bg='white'
          {...register('comment', { required: true })}
        />
        <Button w={100} bg='green.300' type='submit'>
          返信
        </Button>
      </form>
      <Button onClick={() => refetch()}>コメントを見る</Button>
      {data?.commentsByAnswerId &&
        data.commentsByAnswerId.map((comment, index) => (
          <>
            <UserBar name={session?.user.name} image={session?.user.image as string} />
            <Box key={index}>{comment?.body}</Box>
          </>
        ))}
    </Stack>
  )
}
