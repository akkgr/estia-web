import React from 'react'
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import 'app/common/table/table.css';
interface TableParams{
    columns:any;
    data: any[];
    onTableChange:any;
    options:{}
}

 const Table:React.FC<TableParams>=({columns,data,onTableChange,options})=> {
    return (
        <BootstrapTable
        bootstrap4
        striped
        bordered={true}
        data={data}
        noDataIndication={() => "Ο πίνακας είναι άδειος"}
        keyField="id"
        defaultSortDirection="asc"
        remote={true}
        columns={columns}
        onTableChange={onTableChange}
        pagination={paginationFactory(options)}
        wrapperClasses="table-responsive"
      />
    )
}

export default Table
