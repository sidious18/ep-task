import { useEffect, useState } from "react"
import DraggableTable from "../components/DraggableTable";
import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { loadAllCompanies } from "../models/company";
import CompanyModal from "../components/CompanyModal";

interface CompaniesScreenProps {
  visible: boolean;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 0.1 },
  {
    field: 'name',
    headerName: 'Company name',
    flex: 0.2,
  },
  {
    field: 'address',
    headerName: 'Address',
    type: 'string',
    flex: 0.25,
  },
  {
    field: 'industry',
    headerName: 'Industry',
    flex: 0.35,
  },
];

const CompaniesScreen = ({ visible }: CompaniesScreenProps)  => {
  const [ companies, setCompanies ] = useState(loadAllCompanies())
  const [ companyIDToShow, setCompanyIDToShow ] = useState<number>();

  const [openCompanyModal, setOpenCompanyModal] = useState(false);
  const handleOpenCompanyModal = () => setOpenCompanyModal(true);
  const handleCloseCompanyModal = () => setOpenCompanyModal(false);

  useEffect(() => {
    const handleAddCompany = () => {
      const last_index = localStorage.getItem('last_company_index')
      const added_company = localStorage.getItem(`company_${last_index}`)
      const vacancies = localStorage.getItem(`company_vacancies_${last_index}`);
      if (added_company && vacancies) {
        setCompanies(companies.concat({...JSON.parse(added_company), vacancies: JSON.parse(vacancies)}))
      }
    };

    document.addEventListener('add_company', handleAddCompany);

    return () => {
      document.removeEventListener('add_company', handleAddCompany);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRowClick = (id: number) => {
    setCompanyIDToShow(id)
    handleOpenCompanyModal();
  }

  return (
    <Box sx={{ display: visible ? 'block' : 'none' }}>
      <DraggableTable data={companies} columns={columns} onRowClick={handleRowClick} />
      <CompanyModal open={openCompanyModal} onClose={handleCloseCompanyModal} companyID={companyIDToShow} />
    </Box>
    
  );
}

export default CompaniesScreen;
