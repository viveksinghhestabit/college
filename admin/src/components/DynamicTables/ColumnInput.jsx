import React from 'react';

const ColumnInput = ({ data, index, handleColumnChange }) => {
  return (
    <>
      <div className='addEmployee-alignRow d-flex mt-4 align-items-center gap-3'>


        <div className='addEmployee-inputFieldDiv mt-0'>
          <label className='addEmployee-inputLabel'>Column {index + 1} </label>
          <input
            type='text'
            value={data?.name}
            name='name'
            placeholder='Name'
            onChange={(e) => handleColumnChange(e, index)}
            // value={TableData?.noOfColumns}
            className='addEmployee-inputField'
          // onChange={handleChange}
          />
        </div>
        <div className='addEmployee-inputFieldDiv mt-0'>
          <label className='addEmployee-inputLabel'>Sequence </label>
          <input
            type='number'
            value={data?.sequence}
            name='sequence'
            placeholder='Sequence'
            // value={TableData?.noOfColumns}
            onChange={(e) => handleColumnChange(e, index)}
            className='addEmployee-inputField'
          // onChange={handleChange}

          />
        </div>
        {/* <div className='addEmployee-inputFieldDiv mt-0'>
          <label className='addEmployee-inputLabel'>type </label>
          <select className='addArtist-selectField' name="type" id="" onChange={(e) => handleColumnChange(e, index)}>
            <option selected>{!!data?.type ? data?.type : 'Select a type'}</option>
            <option value="number">Number</option>
            <option value="text">Text</option>
            <option value="text">Email</option>
            <option value="date">Date</option>
          </select>
        </div> */}
      </div>
    </>
  );
}

export default ColumnInput;
