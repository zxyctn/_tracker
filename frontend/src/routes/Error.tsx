import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='grid gap-5 h-min p-5 text-center'>
        <h1 className='text-6xl font-bold'>Oops!</h1>
        <p className='text-xl italic'>
          Sorry, an unexpected error has occurred.
        </p>

        <p className='font-bold text-error'>
          {isRouteErrorResponse(error)
            ? `${error.status} ${error.statusText}`
            : 'Unknown Error'}
        </p>
      </div>
    </div>
  );
};

export default Error;
