import { Badge, Box } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  title?: string
  body?: string
  choices: ({ name: string } | null)[] | null | undefined
  imgurl?: string
  id?: number
  isLink?: boolean
}

export default function PostPreview({ title, body, choices, imgurl, id, isLink }: Props) {
  if (isLink) {
    return (
      <Link href={`/answer/${id}`} passHref prefetch={false}>
        <Box
          _hover={{ bg: 'gray.200' }}
          transitionDuration='200ms'
          as='a'
          bg='gray.100'
          w={[380, 420, 460, 500]}
        >
          <Box>{title}</Box>
          {imgurl && <Image width={450} height={300} src={imgurl} objectFit={'contain'} />}
          <Box></Box>
          <Box>{body}</Box>
          {choices?.map((choice, index) => (
            <Badge key={index}>{choice?.name}</Badge>
          ))}
        </Box>
      </Link>
    )
  } else {
    return (
      <Box bg='gray.100' w={[380, 420, 460, 500]}>
        <Box>{title}</Box>
        {imgurl && <Image width={450} height={300} src={imgurl} objectFit={'contain'} />}
        <Box></Box>
        <Box>{body}</Box>
        {choices?.map((choice, index) => (
          <Badge key={index}>{choice?.name}</Badge>
        ))}
      </Box>
    )
  }
}
