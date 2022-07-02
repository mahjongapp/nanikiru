import { Text, Stack, HStack, Box, Avatar } from '@chakra-ui/react'
import MahjongTailIcon from './MahjongTailIcon'

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
      {user && (
        <HStack>
          {user.image && <Avatar size={'sm'} src={user.image} />}
          <Box>{user.name}</Box>
        </HStack>
      )}
      <Box>{choice && <MahjongTailIcon name={choice} width={45} />}</Box>
      <Text color={index === 0 && isSending ? 'blackAlpha.600' : 'black'}>{body}</Text>
    </Stack>
  )
}
