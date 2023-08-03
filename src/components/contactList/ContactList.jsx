import { useDispatch, useSelector } from 'react-redux';
import { Filter } from '../filter/Filter';

import { getContact, getFilter, getIsLoading, getError } from 'redux/selectors';

import {
  SubTitle,
  ContactsList,
  ListItem,
  DeleteBtn,
} from './ContactList.styled';

import { useEffect } from 'react';

import { deleteContact, fetchContacts } from '../../redux/operations';

export function ContactList() {
  const contacts = useSelector(getContact);
  const filter = useSelector(getFilter);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts =
    Array.isArray(contacts) && typeof filter === 'string'
      ? contacts.filter(contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        )
      : [];

  return (
    <div>
      <div>
        <SubTitle>Contacts</SubTitle>
        <Filter />
        <ContactsList>
          {isLoading && <p>Loading contacts...</p>}
          {error && <p>{error}</p>}
          {filteredContacts.length > 0 ? (
            filteredContacts.map(contact => (
              <ListItem key={contact.id}>
                <span>
                  {contact.name}: {contact.number}
                </span>
                <DeleteBtn
                  type="button"
                  onClick={() => {
                    dispatch(deleteContact(contact.id));
                  }}
                ></DeleteBtn>
              </ListItem>
            ))
          ) : (
            <ListItem>No contacts found</ListItem>
          )}
        </ContactsList>
      </div>
    </div>
  );
}
