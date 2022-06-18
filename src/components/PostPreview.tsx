import { Box } from '@chakra-ui/react'

type Props = {
  title: string
}

export default function PostPreview({ title }: Props) {
  return (
    <Box bg='gray.100' w={[380, 420, 460, 500]}>
      <Box>{title}</Box>
      <Box>ここに画像</Box>
      <Box>ここに本文</Box>
    </Box>
  )
}
