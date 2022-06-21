import {
  useToast,
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Spacer,
  Textarea,
  ToastId,
  Progress,
} from '@chakra-ui/react'
import Header from '../../components/header'
import { useForm, useFieldArray, UseFormRegister } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import client from '../../lib/client'
import { useRef } from 'react'

type Inputs = {
  title: string
  body: string
  choices: Choice[]
}

type Choice = {
  name: string
}

export default function PostEdit() {
  const toast = useToast()
  const toastIdRef = useRef<ToastId | null>(null)
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
  const { mutate, isLoading, isSuccess } = useMutation((data: Inputs) => client.CreatePost(data))

  const onSubmit = async (data: Inputs) =>
    mutate(data, {
      onSuccess: (res) => {
        console.log(res)
        toastIdRef.current = toast({
          title: '送信完了',
          status: 'success',
          position: 'top',
          isClosable: false,
        })
        setTimeout(() => {
          router.push('/')
          toastIdRef.current !== null && toast.close(toastIdRef.current)
        }, 1000)
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
      {isLoading && <Progress size='xs' isIndeterminate />}
      <Header isPostEdit></Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel mx={4} htmlFor='title'>
            タイトル
          </FormLabel>
          <Box px={8} mb={2}>
            <Input id='title' {...register('title')} />
          </Box>

          <FormLabel mx={4} htmlFor='body'>
            本文
          </FormLabel>
          <Box px={8} mb={4}>
            <Textarea id='body' {...register('body')} />
          </Box>
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
      <FormLabel mx={4}>・選択肢{choiceIndex + 1}</FormLabel>
      <HStack spacing={1}>
        <Box pl={16} w='full'>
          <Input {...register(`choices.${choiceIndex}.name` as const)}></Input>
        </Box>
        <Spacer />
        <Box>
          <Button mx={4} mr={16} type={'button'} onClick={() => removeChoice(choiceIndex)}>
            選択肢を削除
          </Button>
        </Box>
      </HStack>
    </Box>
  )
}
