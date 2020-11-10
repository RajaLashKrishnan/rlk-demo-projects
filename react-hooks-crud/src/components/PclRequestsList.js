import React, { useState, useEffect } from "react";
import PclRequestDataService from "../services/PclRequestService";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


const PclRequestsList = () => {
  const [pclrequests, setPclRequests] = useState([]);
  const [currentPclRequest, setCurrentPclRequest] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrievePclRequests();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrievePclRequests = () => {
    PclRequestDataService.getAll()
      .then(response => {
        setPclRequests(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrievePclRequests();
    setCurrentPclRequest(null);
    setCurrentIndex(-1);
  };

  const setActivePclRequest = (pclrequest, index) => {
    setCurrentPclRequest(pclrequest);
    setCurrentIndex(index);
  };

  const removeAllPclRequests = () => {
    PclRequestDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    PclRequestDataService.findByTitle(searchTitle)
      .then(response => {
        setPclRequests(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const renderHead = () => {
    let headerElement = ["Request", "Entity", "EntityId", "FieldName", "Change Value", "Status", "Message", "createdAt", "updatedAt"]
    return headerElement.map((key,index)=> {
      return <th key={index}>{key}</th>
    })
  }
  const renderBody = () => {
    return pclrequests && pclrequests.map((row,index)=> {
      console.log("key ",row);
      console.log("index",index);
      return (
        <tr key={index}>
          <td>{row.requestType}</td>
          <td>{row.targetEntityType}</td>
          <td>{row.targetEntityId}</td>
          <td>{row.changeAttribute}</td>
          <td>{row.changeValue}</td>
          <td>{row.status}</td>
          <td>{row.message}</td>
          <td>{row.createdAt}</td>
          <td>{row.updatedAt}</td>
        </tr>
      )
    })
  }

  return (
    <div>
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by RequestType"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-sm-12">
        <h4>PclRequests List</h4>

        <div>
            <Table striped bordered hover size="sm" variant="dark">
              <thead><tr>{renderHead()}</tr></thead>
              <tbody>
                {renderBody()}
              </tbody>
            </Table>
        </div>
        <Button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllPclRequests}
        >
          Remove All
        </Button>
      </div>
    </div>
  );
};

export default PclRequestsList;
