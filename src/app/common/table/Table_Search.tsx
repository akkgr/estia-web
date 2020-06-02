import React from 'react'

interface Iprops{
    onSearch:any;
}


const Table_Search:React.FC<Iprops>=({onSearch})=> {
    return (
        <React.Fragment>
        <nav>
          <ol className="breadcrumb" style={{ padding: "6px 15px" }}>
            <li className="breadcrumb-item active" aria-current="page">
              Κτίρια
            </li>
          </ol>
        </nav>
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
        </React.Fragment>
    )
}

export default Table_Search
