import store from '../store';
import { Link } from 'react-router-dom';
import { setBreadcrumbs } from '../slices/appSlice';
import { useEffect } from 'react';

const Breadcrumbs = ({ isEdit }: { isEdit: boolean }) => {
  const { app, sets, exercises, groups, weekdays } = store.getState();

  const handleNavigation = (breadcrumb: { name: string; path: string }) => {
    const index = app.breadcrumbs.findIndex((b) => b.name === breadcrumb.name);
    if (index !== -1) {
      store.dispatch(setBreadcrumbs(app.breadcrumbs.slice(0, index)));
    }
  };

  return app.breadcrumbs.length > 0 ? (
    <div
      className={`grid max-w-max min-w-0 overflow-auto py-0.5 px-2 rounded-lg transition ease-linear duration-300 ${
        isEdit ? 'bg-secondary-content' : 'bg-primary-content'
      }`}
    >
      <div className='flex gap-1 w-full'>
        {app.breadcrumbs.map((breadcrumb, index) => (
          <Link
            to={breadcrumb.path}
            key={index}
            className={`flex gap-1 font-semibold whitespace-nowrap transition ease-linear duration-300  ${
              index === app.breadcrumbs.length - 1
                ? `${isEdit ? 'text-secondary' : 'text-primary'}`
                : `${isEdit ? 'text-secondary/20' : 'text-primary/20'}`
            }`}
            onClick={() => handleNavigation(breadcrumb)}
          >
            <div>{breadcrumb.name.toUpperCase()}</div>
            {index !== app.breadcrumbs.length - 1 && <div>/</div>}
          </Link>
        ))}
      </div>
    </div>
  ) : null;
};

export default Breadcrumbs;
