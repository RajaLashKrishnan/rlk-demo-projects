import React, { useState } from "react";
import PclRequestDataService from "../services/PclRequestService";

const AddPclRequest = () => {
  const initialPclRequestState = {
    requestType: "",
    targetEntityType: "",
    targetEntityId: "",
    changeAttribute: "",
    changeValue: "",
    status: "",
    message: ""
  };

  const [pclrequest, setPclRequest] = useState(initialPclRequestState);
  const [submitted, setSubmitted] = useState(false);
  const [indcShift, setIndcShift] = useState(true);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPclRequest({ ...pclrequest, [name]: value });
  };
  const handleChoiceChange = event => {
    const { name, value } = event.target;
    setPclRequest({ ...pclrequest, [name]: value });
    if (value == "InDC Shift") { setIndcShift(true) } else { setIndcShift(false) }
  };

  const savePclRequest = () => {
    var data = {
      requestType: pclrequest.requestType,
      targetEntityType: "",
      targetEntityId: pclrequest.targetEntityId,
      changeAttribute: "",
      changeValue: pclrequest.changeValue,
      status: "submitted",
      message: "Your request will be processed soon"
    };
    if (data.requestType === "InDC Shift") {
      data.targetEntityType = "PuchaseOrder";
      data.changeAttribute = "InDC Date";
    } else {
      data.targetEntityType = "CP Receipt";
      data.changeAttribute = "Units";

    }

    PclRequestDataService.create(data)
      .then(response => {
        setPclRequest({
          requestType: response.data.requestType,
          targetEntityType: response.data.targetEntityType,
          targetEntityId: response.data.targetEntityId,
          changeAttribute: response.data.changeAttribute,
          changeValue: response.data.changeValue,
          status: response.data.status,
          message: response.data.message
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newPclRequest = () => {
    setPclRequest(initialPclRequestState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newPclRequest}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="requestType">Request</label>
            <div className="inputCls">
            <label>
                <input
                  type="radio"
                  className="form-control"
                  id="requestType-indcShift"
                  required
                  value="InDC Shift"
                  onChange={handleChoiceChange}
                  name="requestType"
                />
                InDC Shift      |
           </label>
           <label>
                <input
                  type="radio"
                  className="form-control"
                  id="requestType-CapacitySplit"
                  required
                  value="Capacity Split"
                  onChange={handleChoiceChange}
                  name="requestType"
                />
                CapacitySplit
            </label>
            </div>
          </div>
            {indcShift ? (
              <div className="form-group">
                <label htmlFor="requestType">PurchaseOrder Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="targetEntityId"
                  required
                  value={pclrequest.targetEntityId}
                  onChange={handleInputChange}
                  name="targetEntityId"
                />
              </div>
            ) : (
              <div className="form-group">
                <label htmlFor="requestType">CP ReceiptId</label>
                <input
                  type="text"
                  className="form-control"
                  id="targetEntityId"
                  required
                  value={pclrequest.targetEntityId}
                  onChange={handleInputChange}
                  name="targetEntityId"
                />
              </div>
            )}
            {indcShift ? (
              <div className="form-group">
                <label htmlFor="requestType">InDc Date</label>
                <input
                  type="text"
                  className="form-control"
                  id="changeValue"
                  required
                  value={pclrequest.changeValue}
                  onChange={handleInputChange}
                  name="changeValue"
                />
              </div>
            ) : (
              <div className="form-group">
                <label htmlFor="requestType">CP Units</label>
                <input
                  type="text"
                  className="form-control"
                  id="changeValue"
                  required
                  value={pclrequest.changeValue}
                  onChange={handleInputChange}
                  name="changeValue"
                />
              </div>
            )}

          <button onClick={savePclRequest} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddPclRequest;
