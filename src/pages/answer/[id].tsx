import { useRouter } from 'next/router'
import client from '../../lib/client'
import { useMutation, useQuery } from 'react-query'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Progress,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import Header from '../../components/header'
import PostPreview from '../../components/PostPreview'
import { Answer } from '../../components/Answer'
import { Controller, useForm } from 'react-hook-form'
import { prisma } from '../../lib/prisma'
import { Post } from '@prisma/client'

type Input = {
  body: string
  choice: string
}

export default function AnswerPage({ post }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Input>()
  console.log(post)
  const router = useRouter()
  const { id } = router.query
  const { data: answers, isLoading: isAnswerLoading } = useQuery(`GetAnswersByPostId${id}`, () =>
    client.GetAnswersByPostId({ postId: Number(id) }),
  )
  const { mutate, isLoading } = useMutation((data: Input) =>
    client.CreateAnswer({ body: data.body, choiceId: Number(data.choice), postId: Number(id) }),
  )

  const onSubmit = async (data: Input) => {
    mutate(data, {
      onSuccess: (res) => {
        reset({ body: '', choice: '' })
      },
    })
  }

  return (
    <Stack>
      {isLoading && <Progress size='xs' isIndeterminate />}
      <Header />

      <VStack>
        <PostPreview
          id={post.id}
          title={post.title}
          body={post.body}
          imgurl={post.imgurl}
          choices={post.choices}
        />
        <Box>
          <Stack as='form' onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel>選択肢</FormLabel>
              <Controller
                control={control}
                name='choice'
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <Stack direction='row'>
                      {post.choices.map((choice, index) => (
                        <Radio key={index} value={choice?.id.toString()}>
                          {choice?.name}
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                )}
                rules={{
                  required: { value: true, message: 'この項目は必要です' },
                }}
              />
              <Box>{errors.choice && errors.choice.message}</Box>
              <FormLabel>コメント</FormLabel>
              <Textarea {...register('body', { required: true })} />
              <Box>{errors.body && 'コメントを入力して下さい'}</Box>
            </FormControl>
            <Button
              disabled={isLoading}
              type='submit'
              size='lg'
              mx={8}
              my={2}
              colorScheme={'green'}
            >
              送信
            </Button>
          </Stack>
        </Box>
        {isAnswerLoading ? (
          <Box>loading...</Box>
        ) : (
          answers?.answersByPostId.map((answer, index) => (
            <Answer key={index} choice={answer?.choice?.name} body={answer?.body} />
          ))
        )}
      </VStack>
    </Stack>
  )
}

type Props = {
  post: {
    id?: number
    imgurl?: string
    title?: string
    body?: string
    choices: {
      id: number
      name: string
    }[]
  }
}

export async function getServerSideProps(context: { params: { id: string } }) {
  const post = await prisma?.post.findUnique({
    where: {
      id: Number(context.params.id),
    },
    include: {
      choices: true,
    },
  })
  return {
    props: {
      post: {
        id: post?.id,
        imgurl: post?.imgurl,
        title: post?.title,
        body: post?.body,
        choices: post?.choices.map((choice) => {
          return { id: choice.id, name: choice.name }
        }),
      },
    },
  }
}
