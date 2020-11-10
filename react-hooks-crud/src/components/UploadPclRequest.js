import React, { useState } from "react";
import PclRequestDataService from "../services/PclRequestService";
import CSVReader from 'react-csv-reader';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';



const Upload = () => {
  const [pclrequests, setPclRequests] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [requestType, setRequestType] = useState("");

  const renderHead = () => {
    let headerElement = ["RequestType","EntityId", "ChangeValue"]
    return headerElement.map((key,index)=> {
      return <th key={index}>{key}</th>
    })
  }
  const renderBody = () => {
    return pclrequests && pclrequests.map((row,index)=> {
      console.log("renderBody")
      console.log("key ",row);
      console.log("index",index);
      return (
        <tr key={index}>
          <td>{row.requestType}</td>
          <td>{row.entity}</td>
          <td>{row.changeValue}</td>
        </tr>
      )
    })
  }

  const savePclRequests = () => {
    pclrequests.forEach((item, i) => {
      var data = {
        requestType: requestType,
        targetEntityType: "",
        targetEntityId: item.entity,
        changeAttribute: "",
        changeValue: item.changeValue,
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
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    });
  };
  const papaparseOptions = {
    header: false,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header =>
      header
        .toLowerCase()
        .replace(/\W/g, '_')
  };
  const handleReadCsv = data => {
    console.log("data ->", data);
    let tableData = [];
    let reqType = requestType;

    for (let i=0; i < data.length; i++) {
      let row = { requestType: reqType, entity: data[i][0], changeValue:data[i][1] };
      tableData.push(row);
      // savePclRequest();
    }
    console.log("table data", tableData);
    setPclRequests(tableData);
    console.log("after set pclrequests",pclrequests);
  };
  const handleOnError = () => {
    console.log("something bad happened with CSVReader")
  };
  const newPclRequest = () => {
    setPclRequests([]);
    setSubmitted(false);
  };
  const handleChoiceChange = event => {
    const { name, value } = event.target;
    setRequestType(value);
  };


  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <Button className="btn btn-success" onClick={newPclRequest}>
            Upload More Files
          </Button>
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
          <CSVReader
           cssClass="csv-reader-input"
           label="Choose CSV file to upload"
           onFileLoaded={handleReadCsv}
           onError={handleOnError}
           parserOptions={papaparseOptions}
           inputId="ObiWan"
           inputStyle={{color: 'red'}}
         />
          <Table striped bordered hover size="sm" variant="dark">
            <thead><tr>{renderHead()}</tr></thead>
            <tbody>
              {renderBody()}
            </tbody>
          </Table>
          <button onClick={savePclRequests} className="btn btn-success">
            Submit
          </button>
        </div>

      )}
    </div>
  )
};

export default Upload;
