import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import type { RootState } from '../store';
import type { LogoProps } from '../types';

const Logo = ({ closeMenu }: LogoProps) => {
  const edit = useSelector((state: RootState) => state.actions.edit);
  return (
    <button
      className={`btn ${
        edit ? 'btn-secondary' : 'btn-primary'
      } text-xl w-min lowercase rounded-none rounded-tl-xl rounded-br-xl  transition-all ease-linear duration-300`}
      onClick={closeMenu}
    >
      <Link to='/'>_tracker</Link>
    </button>
  );
};

export default Logo;
