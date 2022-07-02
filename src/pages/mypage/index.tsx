import { Text, Stack, VStack, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useQuery } from 'react-query'
import Header from '../../components/header'
import PostPreview from '../../components/PostPreview'
import client from '../../lib/client'

export default function MyPage() {
  const { data: session } = useSession()
  const {
    data: posts,
    isLoading,
    isSuccess,
  } = useQuery(
    ['postsByUserId', session],
    () => session && client.GetPostsByUserId({ userId: session.user.id as string }),
  )
  return (
    <Stack spacing={4}>
      <Header />
      <Tabs paddingX={16}>
        <TabList>
          <Tab>過去の投稿一覧</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack spacing={4}>
              {posts?.postsByUserId &&
                posts.postsByUserId.map(
                  (post, index) =>
                    post && (
                      <PostPreview
                        isLink
                        blurDataURL={post.blurDataURL}
                        choices={post.choices?.map((choice) => choice && { name: choice?.name })}
                        imgurl={post.imgurl}
                        title={post.title}
                        body={post.body}
                        key={index}
                        user={{ name: post.user?.name, image: post.user?.image }}
                      />
                    ),
                )}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}
