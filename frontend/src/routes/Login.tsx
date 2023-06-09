import Input from '../components/Input/Input';
import TextField from '../components/Input/TextField';

const Login = () => {
  return (
    <form className='grid gap-3 w-max min-w-full max-w-max'>
      <Input type={true} name='username'>
        <TextField />
      </Input>
      <Input type={true} name='password'>
        <TextField type='password' />
      </Input>

      <button className='btn btn-primary text-xl'>LOGIN</button>
    </form>
  );
};

export default Login;
