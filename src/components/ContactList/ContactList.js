import { useFetchContactsQuery } from 'redux/phonebook/phonebook-slice';
import { useSelector } from 'react-redux';
import { getFilter } from '../../redux/phonebook/phonebook-selectors';
import Loader from 'components/Loader';
import ContactListItem from './ContactListItem';
import s from './ContactList.module.css';

const ContactList = () => {
  const filter = useSelector(getFilter);
  const { data: contacts, isFetching } = useFetchContactsQuery();

  return (
    <>
      {isFetching && <Loader/>}
      {contacts && (
        <ul className={s.list}>
          {contacts
            .filter(contact =>
              contact.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map(({ name, number, id }) => {
              return (
                <ContactListItem name={name} number={number} key={id} id={id} />
              );
            })}
        </ul>
      )}
    </>
  );
};

export default ContactList;
