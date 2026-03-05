import { useEffect, useState } from "react";

function ExpenseChart({ apiData }) {
  if (apiData == undefined) return;
  const data = JSON.parse(JSON.stringify(apiData));
  const [render, setRender] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, 3000);
  }, []);
  const startDate = new Date(
    data[0].travelerTravelDetailStartDate.substring(
      0,
      data[0].travelerTravelDetailStartDate.indexOf("T"),
    ),
  );
  const max = data[0].travelerTravelDetailMaxAmountPerDay;
  const endDate = new Date(
    data[0].travelerTravelDetailEndDate.substring(
      0,
      data[0].travelerTravelDetailEndDate.indexOf("T"),
    ),
  );

  console.log(startDate);
  console.log(endDate);

  for (
    let currDate = startDate;
    currDate <= endDate;
    currDate.setDate(currDate.getDate() + 1)
  ) {
    var filler = currDate.getMonth >= 9 ? "" : "0";
    var date =
      currDate.getFullYear() +
      "-" +
      filler +
      (currDate.getMonth() + 1) +
      "-" +
      currDate.getDate() +
      "T";

    console.log(date);
    console.log(currDate);
    data.push({ expenseDate: date, amount: 0 });
  }

  const groupByDate = data.reduce((acc, expense) => {
    var date = expense.expenseDate.substring(
      0,
      expense.expenseDate.indexOf("T"),
    );
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(expense);
    return acc;
  }, {});
  const sortDate = Object.keys(groupByDate).sort();

  console.log(sortDate);
  console.log(groupByDate);
  console.log(data);

  return (
    <div className="line my-8 relative bg-white m-1 p-3 w-full">
      {render && (
        <div className="flex -mx-2 items-end mb-2 h-[20rem] container w-full overflow-auto">
          {sortDate.map((date, indexOfDate) => {
            let totalAmount = groupByDate[date].reduce((acc, curr) => {
              return acc + curr.amount;
            }, 0);
            console.log(totalAmount);
            return (
              <div>
                <div className="px-2 mx-2 w-8 bg-blue-300">
                  <div
                    className={
                      "transition ease-in duration-200 bg-blue-600  relative w-full h-30"
                    }
                    style={{ height: Math.ceil((totalAmount / max) * 220) }}
                  >
                    <div
                      x-text="data"
                      className="text-center absolute top-0 left-0 right-0 -mt-6 text-gray-800 text-sm"
                    >
                      {Math.round(totalAmount)}
                    </div>
                  </div>
                </div>
                <div className="text-sm w-3">{date}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default ExpenseChart;
