import { useRouter } from 'next/router'
import client from '../../lib/client'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react'
import Header from '../../components/header'
import PostPreview from '../../components/PostPreview'
import { Answer } from '../../components/Answer'
import { Controller, useForm } from 'react-hook-form'
import { prisma } from '../../lib/prisma'
import { GetAnswersByPostIdQuery } from '../../../generated/graphql'
import { useSession } from 'next-auth/react'
import MahjongTailIcon from '../../components/MahjongTailIcon'

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
  const toast = useToast()
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const router = useRouter()
  const { id } = router.query
  const { data: answers, isLoading: isAnswerLoading } = useQuery(['GetAnswersByPostId', id], () =>
    client.GetAnswersByPostId({ postId: Number(id) }),
  )
  const { mutate, isLoading } = useMutation(
    async (data: Input) => {
      reset({ body: '', choice: '' })
      return client.CreateAnswer({
        body: data.body,
        choiceId: Number(data.choice),
        postId: Number(id),
        userId: session?.user.id as string,
      })
    },
    {
      onMutate: async (newInput: Input) => {
        await queryClient.cancelQueries(['GetAnswersByPostId', id])
        const previousAnswers = queryClient.getQueryData(['GetAnswersByPostId', id])
        queryClient.setQueryData<GetAnswersByPostIdQuery>(['GetAnswersByPostId', id], (old) => {
          const newAnswer = {
            __typename: 'Answer' as 'Answer',
            body: newInput.body,
            choice: {
              __typename: 'Choice' as 'Choice',
              name: post.choices.filter((choice) => choice.id === Number(newInput.choice))[0].name,
            },
            user: {
              __typename: 'User' as 'User',
              name: session?.user.name as string,
              image: session?.user.image as string,
            },
          }
          return {
            __typename: 'Query',
            answersByPostId: old ? [newAnswer, ...old.answersByPostId] : [newAnswer],
          }
        })
        return { previousAnswers }
      },
      onError: (err, newAnswer, context) => {
        toast({
          title: '送信失敗',
          status: 'error',
          isClosable: true,
        })
        reset({ ...newAnswer })
        queryClient.setQueryData(['GetAnswersByPostId', id], context?.previousAnswers)
      },
      onSettled: () => {
        queryClient.invalidateQueries(['GetAnswersByPostId', id])
      },
    },
  )

  const onSubmit = async (data: Input) => {
    mutate(data)
  }

  return (
    <Stack>
      <Header />

      <VStack>
        <PostPreview
          blurDataURL={post.blurDataURL}
          id={post.id}
          title={post.title}
          body={post.body}
          imgurl={post.imgurl}
          choices={post.choices}
          user={{
            name: post?.user?.name,
            image: post?.user?.image,
          }}
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
                          {choice && <MahjongTailIcon name={choice.name} width={30} />}
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
            <Answer
              key={index}
              index={index}
              isSending={isLoading}
              choice={answer?.choice?.name}
              body={answer?.body}
              user={{
                name: answer?.user?.name,
                image: answer?.user?.image,
              }}
            />
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
    user: {
      name: string
      image: string
    }
    blurDataURL: string | null | undefined
  }
}

export async function getStaticProps(context: { params: { id: string } }) {
  const post = await prisma?.post.findUnique({
    where: {
      id: Number(context.params.id),
    },
    include: {
      choices: true,
      user: true,
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
        user: {
          name: post?.user.name,
          image: post?.user.image,
        },
        blurDataURL: post?.blurDataURL,
      },
    },
    revalidate: 10,
  }
}

export const getStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
})
