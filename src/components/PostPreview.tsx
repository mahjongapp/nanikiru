import { Badge, Box } from '@chakra-ui/react'

type Props = {
  title?: string
  body?: string
  choices: ({ name: string } | null)[] | null | undefined
}

export default function PostPreview({ title, body, choices }: Props) {
  return (
    <Box bg='gray.100' w={[380, 420, 460, 500]}>
      <Box>{title}</Box>
      <Box>ここに画像</Box>
      <Box>{body}</Box>
      {choices?.map((choice, index) => (
        <Badge key={index}>{choice?.name}</Badge>
      ))}
    </Box>
  )
}
