import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTable } from "react-table";
import "./Table.css";
import { serverURL } from "../../services/NodeServices";

const ReusableTable = ({ columns, data, deleteApi, editApi,viewApi,showView=true,showEdit=true,showDelete=true,showMenu=true }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const [menuVisible, setMenuVisible] = useState(null);

  const handleMenuToggle = (rowIndex) => {
    setMenuVisible((prev) => (prev === rowIndex ? null : rowIndex));
  };

  const renderCellContent = (value, column) => {
    // Check if the column is 'image_url' and render the image
    if (column.id === "image_url" && value) {
      return <img src={value} alt="avatar" className="avatar" />;
    }
  };

  return (
    <div className="table-container">
      <table className="custom-table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              <th className="checkbox-cell">
                <input type="checkbox" />
              </th>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
              <th className="action-cell"></th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                <td className="checkbox-cell">
                  <input type="checkbox" />
                </td>

                {/*   {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>





                ))} */}
                {row.cells.map((cell) => {
                  const cellValue = cell.render("Cell");

                  // Check if the column name is 'image_url' and render the image
                  if (cell.column.id === "image_url" && cellValue) {
                     
                     let images =row.original?.image_url?.split(',')||[]
                    
                    return (
                      <td {...cell.getCellProps()}>
                        <img src={`${serverURL}images/${images[0]}`} alt="avatar" className="avatar" />
                      </td>
                    );
                  }
                  if ((cell.column.id == "created_at" || cell.column.id == "updated_at") && cellValue) {
                    const formattedDate = new Date(cellValue).toLocaleString(); // Convert MySQL date to human-readable format
                    console.log(row.original.created_at)
                    return (
                      <td {...cell.getCellProps()}>
                        {cell.column.id=='created_at'?new Date(row.original.created_at).toLocaleString() :cell.column.id=='updated_at'?new Date(row.original.updated_at).toLocaleString() :''}
                      </td>
                    );
                  }
                  
                  // Otherwise, render the normal cell content
                  return <td {...cell.getCellProps()}>{cellValue}</td>;
                })}

                <td
                  className="action-cell"
                  onMouseEnter={() => {
                    handleMenuToggle(row.index);
                  }}
                  onMouseLeave={() => {
                    handleMenuToggle(null);
                  }}
                >
                  {showMenu&&<button className="action-button">⋮</button>}

                  {menuVisible === row.index &&showMenu && (
                    <div
                      className="action-menu"
                      onMouseLeave={() => setMenuVisible(null)}
                    >
                     {showView&& <div className="action-menu-item"  onClick={() => {
                          viewApi(row.original);
                        }}>
                        {" "}
                        <i class="fa-regular fa-pen-to-square"></i> View{" "}
                      </div>}
                      {showEdit&&<div
                        className="action-menu-item"
                        onClick={() => {
                          editApi(row.original);
                        }}
                      >
                        {" "}
                        <i class="fa-regular fa-pen-to-square"></i> Edit{" "}
                      </div>}
                     {
                      showDelete&& <div
                      className="action-menu-item"
                      style={{ color: "#FF4D4F" }}
                      onClick={() => {
                        deleteApi(row.original);
                      }}
                    >
                      {" "}
                      <i class="fa-regular fa-trash-can"></i>Delete
                    </div>
                     }
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

ReusableTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ReusableTable;
