import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { contactsOperations, contactsSelectors } from 'redux/phonebook';
import { LoaderButtons } from 'components/Loader';
import s from './ContactForm.module.css';

export default function ContactForm() {
  const contacts = useSelector(contactsSelectors.getItems);
  const loading = useSelector(contactsSelectors.getLoader);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();

  const handleChange = event => {
    if (event.target.name === 'name') setName(event.target.value);
    if (event.target.name === 'number') setNumber(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const similarName = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );
    const similarNumber = contacts.find(contact => contact.number === number);
    if (similarName) {
      return toast.error('This name is allready exist');
    } else if (similarNumber) {
      return toast.error('This number is allready exist');
    }

    dispatch(contactsOperations.addContact({ name, number }));
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };
  return (
    <div className={s.formWrapper}>
      <form onSubmit={handleSubmit}>
        <div className={s.inputWrapper}>
          <input
            type="text"
            id="nameInputId"
            className={s.input}
            value={name}
            onChange={handleChange}
            name="name"
            placeholder='enter the name of the sontact'
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <label className={s.label} htmlFor="nameInputId">
            Name
          </label>
        </div>
        <div className={s.inputWrapper}>
          <input
            type="tel"
            placeholder='enter the number of the sontact'
            id="numberInputId"
            className={s.input}
            value={number}
            onChange={handleChange}
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <label className={s.label} htmlFor="numberInputId">
            Number
          </label>
        </div>
        <button className={s.button} type="submit" disabled={loading}>
          {loading ? <LoaderButtons /> : 'Add contact'}
        </button>
      </form>
      <Toaster />
    </div>
  );
}