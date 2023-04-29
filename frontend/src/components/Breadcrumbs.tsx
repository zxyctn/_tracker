import { useEffect } from 'react';
import store from '../store';
import { Link } from 'react-router-dom';
import { setBreadcrumbs } from '../slices/appSlice';

const Breadcrumbs = () => {
  const { app } = store.getState();

  const handleNavigation = (breadcrumb: { name: string; path: string }) => {
    const index = app.breadcrumbs.findIndex((b) => b.name === breadcrumb.name);
    if (index !== -1) {
      store.dispatch(setBreadcrumbs(app.breadcrumbs.slice(0, index)));
    }
  };

  useEffect(() => {
    console.log(app.breadcrumbs);
  }, [app.breadcrumbs]);

  return (
    <div className='absolute w-screen overflow-auto px-5 mt-20'>
      <div className='flex gap-1'>
        {app.breadcrumbs.map((breadcrumb, index) => (
          <Link
            to={breadcrumb.path}
            key={index}
            className={`flex gap-1 font-medium whitespace-nowrap ${
              index === app.breadcrumbs.length - 1
                ? 'text-primary'
                : 'text-primary/40'
            }`}
            onClick={() => handleNavigation(breadcrumb)}
          >
            <div>{breadcrumb.name.toUpperCase()}</div>
            {index !== app.breadcrumbs.length - 1 && <div>/</div>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumbs;
