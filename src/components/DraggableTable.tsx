import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { Paper } from '@mui/material'

interface DraggableTableProps {
  columns: GridColDef[]
  data: any[]
  onRowClick: (id: number) => void
}

const DraggableTable = ({ columns, data, onRowClick }: DraggableTableProps) => {

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <Paper sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20, 30, 40, 50]}
        sx={{ border: 0 }}
        onRowClick={(params) => { onRowClick(+params.id) }}
        rowSelection={false}
      />
    </Paper>
  );
}

export default DraggableTable
