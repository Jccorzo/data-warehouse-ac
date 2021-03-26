import { CREATE_CONTACT, DELETE_CONTACT, GET_CONTACTS, UPDATE_CONTACT, SELECT_CONTACT } from '.';
import * as contactApi from '../api/contact';

const createContactAction = (contact) => ({ type: CREATE_CONTACT, contact })
const updateContactAction = (contact) => ({ type: UPDATE_CONTACT, contact })
const deleteContactAction = (contactId) => ({ type: DELETE_CONTACT, contactId })

export const selectContact = (contactId, selected) => ({ type: SELECT_CONTACT, contactId, selected })
export const getContactsAction = (contacts) => ({ type: GET_CONTACTS, contacts })

export const selectAllContacts = (contacts, selected) =>
    dispatch => {
        contacts.forEach((contactId) => {
            dispatch(selectContact(contactId, selected))
        })
    }

export const createContact = (contact) =>
    async (dispatch) => {
        try {
            const newContact = await contactApi.create(contact);
            dispatch(createContactAction({ ...newContact, selected: false }))
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

export const deleteContactById = (contactId) =>
    async (dispatch) => {
        try {
            await contactApi.deleteContactById(contactId);
            dispatch(deleteContactAction(contactId))
        } catch (e) {
            alert(e.message)
        }
    }

export const deleteSelectedContacts = (contacts) =>
    async (dispatch) => {
        try {
            await contactApi.deleteSelectedContacts(contacts);
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
            const data = await contactApi.getByWord(word)
            dispatch(getContactsAction(data.contacts.map(contact => ({ ...contact, selected: false }))))
        } catch (e) {
            alert(e.message)
        }
    }