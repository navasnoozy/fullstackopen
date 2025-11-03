import { useEffect, useState } from 'react';
import personsService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import './App.css';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState({ message: null, isError: false });

  useEffect(() => {
    personsService.getAll().then(initialPersons => setPersons(initialPersons));
  }, []);

  const addPerson = event => {
    event.preventDefault();
    if (persons.some(person => person.name === newName)) {
      setNotification({ message: `${newName} is already added to phonebook.`, isError: true });
      setTimeout(() => setNotification({ message: null, isError: false }), 3000);
      return;
    }
    const personObject = { name: newName, number: newNumber };
    personsService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNotification({ message: `Added ${returnedPerson.name}`, isError: false });
        setTimeout(() => setNotification({ message: null, isError: false }), 3000);
        setNewName('');
        setNewNumber('');
      });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          setNotification({ message: `Deleted ${name}`, isError: false });
          setTimeout(() => setNotification({ message: null, isError: false }), 3000);
        })
        .catch(() => {
          setNotification({ message: `Information of ${name} has already been removed from server`, isError: true });
          setPersons(persons.filter(person => person.id !== id));
          setTimeout(() => setNotification({ message: null, isError: false }), 3000);
        });
    }
  };

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} isError={notification.isError} />
      <Filter value={filter} onChange={e => setFilter(e.target.value)} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={e => setNewName(e.target.value)}
        newNumber={newNumber}
        handleNumberChange={e => setNewNumber(e.target.value)}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
