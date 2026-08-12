const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className='mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8'>
        <p className='text-sm font-medium text-slate-500'>
          &copy; {currentYear}{' '}
          <span className='font-bold text-slate-800 tracking-tight'>
            Book
            <span className='text-blue-600'>App</span>
          </span>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
