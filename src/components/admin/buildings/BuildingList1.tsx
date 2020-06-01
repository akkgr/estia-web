import React, { useState, SyntheticEvent, useCallback } from "react";
import BuildingQueries from "components/admin/buildings/BuildingQueries";
import { useQuery, queryCache } from "react-query";
import { useHistory } from "react-router-dom";
import { BsTrashFill, BsPencilSquare, BsPlusCircle } from "react-icons/bs";
import Loading from "app/layout/Loading";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "./buildings.css";
const entity = "buildings";

const BuildingList1 = () => {
  const history = useHistory();
  const { fetchBuildings, deleteBuildings } = BuildingQueries();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [total, setTotal] = useState(0);
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
      dataField: "address.streetnumber",
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
            onClick={()=>history.push(`/${entity}/${row.id}`)}
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

  const memoizedCallback = useCallback(
    async (id: string) => {
      await deleteBuildings(id);
      queryCache.refetchQueries( [entity, page, rows, filter]);
    },
    [entity, page, rows, filter]
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
    setTotal(data.count);
    setPage(page);
    setRows(sizePerPage);
    if (!sortField || !sortOrder) {
      sortField = "id";
      sortOrder = "asc";
    }
    return setSort([sortField, sortOrder === "asc" ? "ASC" : "DESC"]);
  };

  const options={
    page: page,
    sizePerPage: rows,
    totalSize: data.count, //ΠΡΕΠΕΙ ΝΑ ΜΟΥ ΣΤΕΙΛΕΙΣ ΑΠΟ ΤΟ BACKEND ΠΟΣΑ ΕΙΝΑΙ ΓΙΑ ΝΑ ΔΟΥΛΕΨΕΙ ΤΟ PAGINATION
    showTotal: true,
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
          },    {
            text: "50",
            value: 50,
          },
          
          {
            text: "All",
            value: data.count,
          }
        ]
  }

  return (
    <React.Fragment>
            <nav>
        <ol className="breadcrumb" style={{ padding: "6px 15px" }}>
          <li className="breadcrumb-item active" aria-current="page">
            Κτίρια
          </li>
        </ol>
      </nav>
      <div className="container" >
        <div className="row">
          <div className="col">
            <form className="form" onSubmit={onSearch}>
              <div className="input-group flex-fill">
                <input
                  type="text"
                  className="form-control"
                  name="search"
                  placeholder="search.."
                />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-outline-primary">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isFetching || status === "loading" ? <Loading /> : null}
      <BootstrapTable
        bootstrap4
        striped
        bordered={true}
        data={data.data}
        noDataIndication={()=>"Ο πίνακας είναι άδειος"}
        keyField="id"
        defaultSortDirection="asc"
        remote={true}
        columns={columns}
        onTableChange={onTableChange}
        pagination={paginationFactory(options)}
        wrapperClasses="table-responsive"
      />
    </React.Fragment>
  );
};

export default BuildingList1;
