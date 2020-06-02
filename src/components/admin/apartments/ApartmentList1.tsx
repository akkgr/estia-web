import React, { useState, SyntheticEvent, useCallback } from "react";
import BuildingQueries from "../buildings/BuildingQueries";
import { useQuery, queryCache } from "react-query";
import { useHistory } from "react-router-dom";
import { BsTrashFill, BsPencilSquare, BsPlusCircle } from "react-icons/bs";
import Loading from "../../../app/layout/Loading";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "../buildings/buildings.css";
const ApartmentList1 = (props: any) => {
  const history = useHistory();
  const { fetchBuildings, deleteBuildings } = BuildingQueries();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState(["id", "ASC"]);
  const [filter, setFilter] = useState({});
  const entity = "buildings/" + props.data.id + "/apartments";

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
  const memoizedCallback = useCallback(
    async (id: string) => {
      await deleteBuildings(id);
      queryCache.refetchQueries([entity, page, rows, filter]);
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

  const { status, data, isFetching } = useQuery<
    any,
    [string, number, number, string[], {}]
  >([entity, page, rows, sort, filter], fetchBuildings);

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

  const options = {
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

  return (
    <React.Fragment>
      <div className="container">
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
        noDataIndication={() => "Ο πίνακας είναι άδειος"}
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

export default ApartmentList1;
