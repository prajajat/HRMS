function SlotCard({ data }) {
  return (
    <div className="m-4 border-3 border-indigo-500 flex flex-col justify-items-center ">
      <div className="flex flex-row aline-item-center justify-between w-full">
        <div>id :{data.gameSlotId}</div>
        <div className={"bg-blue-300 rounded-lg"}>{data.slotStatus}</div>
      </div>

      <div className="flex flex-row aline-item-center justify-center w-full">
        <div className={"bg-yellow-200 rounded-lg"}>
          {" "}
          {data.slotStartTime} to {data.slotEndTime}{" "}
        </div>
      </div>

      <div className="flex flex-row justify-center">
        <div className="bg-gray-100 m-3 rounded-lg"> on {data.date}</div>
      </div>
    </div>
  );
}
export default SlotCard;
