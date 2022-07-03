import { Text, Avatar, HStack } from '@chakra-ui/react'
import Link from 'next/link'

type Props = {
  name: string | null | undefined
  image: string | null | undefined
}

export default function UserBar({ name, image }: Props) {
  return (
    <HStack spacing={2} p={1}>
      {image && <Avatar size='sm' src={image} />}
      <Text>{name}</Text>
    </HStack>
  )
}
