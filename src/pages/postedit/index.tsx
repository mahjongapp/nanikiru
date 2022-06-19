import { Box, Button, FormControl, FormLabel, Input, Stack, Textarea } from '@chakra-ui/react'
import Header from '../../components/header'
import { useForm, useFieldArray, UseFormRegister } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import client from '../../lib/client'

type Inputs = {
  title: string
  body: string
  choices: Choice[]
}

type Choice = {
  name: string
}

export default function PostEdit() {
  const router = useRouter()
  const { handleSubmit, register, control } = useForm<Inputs>({
    defaultValues: {
      choices: [{ name: '' }],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'choices',
  })
  const { mutate } = useMutation((data: Inputs) => client.CreatePost(data))

  const onSubmit = async (data: Inputs) =>
    mutate(data, {
      onSuccess: (res) => {
        console.log(res)
        router.push('/')
      },
    })
  const addChoice = () => {
    append({ name: '' })
  }
  const removeChoice = (index: number) => {
    remove(index)
  }

  return (
    <Stack>
      <Header isPostEdit></Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel htmlFor='title'>タイトル</FormLabel>
          <Input id='title' {...register('title')} />
          <FormLabel htmlFor='body'>本文</FormLabel>
          <Textarea id='body' {...register('body')} />
          {fields.map((field, index) => {
            return (
              <Box key={index}>
                <ChoiceItem
                  key={field.id}
                  register={register}
                  choiceIndex={index}
                  removeChoice={removeChoice}
                />
              </Box>
            )
          })}
          <Box display='flex' justifyContent='center'>
            <Button onClick={addChoice} type={'button'} mx={2} my={2}>
              選択肢を追加
            </Button>
            <Button type='submit' mx={2} my={2}>
              投稿
            </Button>
          </Box>
        </FormControl>
      </form>
    </Stack>
  )
}

type Props = {
  register: UseFormRegister<Inputs>
  choiceIndex: number
  removeChoice: (index: number) => void
}

const ChoiceItem = ({ register, choiceIndex, removeChoice }: Props) => {
  return (
    <Box>
      <FormLabel>選択肢{choiceIndex + 1}</FormLabel>
      <Input {...register(`choices.${choiceIndex}.name` as const)}></Input>
      <Box display='flex' justifyContent='end' mx={4}>
        <Button type={'button'} onClick={() => removeChoice(choiceIndex)}>
          選択肢を削除
        </Button>
      </Box>
    </Box>
  )
}
