import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

const Title = () => {
  return (
    <header>
      <h1>Postcodes to CCG</h1>
    </header>
  )
}

const fetchData = async (url, data) => {
  return await fetch(url, { 
      method: "POST", 
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({postcodes: data})
    })
}

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
      console.log(response);
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
    setPostcodes(e.target.value.split(","))
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
  }
  else if (isLoading) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    )
  }
  else if (apiData) {
    return (
      <main>
        <CcgOutput data={apiData} reset={clearData}/>
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

// We want to render a nested list of ccg/postcode info

// loop over each location
// loop over each locations' property
// if property is postcode, nhs_ha, pct, ccg, or ccg id




const Location = (props) => {
  if (props.loc.result && props.loc.query) {
    return (
      <ul>
        <li>Postcode: {props.loc.query}</li>
        <li>CCG: {props.loc.result.ccg ? props.loc.result.ccg : "N/A"}</li>
        <li>CCG Code: {props.loc.result.codes.ccg ? props.loc.result.codes.ccg : "N/A"}</li>
        <li>CCG ID: {props.loc.result.codes.ccg_id ? props.loc.result.codes.ccg_id  : "N/A"}</li>
        <li>PCT: {props.loc.result.primary_care_trust ? props.loc.result.primary_care_trust : "N/A"}</li>
        <li>NHS HA: {props.loc.result.nhs_ha ? props.loc.result.nhs_ha : "N/A"}</li>
      </ul>
    )
  }
  return <p>No info found</p>
}

const CcgOutput = (props) => {
  console.log("props.data: ", props.data)
  return (
    <div>
      <ul>
      { props.data.map((loc, i) => {
        console.log(".loc:", loc);
        return (
        <li key={i}>
          <Location loc={loc} />
        </li>)
      })}
      </ul>
      <button type="submit" onClick={(e) => props.reset(e)}>Reset</button>
    </div>
  )
}

const Footer = () => {
  return (  
    <footer>
      <p>Created by James Anwyl. Data provided by Postcodes.io API</p>
    </footer>
  )
}

function App() {
  return (
    <div className="App"> 
      <Title />
      <PostcodeToCcg />
      <Footer />
    </div>
  );
}

export default App;
