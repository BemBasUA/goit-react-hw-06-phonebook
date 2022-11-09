import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { changeFilter } from 'redux/filterSlice';

export const Filter = ({ value }) => {
  const dispatch = useDispatch();

  const handleFilterChange = e => {
    dispatch(changeFilter(e.currentTarget.value));
  };
  return (
    <label>
      Find contacts by Name
      <input type="text" value={value} onChange={handleFilterChange}></input>
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
};
