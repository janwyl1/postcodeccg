
import React from 'react';

const Tbl = (props) => {
    return (
      <div className="tbl-wrapper">
        <table className="u-full-width">
          <TblHead />
          <TblBody data={props.data}/>
        </table>
      </div>
    )
  }
  const TblHead = () => {
    return (
      <thead>
        <tr>
          <th>Postcode</th>
          <th>CCG</th>
          <th>PCT</th>
          <th>Health Authority</th>
          <th>CCG Code</th>
          <th>CCG ID</th>
        </tr>
      </thead>
    )
  }
  const TblBody = (props) => {
    return (
      <tbody>
        {props.data.map((loc, i) => {
          if (!loc.result) {
            return false;
          }
          return <TblRow loc={loc} key={i}/>
        })}
      </tbody>
    )
  }
  const TblRow = (props) => {
    return (
      <tr>
        <td>{props.loc.query.toUpperCase()}</td>
        <td>{props.loc.result.ccg}</td>
        <td>{props.loc.result.primary_care_trust}</td>
        <td>{props.loc.result.nhs_ha}</td>
        <td>{props.loc.result.codes.ccg}</td>
        <td>{props.loc.result.codes.ccg_id}</td>
      </tr>
    )
  }
  
  export default Tbl;