import React, { useState, useCallback } from "react";
import ApartmentsQueries from "components/admin/apartments/ApartmentsQueries";
import { useQuery, queryCache } from "react-query";
import { useHistory } from "react-router-dom";
import { BsTrashFill, BsPencilSquare, BsPlusCircle } from "react-icons/bs";
import Loading from "app/layout/Loading";
import styles from "components/admin/admin.module.css";
import Table from "app/common/table/Table";
import TableSearch from "app/common/table/TableSearch";

interface IProps {
  entity: any;
  page: number;
  setPage: any;
  rows: number;
  setRows: any;
  setSort: any;
  setFilter: any;
  memoizedCallback: any;
  data: any;
  isFetching: boolean;
  status: any;
}

const ApartmentsList: React.FC<IProps> = ({
  entity,
  page,
  setPage,
  rows,
  setRows,
  setSort,
  setFilter,
  memoizedCallback,
  data,
  isFetching,
  status,
}) => {
  const history = useHistory();
  const columns = [
    {
      dataField: "position",
      text: "A/A",
      sort: true,
    },
    {
      dataField: "title",
      text: "Διαμέρισμα",
      sort: true,
    },
    {
      dataField: "owner",
      text: "Αριθμός",
      sort: true,
      formatter: (cell: any, row: any) => (
        <div>
          {row.owner?.lastName || ""} {row.owner?.firstName || ""}
        </div>
      ),
    },
    {
      dataField: "resident",
      text: "Ένοικος",
      sort: true,
      formatter: (cell: any, row: any) => (
        <div>
          {row.resident?.lastName || ""} {row.resident?.firstName || ""}
        </div>
      ),
    },
    {
      dataField: "Actions",
      text: "Ενέργειες",
      align: "center",
      headerFormatter: (column: any, colIndex: any) => {
        return (
          <div style={{ textAlign: "center" }}>
            <button
              type="button"
              className="btn btn-link"
              style={{ color: "green" }}
              onClick={() => history.push(`/${entity}/new`)}
            >
              <BsPlusCircle />
            </button>
          </div>
        );
      },

      formatter: (cell: any, row: any) => (
        <React.Fragment>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => history.push(`/${entity}/${row.id}`)}
          >
            <BsPencilSquare />
          </button>
          <button
            type="button"
            className="btn btn-link"
            style={{ color: "red" }}
            onClick={() => memoizedCallback(row.id)}
          >
            <BsTrashFill />
          </button>
        </React.Fragment>
      ),
    },
  ];

  const filterFn = (value: any) => {
    return {
      $or: [
        { "resident.lastName": { $regex: `${value}`, $options: "i" } }, //NEED FIX DO NOT FILTER
        {
          position: {
            $regex: `${value}`,
            $options: "i",
          },
        },
        { title: { $regex: `${value}`, $options: "i" } },
      ],
    };
  };

  const onSearch = (event: any) => {
    event.preventDefault();
    const values = event.target.elements.search.value;
    if (values) {
      setFilter(filterFn(values));
    } else {
      setFilter({});
    }
  };

  const onTableChange = (
    type: any,
    { page, sizePerPage, sortField, sortOrder }: any
  ): void => {
    // setTotal(data.count);
    setPage(page);
    setRows(sizePerPage);
    if (!sortField || !sortOrder) {
      sortField = "id";
      sortOrder = "asc";
    }
    return setSort([sortField, sortOrder === "asc" ? "ASC" : "DESC"]);
  };
  const renderShowsTotal = (from: any, to: any, size: any) => {
    return (
      <span className="react-bootstrap-table-pagination-total">
        Διαμερίσματα {from} έως {to} απο {size}
      </span>
    );
  };
  var options;
  if (Object.keys(data.data).length === 0) {
    options = {
      hideSizePerPage: true,
      hidePageListOnlyOnePage: true,
    };
  } else {
    options = {
      page: page,
      sizePerPage: rows,
      totalSize: data.count,
      showTotal: true,
      paginationTotalRenderer: renderShowsTotal,
      sizePerPageList: [
        {
          text: "5",
          value: 5,
        },
        {
          text: "10",
          value: 10,
        },
        {
          text: "30",
          value: 30,
        },
        {
          text: "50",
          value: 50,
        },

        {
          text: "All",
          value: data.count,
        },
      ],
    };
  }

  return (
    <React.Fragment>
      <TableSearch onSearch={onSearch} />
      {isFetching || status === "loading" ? <Loading /> : null}
      <Table
        data={data.data}
        columns={columns}
        onTableChange={onTableChange}
        options={options}
      />
    </React.Fragment>
  );
};

export default ApartmentsList;
