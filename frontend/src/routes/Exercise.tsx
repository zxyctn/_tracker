import { useLoaderData } from 'react-router-dom';

const Exercise = () => {
  const data = useLoaderData();
  console.log(data);

  return <div>Exercise</div>;
};

export default Exercise;
