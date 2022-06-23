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
import { useRef, useState } from 'react'
import { CloseIcon, AddIcon, CheckIcon } from '@chakra-ui/icons'
import Image from 'next/image'
import { postImage } from '../../lib/upload'

type Inputs = {
  title: string
  body: string
  choices: Choice[]
}

type CreatePostData = {
  title: string
  body: string
  choices: Choice[]
  imgurl: string
}

type Choice = {
  name: string
}

export default function PostEdit() {
  const toast = useToast()
  const toastIdRef = useRef<ToastId | null>(null)
  const router = useRouter()
  const [imgurl, setImgurl] = useState('')
  const { handleSubmit, register, control } = useForm<Inputs>({
    defaultValues: {
      choices: [{ name: '' }],
    },
  })
  const [file, setFile] = useState<File | null>(null)
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'choices',
  })
  const { mutate, isLoading, isSuccess } = useMutation((data: CreatePostData) =>
    client.CreatePost(data),
  )

  const onSubmit = async (data: Inputs) => {
    const result = await postImage(file)
    mutate(
      { ...data, imgurl: result },
      {
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
      },
    )
  }
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
            <Input
              id='title'
              focusBorderColor='gray.400'
              placeholder='ここにタイトルを入力'
              {...register('title')}
            />
          </Box>
          <input
            required
            type='file'
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file_ = e.target.files[0]
                setFile(file_)
                const reader = new FileReader()
                reader.onload = (e: any) => {
                  setImgurl(e.target.result)
                }
                reader.readAsDataURL(file_)
              }
            }}
            accept='image/*'
          />
          {imgurl !== '' && <Image width={600} height={450} src={imgurl} objectFit='contain' />}
          <FormLabel mx={4} htmlFor='body'>
            本文
          </FormLabel>
          <Box px={8} mb={4}>
            <Textarea
              id='body'
              focusBorderColor='gray.400'
              placeholder='ここに本文を入力'
              {...register('body')}
            />
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
            <HStack mt={8}>
              <Button
                onClick={addChoice}
                type={'button'}
                mx={8}
                my={2}
                colorScheme={'teal'}
                leftIcon={<AddIcon />}
              >
                選択肢を追加
              </Button>
              <Button
                type='submit'
                size='lg'
                mx={8}
                my={2}
                colorScheme={'green'}
                leftIcon={<CheckIcon />}
              >
                投稿
              </Button>
            </HStack>
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
          <Input
            focusBorderColor='gray.400'
            placeholder='ここに選択肢を入力'
            {...register(`choices.${choiceIndex}.name` as const)}
          ></Input>
        </Box>
        <Spacer />
        <Box>
          <Button
            mx={4}
            mr={16}
            type={'button'}
            colorScheme={'red'}
            leftIcon={<CloseIcon />}
            onClick={() => removeChoice(choiceIndex)}
          >
            削除
          </Button>
        </Box>
      </HStack>
    </Box>
  )
}
