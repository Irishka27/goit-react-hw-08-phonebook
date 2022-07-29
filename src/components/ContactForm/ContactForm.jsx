import { useState } from 'react';
import {
  useAddContactMutation,
  useFetchContactsQuery,
} from 'redux/phonebook/phonebook-slice';
import toast, { Toaster } from 'react-hot-toast';
import s from './ContactForm.module.css';

function ContactForm() {
  const { data: contacts } = useFetchContactsQuery();
  const [addContact, { isLoading }] = useAddContactMutation();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    if (e.target.name === 'name') setName(e.target.value);
    if (e.target.name === 'number') setNumber(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const sameName = contacts.find(contact => contact.name === name);
    const sameNumber = contacts.find(contact => contact.number === number);
    if (sameName) {
      return toast.error('This name is allready exist');
    } else if (sameNumber) {
      return toast.error('This number is allready exist');
    }
    addContact({ name, number });
    toast.success('Contact added');
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <div>
      <form className={s.form} onSubmit={handleSubmit}>
        <label className={s.label}>
          Name
          <input
            className={s.input}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleChange}
          />
        </label>
        <label className={s.label}>
          Number
          <input
            className={s.input}
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChange}
          />
        </label>
        <button className={s.button} type="submit" disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add contact'}
        </button>
      </form>
      <Toaster />
    </div>
  );
}

export default ContactForm;
