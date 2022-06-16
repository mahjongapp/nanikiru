import { Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import Header from '../../components/header'

export default function PostEdit() {
  return (
    <Stack>
      <Header isPostEdit></Header>
      <FormControl>
        <FormLabel>タイトル</FormLabel>
        <Input></Input>
        <FormLabel>本文</FormLabel>
        <Input></Input>
        <Button>送信</Button>
      </FormControl>
    </Stack>
  )
}
