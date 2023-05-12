import store from '../store';
import { Link } from 'react-router-dom';
import { setBreadcrumbs } from '../slices/appSlice';

const Breadcrumbs = ({ isEdit }: { isEdit: boolean }) => {
  const { app } = store.getState();

  const handleNavigation = (breadcrumb: { name: string; path: string }) => {
    const index = app.breadcrumbs.findIndex((b) => b.name === breadcrumb.name);
    if (index !== -1) {
      store.dispatch(setBreadcrumbs(app.breadcrumbs.slice(0, index)));
    }
  };

  return (
    <div className='w-full overflow-auto'>
      <div className='flex gap-1'>
        {app.breadcrumbs.map((breadcrumb, index) => (
          <Link
            to={breadcrumb.path}
            key={index}
            className={`flex gap-1 font-semibold whitespace-nowrap transition-all ease-linear duration-300 ${
              index === app.breadcrumbs.length - 1
                ? `${isEdit ? 'text-secondary' : 'text-primary'}`
                : `${isEdit ? 'text-secondary/40' : 'text-primary/40'}`
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
