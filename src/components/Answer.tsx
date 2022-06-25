import { Box, Stack } from '@chakra-ui/react'

type Props = {
  choice: String
  body: String
}

export function Answer({ choice, body }: Props) {
  return (
    <Stack w={400}>
      <Box>選択肢: {choice}</Box>
      <Box>{body}</Box>
    </Stack>
  )
}
