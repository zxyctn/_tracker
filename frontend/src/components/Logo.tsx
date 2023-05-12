import { LogoProps } from '../types';
import { Link } from 'react-router-dom';

const Logo = ({ isEdit, closeMenu }: LogoProps) => {
  return (
    <button
      className={`btn ${
        isEdit ? 'btn-secondary' : 'btn-primary'
      } text-xl w-min lowercase rounded-none rounded-tl-xl rounded-br-xl  transition-all ease-linear duration-300`}
      onClick={closeMenu}
    >
      <Link to='/'>_tracker</Link>
    </button>
  );
};

export default Logo;
