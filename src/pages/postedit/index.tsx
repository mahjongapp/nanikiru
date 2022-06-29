import {
  useToast,
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Textarea,
  ToastId,
  Progress,
} from '@chakra-ui/react'
import Header from '../../components/header'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import client from '../../lib/client'
import { useRef, useState } from 'react'
import { AddIcon, CheckIcon } from '@chakra-ui/icons'
import Image from 'next/image'
import { postImage } from '../../lib/upload'
import { Select, GroupBase } from 'chakra-react-select'
import { ChoiceGroup, choiceGroups } from '../../lib/choices'

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
  label: string
  value: string
}

export default function PostEdit() {
  const [imgSending, setImgSending] = useState(false)
  const toast = useToast()
  const toastIdRef = useRef<ToastId | null>(null)
  const router = useRouter()
  const [imgurl, setImgurl] = useState('')
  const { handleSubmit, register, control } = useForm<Inputs>({
    defaultValues: {
      choices: [],
    },
  })
  const [file, setFile] = useState<File | null>(null)
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'choices',
  })
  const { mutate, isLoading, isSuccess } = useMutation((data: CreatePostData) =>
    client.CreatePost({
      title: data.title,
      body: data.body,
      imgurl: data.imgurl,
      choices: data.choices.map((choice) => {
        return {
          name: choice.value,
        }
      }),
    }),
  )

  const onSubmit = async (data: Inputs) => {
    setImgSending(true)
    const result = await postImage(file)
    setImgSending(false)
    mutate(
      { ...data, imgurl: result },
      {
        onSuccess: (res) => {
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
    append({})
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
          <FormLabel htmlFor='choices'>選択肢</FormLabel>
          <Controller
            control={control}
            name='choices'
            rules={{ required: 'Please enter at least one food group.' }}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, error },
            }) => (
              <Select<ChoiceGroup, true, GroupBase<ChoiceGroup>>
                id='choices'
                isMulti
                name={name}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                options={choiceGroups}
                placeholder='ここに選択肢を追加'
                closeMenuOnSelect={true}
              />
            )}
          />
          <Box display='flex' justifyContent='center'>
            <HStack mt={8}>
              <Button
                disabled={isLoading || imgSending || isSuccess}
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
