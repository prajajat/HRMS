import ExpenseContainer from "../Components/ExpenseContainer";

function HRExpense() {
  return (
    <div className="p-4">
       <h2 className="mb-4">Travel Expense</h2>
      <ExpenseContainer ownerType={"HR"} />
    </div>
  );
}
export default HRExpense;