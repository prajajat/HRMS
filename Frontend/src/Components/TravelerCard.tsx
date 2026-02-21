import { Button } from "@mui/material";
import { useRemoveTravelEmp } from "../Query/useQueries";

function TravelerCard({
  data,
  isDelete = false,
  travelDetailsId = null,
  refetch = null,
}) {
  const { mutate, isPending, isError, error } = useRemoveTravelEmp();
  const handleDelete = (id) => {
    var dto = { travelId: travelDetailsId, empId: id };
    console.log(travelDetailsId);
    mutate(dto, {
      onSuccess: (response: any) => {
        console.log("save");
        refetch();
      },
    });
  };
  return (
    <div className="border border-green-100 flex flex-row justify-items-center w-full">
      <div>Name : </div>
      {data.travelerUserName}{" "}
      {isDelete && (
        <Button onClick={() => handleDelete(data.travelerUserId)}>
          delete
        </Button>
      )}
    </div>
  );
}
export default TravelerCard;
