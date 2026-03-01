import React from "react";
import styles from "./CommonTable.module.scss";

const CommonTable = ({ tableData }) => {
  return (
    <div className={`${styles.commonTable} border rounded mb-5 p-4`}>
      <div className={styles.sectionTitle}>{tableData?.tableName}</div>
      <div className={styles.sectionSubTitle}>{tableData?.description}</div>
      <table width="100%">
        <thead>
          <tr className="text-center">
            {tableData?.columns?.map((item, index) => (
              <th>{item.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData?.rows?.map((item, index) => (
            <tr key={`row-${index}`}>
              {Object.values(item).map((x, index) => {
                return !!x && <td key={`rows-data-${index}`}>{x}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommonTable;
