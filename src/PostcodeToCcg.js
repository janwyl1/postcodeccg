
import React, {useState} from 'react';
import Tbl from './Tbl';
import fetchData from './FetchData'


const PostcodeToCcg = () => {

  const [isLoading, setisLoading] = useState(0)
  const [isError, setisError] = useState(0)
  const [apiData, setapiData] = useState(0)
  const [postcodes, setPostcodes] = useState([""])

  const handleGoClick = async (e) => {
    e.preventDefault();
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

  if (isError) {
    console.log(isError);
    return (
      <main>
        There was an error
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
        <CcgOutput data={apiData} reset={clearData}/>
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
    <div>
      <textarea placeholder="Enter a comma separated list of postcodes e.g. WA1 1AA, L31 1ED..." onChange={(e) => {props.handleInput(e)}}></textarea>
      <button type="submit" onClick={(e) => {props.handleGoClick(e)}}>Go!</button>
    </div>
  )
} 

const CcgOutput = (props) => {
  console.log("props.data: ", props.data)
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
    <div>
      <h4>Postcode:</h4>
      <p>{inputStr}</p>
      <h4>CCG:</h4>
      <p>{outputStr}</p>
      <button type="submit" onClick={(e) => props.reset(e)}>Reset</button>
    </div>
  )
}

export default PostcodeToCcg