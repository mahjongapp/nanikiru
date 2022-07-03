import { Box, useToast } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'

export default function RequireSignIn({ children, href }: { children: ReactNode; href: string }) {
  const { data: session } = useSession()
  const router = useRouter()
  const require_login = useToast()
  useEffect(() => {
    if (!session) {
      require_login({
        title: 'ログインしてください',
        status: 'error',
        position: 'top',
        isClosable: true,
      })
      router.push(href)
    }
  }, [router, require_login, session, href])
  return session ? <>{children} </> : <Box>ログインして下さい</Box>
}
