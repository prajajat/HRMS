import { Button, FormControl, Input, InputLabel, MenuItem, Select } from "@mui/material";
import { useCreateDocument, useCreateExpense, useGetAllEmp, useGetAllTravel } from "../Query/useQueries";
import { useState } from "react";
import { useForm } from "react-hook-form";
 
 
function NewDocumentForm({ travelerId=0 ,travelDetailId=0,ownerType}) {
  const { register, handleSubmit ,watch} = useForm({
    shouldUseNativeValidation: true,
  });
  const visibility=watch("visibility");
   const handleFileSelect =(e)=>{
        setFile(e.target.files[0]);
    }
    const[val,setVal]=useState();
  const [file, setFile] = useState();
  const { mutate, isPending, isError, error,  } = useCreateDocument();
     const { isLoading:isLoadingTd, data:dataTd, isError:isErrorTd, refetch:refetchTd } = useGetAllTravel();
     const { isLoading:isLoadingEmp, data:dataEmp, isError:isErrorEmp, refetch:refetchEmp } = useGetAllEmp();
 
  const onSubmit = (data) => {
    
    if (data.fileName.length == 0) {
      alert("Please provide names for file");
      return;
    }

   
    const formData = new FormData();

    const expenseDTO = {
         visibility:data.visibility,
         fileName:data.fileName,
      travelerId: data.travelerId,
      documentType: data.documentType,
      ownerType: data.ownerType,
      travelDetailId:data.travelDetailId
 
    };
    if(ownerType=="HR")
    {
         expenseDTO.travelerId=data.eid;
        expenseDTO.travelDetailId=data.tid;
    }

    formData.append("tarvelerDocumentData", JSON.stringify(expenseDTO));

     
    formData.append("document", file);
   

    mutate(formData, {
      onSuccess: (response) => {
        console.log("success");
       alert("doc created");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col border p-20 rounded-lg w-100"
    >
      {!isLoadingEmp&&!isLoadingTd&&<>
      <FormControl>
        <InputLabel >Visibility</InputLabel>
        <Select
          type="text"
          defaultValue=""
          className="mt-10 mb-10"
          {...register("visibility",
          )}
        >
            <MenuItem value="All">
              All
            </MenuItem>
             <MenuItem value="hr-emp">
              Hr-Emp
            </MenuItem>

        </Select>
       {ownerType=="HR"&&
        <FormControl>
          <InputLabel >select travel</InputLabel>
       <Select
          type="number"
           
          className="mt-10 mb-10"
          {...register("tid")}
           
        > 
        {  dataTd.data.map((e)=>{
          return  <MenuItem value={e.tarvelDetailId}> {e.title}</MenuItem>
        })
        } 
          </Select>
      </FormControl>
         }

          {ownerType=="HR"&&visibility!="All"&&
        <FormControl>
          <InputLabel >select Employee</InputLabel>
       <Select
          type="number"
           
          className="mt-10 mb-10"
          {...register("eid")}
           
        > 
        {  
        dataEmp.data.map((emp)=>{
          return  <MenuItem value={emp.userId}> {emp.name}-{emp.companyEmail}</MenuItem>
        })  
        } 
          </Select>
      </FormControl>
         }

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
          className="mt-10 mb-10"
        />
      </FormControl>

        <FormControl>
        <InputLabel htmlFor="amount">File Name</InputLabel>
        <Input
          type="text"
          className="mt-10 mb-10"
          {...register("fileName", {
            required: "Please enter fileName",
         
          })}
        />
      </FormControl>
       

      <Button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Add New Travel Expense"}
      </Button>
      </>
}
    </form>
  );
}
export default NewDocumentForm;
