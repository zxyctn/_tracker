import TextField from '../components/TextField';
import Input from '../components/Input';

const Register = () => {
  return (
    <form className='grid gap-3'>
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

      <button className='btn btn-primary text-xl'>Register</button>
    </form>
  );
};

export default Register;
