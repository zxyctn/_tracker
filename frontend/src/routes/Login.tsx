import Input from '../components/Input';
import TextField from '../components/TextField';

const Login = () => {
  return (
    <form className='grid gap-3'>
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
