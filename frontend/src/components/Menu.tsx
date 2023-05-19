import { Link } from 'react-router-dom';

// TODO: Filter components by user authentication status
const Menu = ({ closeMenu }: { closeMenu: () => void }) => {
  const components = [
    <Link to={'/preferences'}>Preferences</Link>,
    <Link to={'/stats'}>Statistics</Link>,
    'Log Out', // TODO: Add log out button with a confirm modal
    <Link to={'/register'}>Register</Link>,
    <Link to={'/login'}>Log in</Link>,
  ];

  return (
    <div className='bg-primary fixed w-full h-full z-0'>
      <div className='grid place-content-end grid-cols-1 h-full py-24 px-6 place-items-end'>
        {components.map((component, index) => (
          <button
            key={index}
            className='btn btn-primary hover:bg-primary border-0 text-2xl p-0'
            onClick={closeMenu}
          >
            {component}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
