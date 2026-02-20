function SlotCard({ data }) {
  return (
    <div
      className={`m-4 flex flex-col justify-items-center rounded-b-lg   ${data.slotStatus === "BOOKED" ? " bg-red-100" : "bg-green-200"}`}
    >
      <div className="flex flex-row aline-item-center justify-center w-full">
        <div>Slot</div>
      </div>
      <hr />
      <div className="flex flex-row aline-item-center justify-between w-full">
        <div>{data.gameSlotId}</div>

        <div className={" rounded-lg"}>{data.slotStatus}</div>
      </div>

      <div className="flex flex-row aline-item-center justify-center w-full">
        <div className={"  rounded-lg"}>
          {" "}
          {data.slotStartTime} to {data.slotEndTime}{" "}
        </div>
      </div>

      <div className="flex flex-row justify-center">
        <div className="  m-3 rounded-lg"> on {data.date}</div>
      </div>
    </div>
  );
}
export default SlotCard;
