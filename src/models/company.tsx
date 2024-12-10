export type Company = {
  id?: number
  name: string
  industry: string
  address: string
}

export const getCompanyVacancies = (id: number) => {
  const company = JSON.parse(localStorage.getItem(`company_${id}`) as string);
  const vacancies = JSON.parse(localStorage.getItem(`company_vacancies_${id}`) as string);
  return {
    ...company,
    vacancies,
  }
}

export const loadAllCompanies = (): Company[] => {
  const companies: Company[] = [];
  let id = 0;

  while (true) {
    const companyData = localStorage.getItem(`company_${id}`);
    if (!companyData) {
      localStorage.setItem('last_company_index', `${id - 1}`);
      break;
    }

    const company = getCompanyVacancies(id);
    companies.push(company);

    id++;
  }

  return companies;
};

export const addCompany = (company: Company) => {
  const newIndex = (Number(localStorage.getItem('last_company_index')) || 0) + 1;
  localStorage.setItem(`company_${newIndex}`, JSON.stringify({id: newIndex, ...company}));
  localStorage.setItem('last_company_index', `${newIndex}`);
}