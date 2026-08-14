import LoginForm from '@/components/LoginForm';

const LoginPage = async ({ searchParams }) => {
  const { callbackUrl } = await searchParams;
  return <LoginForm callbackUrl={callbackUrl} />;
};

export default LoginPage;
