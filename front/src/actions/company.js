import { CREATE_COMPANY, DELETE_COMPANY, GET_COMPANIES, UPDATE_COMPANY } from '.';
import * as companyApi from '../api/company';

const createCompanyAction = (company) => ({ type: CREATE_COMPANY, company })
const updateCompanyAction = (company) => ({ type: UPDATE_COMPANY, company })
const deleteCompanyAction = (companyId) => ({ type: DELETE_COMPANY, companyId })
const getCompaniesAction = (companies) => ({ type: GET_COMPANIES, companies })
export const createCompany = (company) =>
    async (dispatch) => {
        try {
            const newCompany = await companyApi.create(company);
            dispatch(createCompanyAction(newCompany))
        } catch (e) {
            alert(e.message)
        }
    }

export const updateCompany = (company) =>
    async (dispatch) => {
        try {
            await companyApi.update(company);
            dispatch(updateCompanyAction(company))
        } catch (e) {
            alert(e.message)
        }
    }

export const getCompanies = () =>
    async (dispatch) => {
        try {
            const companies = await companyApi.get();
            dispatch(getCompaniesAction(companies))
        } catch (e) {
            alert(e.message)
        }
    }

export const deleteCompany = (companyId) =>
    async (dispatch) => {
        try {
            await companyApi.remove(companyId);
            dispatch(deleteCompanyAction(companyId))
        } catch (e) {
            alert(e.message)
        }
    }

