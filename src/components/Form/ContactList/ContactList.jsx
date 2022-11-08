import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/store';

export const ContactList = ({ data, onClick }) => {
  const dispatch = useDispatch();
  const deleterContact = id => {
    dispatch(deleteContact(id));
    // setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };
  return (
    <ul>
      {data.map(contact => {
        return (
          <li key={contact.id}>
            {contact.name}: {contact.number}{' '}
            <button type="button" onClick={() => deleterContact(contact.id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  data: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  }),
};
