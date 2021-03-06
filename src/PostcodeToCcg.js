
import React, {useState} from 'react';
import Tbl from './Tbl';
import fetchData from './FetchData'

const PostcodeToCcg = () => {

  const [isLoading, setisLoading] = useState(0)
  const [isError, setisError] = useState(0)
  const [apiData, setapiData] = useState(0)
  const [postcodes, setPostcodes] = useState([])

  const handleGoClick = async (e) => {
    e.preventDefault();
    if (postcodes.length < 1) return false; // do nothing if no postcodes entered. Maybe throw an error + display message to user?
    setisLoading(1);
    fetchData('https://api.postcodes.io/postcodes/', postcodes)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Something went wrong ...');
      }
    })
    .then(data => {
      setisLoading(0);
      setapiData(data.result)
    })
    .catch(error => {
      setisLoading(0)
      setisError(error)
    });
  }

  const handleInput = (e) => {
    e.preventDefault();
    let postcodes = e.target.value.split(",")
    setPostcodes(postcodes)
  }

  const clearData = (e) => {
    e.preventDefault();
    setapiData(0);
  }
  const copyToClipboard = (e) => {
    console.log("Copy to clipboard:", e.target.innerText);
    e.preventDefault()

    console.log("supported?: ", document.queryCommandSupported('copy'))
    // Check if copy feature is supported. Requires user to highlight text
    if (document.queryCommandSupported('copy')) {
      document.execCommand("copy", null, e.target.innerText)
    }
    // Check if clipboard API is supported. Allows user to copy text without highlighing it first
    if (navigator.permissions.query({name: "clipboard-write"}).then(result => {
      if (result.state == "granted" || result.state == "prompt") {
        /* write to the clipboard */
        navigator.clipboard.writeText(e.target.innerText).then(() => {
          // success
          console.log("copied")
        }, () => {
          // fail
          console.log("failed to copy")
        })
      }
    }))
    return false;   
  };

  if (isError) {
    console.log(isError);
    return (
      <main>
        <p>There was an error</p>
      </main>
    )
  } else if (isLoading) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    )
  } else if (apiData) {
    return (
      <main>
        <CcgOutput data={apiData} reset={clearData} copy={copyToClipboard}/>
        <Tbl data={apiData} />
      </main>  
    )
  } else {
    return (
      <main>
        <PostcodeInput handleInput={handleInput} handleGoClick={handleGoClick}/>
      </main>      
    )
  }
}

const PostcodeInput = (props) => {
  return (
    <div className="row postcode-input">
      <textarea placeholder="Enter a comma separated list of postcodes e.g. WA1 1AA, L31 1ED..." onChange={(e) => {props.handleInput(e)}} className="d-block column"></textarea>
      <button type="submit" onClick={(e) => {props.handleGoClick(e)}} className="d-block button button-primary column mx-auto">Go!</button>
    </div>
  )
} 

const CcgOutput = (props) => {
  let outputStr = "";
  let inputStr = "";
  // Construct inputStr and outputStr. Optionally add a comma to separate
  props.data.forEach((item) => {
    if (inputStr.length > 0) {
      inputStr += ", "
    }
    inputStr += item.query.toUpperCase()

    if (outputStr.length > 0) {
      outputStr += ", "
    } 
    if (item.result) {
      outputStr += item.result.codes.ccg_id
    } else {
      outputStr += "N/A"
    }
  })
  return (
    <div className="ccg-output">
      <div className="row">
        <div className="one-half column">
          <h6>Postcode:</h6>
            <p onClick={(e) => {props.copy(e)}}>{inputStr}</p>          
        </div>
        <div className="one-half column">
          <h6>CCG:</h6>
          <p onClick={(e) => {props.copy(e)}}>{outputStr}</p>
        </div>
      </div>
      <div className="row">
        <div className="twelve columns">
          <button type="submit" className="button button-primary" onClick={(e) => props.reset(e)}>Reset</button>
        </div>
      </div>
    </div>
  )
}

export default PostcodeToCcg