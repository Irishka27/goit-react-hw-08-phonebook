import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import Section from 'components/Section';
import s from './App.module.css';

 function App () {
   return (
      <div className={s.container}>
        <Section title={'Phonebook'}>
        <ContactForm />
        </Section>
        <Section title={'Contacts'}>
        <Filter />
        <ContactList  />
        </Section>
      </div>
    );
 
}

export default App;
