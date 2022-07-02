import { Avatar, Badge, Box, HStack } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import MahjongTailIcon from './MahjongTailIcon'
import UserBar from './UserBar'

type Props = {
  title?: string
  body?: string
  choices: ({ name: string } | null)[] | null | undefined
  imgurl?: string
  id?: number
  isLink?: boolean
  user: {
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
        <UserBar {...user} />
        <Box>{title}</Box>
        {imgurl && (
          <Image width={450} height={300} alt='何切るの画像' src={imgurl} objectFit={'contain'} />
        )}
        <Box></Box>
        <Box>{body}</Box>
        {choices &&
          choices.map(
            (choice, index) =>
              choice && <MahjongTailIcon key={index} name={choice.name} width={60} />,
          )}
      </Box>
    </WrapByLink>
  )
}
