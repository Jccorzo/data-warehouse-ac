import { CREATE_CONTACT, DELETE_CONTACT, GET_CONTACTS, UPDATE_CONTACT, SELECT_CONTACT, DELETE_SELECTED_CONTACTS } from "../actions/index";

const contactInitial = {
    contacts: []
}

const contactReducer = (state = contactInitial, { type, contact, contactId, contacts }) => {
    switch (type) {
        case CREATE_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, contact]
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(currentContact => (currentContact._id === contact._id ? contact : currentContact))
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(currentContact => currentContact._id !== contactId)
            }
        case GET_CONTACTS:
            return {
                ...state,
                contacts: contacts
            }
        case SELECT_CONTACT: {
            return {
                ...state,
                contacts: state.contacts.map(contact => (contact._id === contactId ? { ...contact, selected: !contact.selected } : contact))
            }
        }
        default: return state
    }
}

export default contactReducer;