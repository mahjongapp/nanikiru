import { Text, Stack, HStack, Box, Avatar, Button } from '@chakra-ui/react'
import MahjongTailIcon from './MahjongTailIcon'
import UserBar from './UserBar'

type Props = {
  choice?: string
  body?: string
  isSending: boolean
  index: number
  user: {
    name: string | null | undefined
    image: string | null | undefined
  }
}

export function Answer({ user, index, isSending, choice, body }: Props) {
  return (
    <Stack w={400} background='gray.100'>
      <UserBar {...user} />
      <Box>{choice && <MahjongTailIcon name={choice} width={45} />}</Box>
      <Text color={index === 0 && isSending ? 'blackAlpha.600' : 'black'}>{body}</Text>
      <Button>返信</Button>
    </Stack>
  )
}
