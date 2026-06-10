import LoginForm from '@/components/auth/login/LoginForm'
import { LoginPageWrapper } from '@/components/auth/login/LoginPageWrapper'

interface Props {
  searchParams: Promise<{ confirmed?: string }>
}

export default async function LoginPage({ searchParams }: Props) {
  const { confirmed } = await searchParams
  return <LoginPageWrapper confirmed={confirmed} />
}
