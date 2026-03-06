function SlotCard({ data }) {

  var color = "green";
  switch (data.slotStatus) {
    case "BOOKED":
      color = "bg-green-200";
      break;
    case "PENDING":
      color = "bg-blue-200";
      break;
    case "QUEUED":
      color = "bg-blue-200";
      break;
    case "CANCELLED":
      color = "bg-red-300";
      break;
    default:
      color = "bg-red-200";
  }
  return (
    <div
      className={` flex flex-col justify-items-center rounded-b-lg   ${data.slotStatus === "BOOKED" ? " bg-red-100" :data.slotStatus === "EXPIRED"||data.slotStatus === "COMPLETED"  ?"bg-blue-100":"bg-blue-300"}`}
    >
      <div className="flex flex-row aline-item-center justify-center w-full">
        <div>Slot</div>
      </div>
      <hr />
      <div className="flex flex-row aline-item-center justify-between w-full">
        <div>{data.gameSlotId}</div>

        <div className={` rounded-lg ${color}`}>{data.slotStatus=="PENDING"?"Avialable":data.slotStatus }</div>
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
