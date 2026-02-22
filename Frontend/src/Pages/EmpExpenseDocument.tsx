import { useParams, useSearchParams } from "react-router-dom";
import { useGetTravelById } from "../Query/useQueries";
import { CircularProgress } from "@mui/material";
import EmpTravelDetailCard from "../Components/EmpTravelDetailCard";
import ExpenseContainer from "../Components/ExpenseContainer";
import DocumentContainer from "../Components/DocumentContainer";

function EmpExpenseDocument() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const tid = searchParams.get("tid");

  const {
    isLoading: isLoadingTD,
    data: dataTD,
    isError: isErrorTD,
  } = useGetTravelById(tid);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Travel details</h2>

      {isLoadingTD && (
        <div className="flex justify-center py-8">
          <CircularProgress />
        </div>
      )}

      {isErrorTD && (
        <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-600">Failed to load travel details</p>
        </div>
      )}

      {!isLoadingTD && dataTD?.data && (
        <div className="mb-6">
          <EmpTravelDetailCard data={dataTD.data} isSeeMore={false} />
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">Expenses</h3>
          <ExpenseContainer travelerId={id} ownerType={"employee"} />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Documents</h3>
          <DocumentContainer
            travelDetailId={tid}
            travelerId={id}
            ownerType={"employee"}
          />
        </div>
      </div>
    </div>
  );
}
export default EmpExpenseDocument;