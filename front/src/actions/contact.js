import { CREATE_CONTACT, DELETE_CONTACT, GET_CONTACTS, UPDATE_CONTACT } from '.';
import * as contactApi from '../api/contact';

const createContactAction = (contact) => ({ type: CREATE_CONTACT, contact })
const updateContactAction = (contact) => ({ type: UPDATE_CONTACT, contact })
const deleteContactAction = (contactId) => ({ type: DELETE_CONTACT, contactId })
export const getContactsAction = (contacts) => ({ type: GET_CONTACTS, contacts })

export const createContact = (contact) =>
    async (dispatch) => {
        try {
            const newContact = await contactApi.create(contact);
            dispatch(createContactAction(newContact))
        } catch (e) {
            alert(e.message)
        }
    }

export const updateContact = (contact) =>
    async (dispatch) => {
        try {
            await contactApi.update(contact);
            dispatch(updateContactAction(contact))
        } catch (e) {
            alert(e.message)
        }
    }

export const getContacts = () =>
    async (dispatch) => {
        try {
            const data = await contactApi.get();
            dispatch(getContactsAction(data.contacts))
        } catch (e) {
            alert(e.message)
        }
    }

export const deleteContacts = (contacts) =>
    async (dispatch) => {
        try {
            await contactApi.remove(contacts);
            contacts.forEach(contactId => {
                dispatch(deleteContactAction(contactId))
            });
        } catch (e) {
            alert(e.message)
        }
    }

export const getContactsByWord = (word) =>
    async (dispatch) => {
        try {
            const contacts = await contactApi.getByWord(word)
            dispatch(getContactsAction(contacts))
        } catch (e) {
            alert(e.message)
        }
    }