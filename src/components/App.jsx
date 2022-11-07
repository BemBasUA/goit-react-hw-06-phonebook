import { Box } from './Box/Box';
import { useState } from 'react';
import { Form } from './Form/Form';
import { Filter } from './Form/Filter/Filter';
import { ContactList } from './Form/ContactList/ContactList';
import shortid from 'shortid';
import { useEffect } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) || [];
  });
  const [filter, setFilter] = useState('');

  const handleSubmit = (name, number) => {
    const contact = {
      name,
      number,
    };
    contact.id = shortid.generate();

    const contactNames = contacts.map(({ name }) => name);

    if (!contactNames.includes(contact.name)) {
      setContacts(prevState => [contact, ...prevState]);
    } else {
      alert(contact.name + ' is already in contacts.');
    }
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Box>
      <h1>Phonebook</h1>
      <Form onSubmit={handleSubmit}></Form>
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter}></Filter>
      <ContactList data={visibleContacts} onClick={deleteContact}></ContactList>
    </Box>
  );
};
