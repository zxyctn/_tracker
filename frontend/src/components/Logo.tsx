import { LogoProps } from '../types';
import { Link } from 'react-router-dom';

const Logo = ({ isEdit }: LogoProps) => {
  return (
    <button
      className={`btn ${
        isEdit ? 'btn-secondary' : 'btn-primary'
      } text-xl w-min lowercase rounded-none rounded-tl-xl rounded-br-xl fixed top-5 left-5 z-50`}
    >
      <Link to='/'>_tracker</Link>
    </button>
  );
};

export default Logo;
