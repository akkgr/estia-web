import React from "react";
import { Link } from "react-router-dom";
import "./layout.css";
const NotFound = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="error-template">
            <h1>Oops!</h1>
            <h2>404 Δεν βρέθηκε η σελίδα</h2>
            <div className="error-details">
              Σόρρυ,Εντοπίστηκε σφάλμα,Η σελίδα δεν βρέθηκε!
            </div>
            <div className="error-actions">
              <Link to="/" className="btn btn-primary btn-lg">
                <span className="glyphicon glyphicon-home"></span>
                Κεντρική σελίδα{" "}
              </Link>
              <Link to="/dashboard" className="btn btn-danger btn-lg">
                <span className="glyphicon glyphicon-envelope"></span>{" "}
                Επικοινωνήστε με την Υποστήριξη{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
