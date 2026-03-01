import React from 'react';
import { useParams } from 'react-router';

const RowInput = ({ data, id, handleRowChange, TableData, param, removeRow }) => {
  const noOfFields = Object.keys(data)
  const values = Object.values(data)

  return (
    <>
      <div className='addEmployee-alignRow d-flex mt-4 align-items-center gap-3'>
        {
          noOfFields?.map((item, index) => {
            return <div className='addEmployee-inputFieldDiv mt-0'>
              <label className='addEmployee-inputLabel'>Row {id + 1} </label>
              <input
                type={TableData?.columns?.filter((item, i) => i === index)[0].type}
                value={!!param ? values?.filter((item, i) => i === index)[0] : data.name}
                name={item}
                placeholder={item}
                onChange={(e) => handleRowChange(e, id)}
                // value={TableData?.noOfColumns}
                className='addEmployee-inputField'
              // onChange={handleChange}
              />
            </div>


          })
        }

        <button onClick={(e) => removeRow(e, id)}>X</button>
      </div>
    </>
  );
}

export default RowInput;
