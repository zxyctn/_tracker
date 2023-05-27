import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { getTextColors } from '../shared';
import { Link } from 'react-router-dom';

const Groups = () => {
  const groups = useSelector((state: RootState) => state.groups);
  const textColors = getTextColors(groups.length);

  return (
    <>
      {groups.length > 0 ? (
        groups.map((group, index) => (
          <button className={`coloredBtn ${textColors[index]}`} key={index}>
            <Link to={`${group.id}`}>{group.name}</Link>
          </button>
        ))
      ) : (
        <h1>...</h1>
      )}
    </>
  );
};

export default Groups;
