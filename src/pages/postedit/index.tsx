import { Button, FormControl, FormLabel, Input, Stack, Textarea } from '@chakra-ui/react'
import Header from '../../components/header'
import { useForm } from 'react-hook-form'
import { CreatePost } from '../../lib/mutations'
import { useGQLMutation } from '../../lib/useGQL'
import { useRouter } from 'next/router'

type Inputs = {
  title: string
  body: string
}

export default function PostEdit() {
  const router = useRouter()
  const { handleSubmit, register } = useForm<Inputs>()
  const { mutate } = useGQLMutation(CreatePost)

  const onSubmit = async (data: Inputs) =>
    mutate(data, {
      onSuccess: (res) => {
        console.log(res)
        router.push('/')
      },
    })

  return (
    <Stack>
      <Header isPostEdit></Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel htmlFor='title'>タイトル</FormLabel>
          <Input id='title' {...register('title')} />
          <FormLabel htmlFor='body'>本文</FormLabel>
          <Textarea id='body' {...register('body')} />
          <Button type='submit'>投稿</Button>
        </FormControl>
      </form>
    </Stack>
  )
}
