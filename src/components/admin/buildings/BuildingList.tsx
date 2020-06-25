import React, { useState, useCallback } from "react";
import BuildingQueries from "components/admin/buildings/BuildingQueries";
import { useQuery, queryCache } from "react-query";
import { useHistory } from "react-router-dom";
import { BsTrashFill, BsPencilSquare, BsPlusCircle } from "react-icons/bs";
import Loading from "app/layout/Loading";
import Table from "app/common/table/Table";
import TableSearch from "app/common/table/TableSearch";
import styles from "components/admin/admin.module.css";
const entity = "buildings";

const BuildingList = () => {
  const history = useHistory();
  const { fetchBuildings, deleteBuilding } = BuildingQueries();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  // const [total, setTotal] = useState(0);
  const [sort, setSort] = useState(["id", "ASC"]);
  const [filter, setFilter] = useState({});

  const columns = [
    {
      dataField: "address.area",
      text: "Περιοχή",
      sort: true,
    },
    {
      dataField: "address.street",
      text: "Οδός",
      sort: true,
    },
    {
      dataField: "address.streetNumber",
      text: "Αριθμός",
      sort: true,
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

  const { status, data, isFetching } = useQuery<
    any,
    [string, number, number, string[], {}]
  >([entity, page, rows, sort, filter], fetchBuildings);
  console.log(data);
  const memoizedCallback = useCallback(
    async (id: string) => {
      await deleteBuilding(id);
      queryCache.refetchQueries([entity, page, rows, filter]);
    },
    [page, rows, filter, deleteBuilding]
  );

  const filterFn = (value: any) => {
    return {
      $or: [
        { "address.street": { $regex: `${value}`, $options: "i" } },
        {
          "address.streetnumber": {
            $regex: `${value}`,
            $options: "i",
          },
        },
        { "address.area": { $regex: `${value}`, $options: "i" } },
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
        Showing {from} to {to} of {size} Results
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
      totalSize: data.count, //ΠΡΕΠΕΙ ΝΑ ΜΟΥ ΣΤΕΙΛΕΙΣ ΑΠΟ ΤΟ BACKEND ΠΟΣΑ ΕΙΝΑΙ ΓΙΑ ΝΑ ΔΟΥΛΕΨΕΙ ΤΟ PAGINATION
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

export default BuildingList;
