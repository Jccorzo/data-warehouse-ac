import { CREATE_COMPANY, DELETE_COMPANY, GET_COMPANIES, UPDATE_COMPANY } from "../actions";

const companyInitial = {
    companies: []
}

const companyReducer = (state = companyInitial, { type, company, companyId, companies }) => {
    switch (type) {
        case CREATE_COMPANY:
            return {
                ...state,
                companies: [company, ...state.companies]
            }
        case UPDATE_COMPANY:
            return {
                ...state,
                companies: state.companies.map(currentCompany => (currentCompany._id === company._id ? company : currentCompany))
            }
        case DELETE_COMPANY:
            return {
                ...state,
                companies: state.companies.filter(currentCompany => currentCompany._id !== companyId)
            }
        case GET_COMPANIES:
            return {
                ...state,
                companies: companies
            }
        default: return companyInitial
    }
}

export default companyReducer;
