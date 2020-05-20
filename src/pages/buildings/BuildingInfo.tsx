import React, {useState, useRef} from "react";

export const BuildingInfo: React.FC = () => {
    const [name, setName] = useState("ΑΓ. ΦΑΝΟΥΡΙΟΥ 15A Παγκράτι")


    const inputRef = useRef<any>();

    
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event:any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
      };

  return (
    <React.Fragment>
        <h1>Πληροφορίες Κτηρίου</h1>
      <form className="needs-validation" noValidate onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="col-md-4 mb-3">
            <label>Στοιχεία Κτηρίου</label>
            <input
              type="text"
              className="form-control"
            //   id="validationTooltip01"
              placeholder="Στοιχεία Κτηρίου..."
              ref={inputRef}
              value={name}
              required
            />
            <div className="valid-tooltip">Looks good!</div>
          </div>
          <div className="col-md-4 mb-3">
            <label >Στοιχεία Διαχειριστή</label>
            <input
              type="text"
              className="form-control"
              id="validationTooltip02"
              placeholder="Στοιχεία Διαχειριστή..."
              value="Βαγγέλης Χαυλής"
              required
            />
            <div className="valid-tooltip">Looks good!</div>
          </div>
          <div className="col-md-4 mb-3">
            <label /*for="validationTooltipUsername"*/>Username</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="validationTooltipUsernamePrepend"
                >
                  @
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                id="validationTooltipUsername"
                placeholder="Username"
                aria-describedby="validationTooltipUsernamePrepend"
                required
              />
              <div className="invalid-tooltip">
                Please choose a unique and valid username.
              </div>
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-6 mb-3">
            <label /*for="validationTooltip03"*/>City</label>
            <input
              type="text"
              className="form-control"
              id="validationTooltip03"
              placeholder="City"
              required
            />
            <div className="invalid-tooltip">Please provide a valid city.</div>
          </div>
          <div className="col-md-3 mb-3">
            <label /*for="validationTooltip04"*/>State</label>
            <input
              type="text"
              className="form-control"
              id="validationTooltip04"
              placeholder="State"
              required
            />
            <div className="invalid-tooltip">Please provide a valid state.</div>
          </div>
          <div className="col-md-3 mb-3">
            <label /*for="validationTooltip05"*/>Zip</label>
            <input
              type="text"
              className="form-control"
              id="validationTooltip05"
              placeholder="Zip"
              required
            />
            <div className="invalid-tooltip">Please provide a valid zip.</div>
          </div>
        </div>
        <button className="btn btn-primary" type="submit">
          Submit form
        </button>
      </form>
    </React.Fragment>
  );
};
