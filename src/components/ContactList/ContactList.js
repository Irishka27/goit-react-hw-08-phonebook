import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  contactsOperations,
  contactsSelectors,
  contactsActions,
} from 'redux/phonebook';
import ContactListItem from './ContactListItem';
import { Loader } from 'components/Loader';
import s from './ContactList.module.css';

const ContactList = () => {
  const contacts = useSelector(contactsSelectors.getVisibleContacts);
  const loader = useSelector(contactsSelectors.getLoader);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    if (contacts.length === 0) dispatch(contactsActions.changeFilter(''));
  }, [contacts.length, dispatch]);

  return (
    <>
      {loader && <Loader />}
      {contacts.length > 0 ? (
        <ul className={s.list}>
          <p>Total amount of contacts: {contacts.length}</p>
          {contacts.map(contact => (
            <ContactListItem key={contact.id} {...contact} />
          ))}
        </ul>
      ) : (
        <p className={s.total} style={{ fontWeight: 'bold' }}>
          Add your first contact
        </p>
      )}
    </>
  );
};

export default ContactList;
