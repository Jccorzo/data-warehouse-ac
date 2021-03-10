import { CREATE_COMPANY, DELETE_COMPANY, GET_COMPANIES, UPDATE_COMPANY } from "../actions/index";

const companyInitial = {
    companies: []
}

const companyReducer = (state = companyInitial, { type, company, companyId, companies }) => {
    switch (type) {
        case CREATE_COMPANY:
            return {
                ...state,
                companies: [...state.companies, company]
            }
        case UPDATE_COMPANY:
            return {
                ...state,
                companies: state.companies.map(currentCompany => (currentCompany._id === company._id ? company : currentCompany))
            }
        case DELETE_COMPANY:
            console.log(state.companies.filter(currentCompany => currentCompany._id !== companyId))
            return {
                ...state,
                companies: state.companies.filter(currentCompany => currentCompany._id !== companyId)
            }
        case GET_COMPANIES:
            return {
                ...state,
                companies: companies
            }
        default: return state
    }
}

export default companyReducer;
