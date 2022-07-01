import { Text, Stack, HStack, Box, Avatar } from '@chakra-ui/react'

type Props = {
  choice?: String
  body?: String
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
      <Text color={index === 0 && isSending ? 'blackAlpha.600' : 'black'}>選択肢: {choice}</Text>
      <Text color={index === 0 && isSending ? 'blackAlpha.600' : 'black'}>{body}</Text>
    </Stack>
  )
}
