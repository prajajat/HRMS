import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {
  useCreateDocument, 
  useGetAllTravel,
} from "../queries/TravelQueries";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
import { useGetAllEmp } from "../../../shared/queries/CommonQueries";

function NewDocumentForm({ travelerId = 0, travelDetailId = 0, ownerType,setView }) {

  var fun =Math.random;
  if (ownerType == "HR") {
    fun = useGetAllTravel;
  }
  const {isLoading: isLoadingTd,data: dataTd,isError: isErrorTd,refetch: refetchTd,} = fun();
  const { mutate, isPending, isError, error,reset } = useCreateDocument(travelerId);
  const {isLoading: isLoadingEmp,data: dataEmp,isError: isErrorEmp,refetch: refetchEmp,} = useGetAllEmp();

  const { register, handleSubmit, watch } = useForm({shouldUseNativeValidation: true,}); 
  const [file, setFile] = useState();
  const visibility = watch("visibility");
 

  

 //functions
 const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = (data) => {
    if(file==null)
    {
       alert("Please provide file");
      return;
    }
    if (data.fileName.length == 0) {
      alert("Please provide names for file");
      return;
    }
    const formData = new FormData();
    const docDTO = {
      visibility: data.visibility,
      fileName: data.fileName,
      travelerId: data.travelerId,
      documentType: data.documentType,
      ownerType: data.ownerType,
      travelDetailId: data.travelDetailId,
    };
    if (ownerType == "HR") {
      docDTO.travelerId = data.eid;
      docDTO.travelDetailId = data.tid;
    } 
    formData.append("travelerDocumentData", JSON.stringify(docDTO));
    formData.append("document", file);
    mutate(formData, {
      onSuccess: (response) => {
        console.log("success");
        alert("doc created");
        reset();
        setView("");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-lg p-4 border border-gray-300 rounded-lg bg-white space-y-4 flex flex-col"
    >
      {!isLoadingEmp && !isLoadingTd && (
        <>  <h3 className="font-bold"> Add New Travel Document</h3> 
       
          <FormControl>
            <label>Visibility</label>
            <Select
              type="text"
              defaultValue=""
              className="mt-3 mb-3"
              {...register("visibility",
                {
                required: "Please select visibility",
              }
              )}
            >
              {ownerType == "HR" && <MenuItem value="All">All-traveler</MenuItem>}
              <MenuItem value="hr-emp">Hr-Emp</MenuItem>
            </Select>
            {ownerType == "HR" && (
              <FormControl>
                <label>select travel</label>
                <Select
                  type="number"
                  className="mt-3 mb-3"
                  {...register("tid" ,
                    {
                    required: "Please select travel",
                  }
                  )}
                >
                  {dataTd.data.map((e) => {
                    return (
                      <MenuItem value={e.travelDetailId}> {e.title}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}

            {ownerType == "HR" && visibility != "All" && (
              <FormControl>
                <label>select Employee</label>
                <Select
                  type="number"
                  className="mt-3 mb-3"
                  {...register("eid",
                     {
                    required: "Please select employee",
                  }
                  )}
                >
                  {dataEmp.data.map((emp) => {
                    return (
                      <MenuItem value={emp.userId}>
                        {" "}
                        {emp.name}-{emp.companyEmail}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}
          </FormControl>

          <FormControl>
            <Input
              type="number"
              hidden
              className="mt-10 mb-10"
              value={travelerId}
              {...register("travelerId")}
            />
          </FormControl>
          <FormControl>
            <Input
              type="number"
              hidden
              className="mt-10 mb-10"
              value={travelDetailId}
              {...register("travelDetailId")}
            />
          </FormControl>
          <FormControl>
            <Input
              type="text"
              hidden
              className="mt-10 mb-10"
              value={ownerType}
              {...register("ownerType")}
            />
          </FormControl>

          <FormControl>
            <Input
              type="text"
              hidden
              className="mt-10 mb-10"
              value={".doc"}
              {...register("documentType")}
            />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="documents">Upload Documents</InputLabel>
            <input
              type="file"
              multiple
              accept="image/*,.pdf,.doc,.docx"
              onChange={handleFileSelect}
              className="mt-10 mb-10 bg-blue-200"
            />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="amount">File Name</InputLabel>
            <Input
              type="text"
              className="mt-3 mb-3"
              {...register("fileName", {
                required: "Please enter fileName",
              })}
            />
          </FormControl>

          <Button type="submit" disabled={isPending} variant="contained">
            {isPending ? "Submitting..." : "Add New Travel Document"}
          </Button>
        </>
      )}
    </form>
  );
}
export default NewDocumentForm;
