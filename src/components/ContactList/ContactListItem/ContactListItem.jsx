import PropTypes from 'prop-types';
import { useDeleteContactMutation } from 'redux/phonebook/phonebook-slice';
import s from './ContactListItem.module.css';
const ContactListItem = ({ name, number, id }) => {
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  return (
    <li className={s.li}>
      <div className={s.container}>
        {name}: {number}
        <button
          type="button"
          className={s.button}
          onClick={() => deleteContact(id)}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </li>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.any,
  name: PropTypes.string,
  number: PropTypes.string,
 };

export default ContactListItem;