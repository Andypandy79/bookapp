import VerifyForm from '@/components/VerifyForm';

const VerifyPage = async ({ searchParams }) => {
  const { callbackUrl } = await searchParams;
  return <VerifyForm callbackUrl={callbackUrl} />;
};

export default VerifyPage;
