import React, { useState, useEffect } from "react";
import "react-phone-number-input/style.css";
import "../../styles/AddEmployeeForm.css";
import { useHistory, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import {
  PostDyanmicTable,
  getDyanmicTableById,
  updateDyanmicTable,
} from "../../redux/api";
import LoadingPage from "../utils/LoadingPage";
import LoadingComponent from "../utils/LoadingButton";
import ColumnInput from "./ColumnInput";
import RowInput from "./RowInput";

const AddDynamicTable = () => {
  const { id, tableid } = useParams();
  const initialData = {
    tableName: "",
    collegeid: id,
    description: "",
    noOfColumns: "",
    noOfRows: "",
    columns: [],
    rows: [],
  };
  const [TableData, setTableData] = useState(initialData);
  const [LoadingUi, setLoadingUi] = useState(false);
  const [LoadingButton, setLoadingButton] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    const { name } = e.target;
    setTableData({ ...TableData, [name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setLoadingButton(true);
      await PostDyanmicTable(TableData);
      history.push(`/colleges/${id}/table`);
      setLoadingButton(false);
    } catch (error) {
      setLoadingButton(false);
    }
  };

  useEffect(() => {
    blogById();
  }, []);

  const blogById = async () => {
    try {
      setLoadingUi(true);
      const response = await getDyanmicTableById(tableid);
      setTableData(response?.data?.data);
      setLoadingUi(false);
    } catch (error) {
      setLoadingUi(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoadingButton(true);
      const payload = { ...TableData, collegeId: id, tableId: TableData?._id };

      await updateDyanmicTable(payload);
      history.push(`/colleges/${id}/table`);
      setLoadingButton(false);
    } catch (error) {
      setLoadingButton(false);
    }
  };
  const addColumns = () => {
    const initialColumns = Array.from(
      { length: TableData?.noOfColumns },
      () => ({ name: "", sequence: "", type: "" })
    );
    setTableData({ ...TableData, columns: initialColumns });
  };
  const addRows = () => {
    const initialObject = {};
    const row = TableData?.columns?.map((item) => {
      initialObject[item.name] = "";
    });

    setTableData({ ...TableData, rows: [...TableData?.rows, initialObject] });
  };

  const removeRow = (e, index) => {
    e.preventDefault();
    let data = [...TableData?.rows];
    data.splice(index, 1);
    setTableData({ ...TableData, rows: data });
  };
  const handleColumnChange = (e, columnIndex) => {
    const { name, value } = e.target;
    const updatedColumns = [...TableData?.columns];
    updatedColumns[columnIndex][name] = value;
    setTableData({ ...TableData, columns: updatedColumns });
  };

  const handleRowChange = (e, columnIndex) => {
    const { name, value } = e.target;
    const updatedColumns = [...TableData?.rows];
    updatedColumns[columnIndex][name] = value;
    setTableData({ ...TableData, rows: updatedColumns });
  };

  return (
    <div className="addEmployee-container">
      {LoadingUi ? (
        <LoadingPage />
      ) : (
        <div className="addEmployee-personalDetails">
          <div className="addEmployee-alignRow">
            <div className="addEmployee-inputFieldDiv">
              <label className="addEmployee-inputLabel">Table Name </label>
              <input
                type="text"
                name="tableName"
                placeholder="Table Name"
                value={TableData?.tableName}
                className="addEmployee-inputField"
                onChange={handleChange}
              />
            </div>

            <div className="addEmployee-inputFieldDiv">
              <label className="addEmployee-inputLabel ">Description </label>
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={TableData?.description}
                className="addEmployee-inputField"
                onChange={handleChange}
              />
            </div>
          </div>

          <h5 className="mt-4" style={{ fontWeight: "800" }}>
            Columns
          </h5>
          <div className="addEmployee-alignRow d-flex mt-4 align-items-center">
            <div className="addEmployee-inputFieldDiv mt-0">
              <label className="addEmployee-inputLabel">No of Columns </label>
              <input
                type="number"
                name="noOfColumns"
                placeholder="No Of Columns"
                value={TableData?.noOfColumns}
                className="addEmployee-inputField"
                onChange={handleChange}
              />
            </div>
            <button
              className="addEmployee-submitDetailBtn w-25"
              onClick={addColumns}
            >
              Add Columns
            </button>
          </div>

          {TableData?.columns?.map((item, index) => {
            return (
              <ColumnInput
                data={item}
                key={index}
                index={index}
                handleColumnChange={handleColumnChange}
              />
            );
          })}

          <h5 className="mt-4" style={{ fontWeight: "800" }}>
            Rows
          </h5>
          {TableData?.rows?.map((item, index) => {
            return (
              <RowInput
                TableData={TableData}
                data={item}
                key={index}
                id={index}
                removeRow={removeRow}
                handleRowChange={handleRowChange}
                param={id}
              />
            );
          })}
          <div className="addEmployee-alignRow d-flex mt-4 align-items-center justify-content-end">
            {/* <div className='addEmployee-inputFieldDiv mt-0'>
                <label className='addEmployee-inputLabel'>No of Rows</label>
                <input
                  type='number'
                  name='noOfRows'
                  placeholder='No Of Rows'
                  value={TableData?.noOfRows}
                  className='addEmployee-inputField'
                  onChange={handleChange}
                />
              </div> */}
            <button
              className="addEmployee-submitDetailBtn w-25"
              onClick={addRows}
            >
              Add Rows
            </button>
          </div>

          <div className="mt-4">
            <table class="table table-bordered">
              <thead>
                <tr>
                  {TableData?.columns?.map((item, index) => {
                    return <th>{item?.name}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {TableData?.rows?.map((row, index) => {
                  return (
                    <tr>
                      {TableData?.columns.map((column, index2) => {
                        return <td>{row[column?.name]}</td>;
                      })}
                      {/* <td>{item.[`${TableData?.column?.filter((item,index)=>)}`]}</td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="addEmployee-submitDetailDiv">
            {!!tableid ? (
              <button
                className="addEmployee-submitDetailBtn"
                onClick={handleUpdate}
              >
                Update
                {LoadingButton && <LoadingComponent />}
              </button>
            ) : (
              <button
                className="addEmployee-submitDetailBtn"
                onClick={handlesubmit}
              >
                Submit
                {LoadingButton && <LoadingComponent />}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDynamicTable;
