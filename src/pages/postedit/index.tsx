import { Button, FormControl, FormLabel, Input, Stack, Textarea } from '@chakra-ui/react'
import Header from '../../components/header'

export default function PostEdit() {
  return (
    <Stack>
      <Header isPostEdit></Header>
      <FormControl>
        <FormLabel>タイトル</FormLabel>
        <Input></Input>
        <FormLabel>本文</FormLabel>
        <Textarea></Textarea>
        <Button>送信</Button>
      </FormControl>
    </Stack>
  )
}
