import { Avatar, Badge, Box, HStack } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

type Props = {
  title?: string
  body?: string
  choices: ({ name: string } | null)[] | null | undefined
  imgurl?: string
  id?: number
  isLink?: boolean
  user?: {
    name: string | null | undefined
    image: string | null | undefined
  }
}

export default function PostPreview({ user, title, body, choices, imgurl, id, isLink }: Props) {
  const WrapByLink = ({ children }: { children: ReactNode }) =>
    isLink ? (
      <Link href={`/answer/${id}`} passHref prefetch={false}>
        {children}
      </Link>
    ) : (
      <>{children}</>
    )
  return (
    <WrapByLink>
      <Box
        _hover={{ bg: 'gray.200' }}
        transitionDuration='200ms'
        as='a'
        bg='gray.100'
        w={[380, 420, 460, 500]}
      >
        {user && (
          <HStack>
            {user.image && <Avatar size={'sm'} src={user.image} />}
            <Box>{user.name}</Box>
          </HStack>
        )}
        <Box>{title}</Box>
        {imgurl && <Image width={450} height={300} src={imgurl} objectFit={'contain'} />}
        <Box></Box>
        <Box>{body}</Box>
        {choices?.map((choice, index) => (
          <Badge key={index}>{choice?.name}</Badge>
        ))}
      </Box>
    </WrapByLink>
  )
}
