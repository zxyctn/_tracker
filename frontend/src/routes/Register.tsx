import TextField from '../components/Input/TextField';
import Input from '../components/Input/Input';

const Register = () => {
  return (
    <form className='grid gap-3 place-content-center place-items-center'>
      <Input type={true} name='username'>
        <TextField />
      </Input>
      <Input type={true} name='email'>
        <TextField type='email' />
      </Input>
      <Input type={true} name='password'>
        <TextField type='password' />
      </Input>
      <Input type={true} name='repeat password'>
        <TextField type='password' />
      </Input>

      <button className='btn btn-primary text-xl w-full'>Register</button>
    </form>
  );
};

export default Register;
