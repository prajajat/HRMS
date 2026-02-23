import { Typography } from "@mui/material";
import ExpenseContainer from "../Components/ExpenseContainer";

function HRExpense() {
  return (
    <div className="p-4">
      <Typography fontSize={36}>Travel Expenses</Typography>
      <hr />
      <br />
      
    
      <ExpenseContainer ownerType={"HR"} />
    </div>
  );
}
export default HRExpense;