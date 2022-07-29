import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { contactsOperations, contactsSelectors } from 'redux/phonebook';
import EdiText from 'react-editext';
import { LoaderButtons } from 'components/Loader';
import PropTypes from 'prop-types';
import s from '../ContactList.module.css';

export default function ContactListItem({ id, name, number }) {
  const [nameEdit, setNameEdit] = useState(name);
  const [numberEdit, setNumberEdit] = useState(number);
  const loading = useSelector(contactsSelectors.getLoader);
  const dispatch = useDispatch();
  const onDeleteContact = id => dispatch(contactsOperations.deleteContact(id));

  const handleSaveName = value => {
    setNameEdit(value);
    dispatch(contactsOperations.changeContactName({ id, value }));
  };

  const handleSaveNumber = value => {
    setNumberEdit(value);
    dispatch(contactsOperations.changeContactNumber({ id, value }));
  };

  return (
    <li key={id} className={s.item}>
      <div className={s.text}>
    
        {
          <EdiText
            id={id}
            type="text"
            name="name"
            value={nameEdit}
            onSave={handleSaveName}
          />
        }{' '}
        :{' '}
        {
          <EdiText
            id={id}
            name="number"
            type="number"
            value={numberEdit}
            onSave={handleSaveNumber}
          />
        }
      </div>
      <button
        onClick={() => onDeleteContact(id)}
        className={s.button}
        disabled={loading}
      >
        {loading ? <LoaderButtons /> : 'Delete'}
        </button>
    </li>
  );
}

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};