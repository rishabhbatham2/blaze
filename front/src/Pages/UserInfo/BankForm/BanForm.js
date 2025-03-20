import React, { useState } from "react";
import './BankForm.css'
import { postData } from "../../../services/NodeServices";
import { toast } from "react-toastify";
export default function BankDetailsForm({coins,walletid}) {
  const [bankDetails, setBankDetails] = useState({
    amount:"",
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
    accountHolder: "",
    bankName: "",
    branchName: "",
  });

  

  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "amount") {
      let numericValue = e.target.value.replace(/[^0-9]/g, "");
      // Convert to number for comparison
      const numericAmount = Number(numericValue);
  
      // Ensure the amount doesn't exceed the available coins.
      if (numericAmount < coins) {
        setBankDetails({ ...bankDetails, [e.target.name]: numericValue });
      }
  
      
    } else {
      setBankDetails({ ...bankDetails, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Bank Details Submitted:", bankDetails);

  try{
    const body ={
        walletid:walletid,
        account:bankDetails.accountNumber,
        IFSC:bankDetails.ifscCode,
        name:bankDetails.accountHolder,
        bank:bankDetails.bankName,
        branch:bankDetails.branchName,
        coins:bankDetails.amount
        
    }

    const result = await postData('api/users/withdraw',body)
    if(result.status){
        toast.success('withdraw request submitted')
    }else{
        toast.error(result.message)
    }
  }catch{
    toast.error('server error')
  }

    
  };


  



  return (
   <div className="bankdetails">
     <form
      onSubmit={handleSubmit}
      style={{
        
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
         <div className="adeytailsrow2">
    <input
        type="text"
        name="amount"
        placeholder="Select Amount"
        value={bankDetails.amount}
        onChange={handleChange}
        required
      />
     
    </div>
    <div className="adeytailsrow1">
    <input
        type="text"
        name="accountNumber"
        placeholder="Account Number"
        value={bankDetails.accountNumber}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="confirmAccountNumber"
        placeholder="Confirm Account Number"
        value={bankDetails.confirmAccountNumber}
        onChange={handleChange}
        required
      />
    </div>
      <div className="adeytailsrow1">
      <input
        type="text"
        name="ifscCode"
        placeholder="IFSC Code"
        value={bankDetails.ifscCode}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="accountHolder"
        placeholder="Account Holder Name"
        value={bankDetails.accountHolder}
        onChange={handleChange}
        required
      />
      </div>
       <div className="adeytailsrow2">
       <input
        type="text"
        name="bankName"
        placeholder="Bank Name"
        value={bankDetails.bankName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="branchName"
        placeholder="Branch Name"
        value={bankDetails.branchName}
        onChange={handleChange}
        required
      />
       </div>
      <button type="submit" style={{ padding: "8px", border: "1px solid black", background: "black", color: "white",marginTop:'1rem' }}>
        Submit
      </button>
    </form>
   </div>
  );
}
