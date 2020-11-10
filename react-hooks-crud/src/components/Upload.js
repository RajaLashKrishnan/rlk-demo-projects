import React, { useState } from "react";
import TutorialDataService from "../services/TutorialService";
import CSVReader from 'react-csv-reader';

const Upload = () => {
  const [tutorials, setTutorials] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const renderHead = () => {
    let headerElement = ["title", "description"]
    return headerElement.map((key,index)=> {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }
  const renderBody = () => {
    return tutorials && tutorials.map((row,index)=> {
      console.log("key ",row);
      console.log("index",index);
      return (
        <tr key={index}>
          <td>{row.title}</td>
          <td>{row.description}</td>
        </tr>
      )
    })
  }

  const saveTutorials = () => {
    tutorials.forEach((item, i) => {
      var data = {
        title: item.title,
        description: item.description
      };
      TutorialDataService.create(data)
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
    let tableData = [];
    let row = {id:null,title:"",description:""}
    for (let i=0; i < data.length; i++) {
      row.id = i;
      row.title = data[i][0];
      row.description = data[i][1];

      tableData.push(row);
      // saveTutorial();
    }
    setTutorials(tableData);
    console.log("after set tutorials",tutorials);
  };
  const handleOnError = () => {
    console.log("something bad happened with CSVReader")
  };
  return (
    <div>
      <div>
      <CSVReader
       cssClass="csv-reader-input"
       label="Choose CSV file to upload"
       onFileLoaded={handleReadCsv}
       onError={handleOnError}
       parserOptions={papaparseOptions}
       inputId="ObiWan"
       inputStyle={{color: 'red'}}
     />
      </div>
      <div>
          <table id='tutorials'>
            <thead><tr>{renderHead()}</tr></thead>
            <tbody>
              {renderBody()}
            </tbody>
          </table>
      </div>
      <button onClick={saveTutorials} className="btn btn-success">
        Submit
      </button>
    </div>
  )
};

export default Upload;
