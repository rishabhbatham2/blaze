import React, { useEffect, useState } from "react";
import ReusableHeader from "../../../components/ReusableHeader/ReusableHeader";
import ReusableTable from "../../../components/ReusableTable/ReusatbleTable";
import { getDatanew, postData } from "../../../services/NodeServices";
import { useNavigate } from "react-router-dom";
import ReusablePages from "../../../components/ui/ReusableFilterComponent/ReusableFilterComponent";
import ReusableSearchComponent from "../../../components/ui/ReusableSearch/ReusabeSearch";

export default function WalletHistoryList() {
  const nav = useNavigate();

  // Function to fetch wallet history data.
  const getDataa = async () => {
    const results = await postData("api/users/getallwallethistory");
    if (results.status) {
      setData(results.data);
      setFilteredList(results.data);
      console.log(results.data);
    }
  };

  // Update status function: toggles status based on current status.
  const updateStatus = async (row) => {
    const currentStatus = row.original.stat;
    const newStatus = currentStatus === "pending" ? "successful" : "pending";
    const result = await postData("api/users/updatewalletstatus", {
      wallethistoryid: row.original.wallethistoryid,
      status: newStatus,
    });
    if (result.status) {
      getDataa();
    }
  };

  const columns = [
    { Header: "Wallet ID", accessor: "walletid" },
    { Header: "History ID", accessor: "wallethistoryid" },
    {
      Header: "Status",
      accessor: "stat",
      Cell: ({ row }) => (
        <button
          className="wallet-history__status-btn"
          onClick={() => updateStatus(row)}
          style={{
            cursor: "pointer",
            background: "transparent",
            border: "1px solid #000",
            padding: "4px 8px",
            fontSize: "13px",
          }}
        >
          {row.original.stat != "pending"
            ? "Successful"
            : "Pending"}
        </button>
      ),
    },
    {
      Header: "Coins",
      accessor: "amount",
      Cell: ({ row }) => (
        <span
          style={{
            cursor: "pointer",
            color: "rgb(65,142,40)",
            textDecoration: "underline",
            fontSize: "13px",
          }}
        >
          {row.original.amount}
        </span>
      ),
    },
    { Header: "Account", accessor: "account" },
    { Header: "IFSC", accessor: "IFSC" },
    { Header: "Bank", accessor: "bank" },
    { Header: "Branch", accessor: "branch" },
    { Header: "Created At", accessor: "created_at" },
  ];

  const [data, setData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [paginatedList, setpaginatedList] = useState([]);

  useEffect(() => {
    getDataa();
  }, []);

  const deleteApi = async (row) => {
    try {
      const result = await postData("api/wallethistory/delete", {
        wallethistoryid: row.wallethistoryid,
      });
      if (result.status) {
        getDataa();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const editFunc = async (row) => {
    console.log("Editing wallet history:", row);
    sessionStorage.setItem("edit-wallet-history", JSON.stringify(row));
    window.location.href = "/admin/wallethistory-edit";
  };

  const viewApi = async (row) => {
    console.log("Viewing wallet history:", row);
    sessionStorage.setItem("view-wallet-history", JSON.stringify(row));
    window.location.href = "/admin/wallethistory-view";
  };

  const addFuncc = async () => {
    window.location.href = "/admin/wallethistory-add";
  };

  const newestFirst = () => {
    const reverseList = [...data].reverse();
    setFilteredList(reverseList);
  };

  const oldestFirst = () => {
    setFilteredList([...data]);
  };

  return (
    <>
      <ReusableHeader
        addFunc={addFuncc}
        title={"All Wallet History"}
        number={data?.length}
        bread="dashboard / wallet"
        filter={false}
      />
      <ReusableSearchComponent
        list={data}
        refresh={getDataa}
        setFilterList={setFilteredList}
        searchKeys={[
          "walletid",
          "wallethistoryid",
          "stat",
          "account",
          "IFSC",
          "bank",
          "branch",
        ]}
      />

      <div className="datafilters">
        <div className="datafilters__item" onClick={newestFirst}>
          newest first
        </div>
        <div className="datafilters__item" onClick={oldestFirst}>
          oldest first
        </div>
      </div>

      <ReusableTable
        columns={columns}
        data={paginatedList}
        deleteApi={deleteApi}

        editApi={editFunc}
        viewApi={viewApi}
      />

      <ReusablePages
        list={filteredList}
        setFilterList={setpaginatedList}
        set2={setData}
        set3={setFilteredList}
      />
    </>
  );
}
