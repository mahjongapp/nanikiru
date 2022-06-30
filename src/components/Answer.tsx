import { Text, Stack } from '@chakra-ui/react'

type Props = {
  choice?: String
  body?: String
  isSending: boolean
  index: number
}

export function Answer({ index, isSending, choice, body }: Props) {
  return (
    <Stack w={400}>
      <Text color={index === 0 && isSending ? 'blackAlpha.600' : 'black'}>選択肢: {choice}</Text>
      <Text color={index === 0 && isSending ? 'blackAlpha.600' : 'black'}>{body}</Text>
    </Stack>
  )
}
