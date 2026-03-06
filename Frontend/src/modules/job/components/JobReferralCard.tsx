import { Button, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { useUpdateReferralStatus } from "../../../Query/useQueries";

function JobReferralCard({ data ,view="all"}) {

const { mutate: updateStatus, isPending: isUpdateStatus } =useUpdateReferralStatus();

const [isEdit,setIsEdit]=useState(false);
const [status,setStatus]=useState();
const [isSeeMore,setIsSeeMore]=useState(false);

//functions
const handleEditSave=()=>{
  const dto= {
  status:  status,
  jobReferId:data.jobReferId
  }
  updateStatus(dto,{
    onSuccess: () => {
          setIsEdit(false);
          alert("updated successfully");
        },
        onError: (error) => {
          alert("Failed to updating status"+error);
        },
  });
};
  return (
    <div className="bg-sky-100 m-3 p-3 rounded shadow-md">
      <div className="mb-3 flex flex-row justify-between w-full">
        <div className=" border border-blue-500   p-3 rounded-sm">
          <h3> Job </h3>
          <div className="    px-2 rounded-sm ">
            {data.jobTitle}
          </div>
        </div>
        To
        <div className=" border border-blue-500    p-3 rounded-sm">
          <h3> Friend</h3>
          <div className="    px-2 rounded-sm ">
            {data.friendName}
          </div>
        </div>
        {view=='reviewer'&&
        <>
        By
        <div className=" border border-blue-500   p-3 rounded-sm">
          <h3> Emp</h3>
          <div className="   px-2 rounded-sm ">
            {data. refererUserName}
          </div>
        </div>
        </>
        }
      </div>
    

      <div className="mb-3 flex flex-col m-2 p-3 rounded-sm">
        <div className="bg-blue-100 flex flex-row rounded-sm m-1">
          Email:
          {data.friendMail}
        </div>
        <div className="bg-blue-100 flex flex-row rounded-sm m-1">
          Phone: {data.phone || "N/A"}
        </div>
        <div className="bg-blue-100 flex flex-row rounded-sm m-1">
          Time: {data.datetime || "N/A"}
        </div>
      </div>

      <div className=" flex flex-row justify-between m-2 p-3 rounded-sm">
        {data.cvUrl && (
          <div className="mb-3">
            <a
              href={data.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 "
            >
              View CV
            </a>
          </div>
        )} 
        { view=="reviewer"&&
        <Button onClick={()=>{if(isEdit){handleEditSave();}setIsEdit(!isEdit)}}>{isEdit? isUpdateStatus?"Wait ....":"Save":"Edit"}</Button>        
        }
        {isEdit?
        <Select
            size="small"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value={"PENDING"}>Pending</MenuItem>
            <MenuItem value={"REVIEW"}>Review</MenuItem>
              <MenuItem value={"INTERVIEW"}>Interview</MenuItem>
              <MenuItem value={"HIRED"}>Hired</MenuItem>
            <MenuItem value={"REJECTED"}>Rejected</MenuItem>
          </Select>
        :
         <div className="mb-3">
          <span
            className={`px-2 py-1 rounded ${
              data.status === "PENDING"
                ? "bg-yellow-100"
                : data.status === "REVIEWED"
                  ? "bg-blue-100"
                  : data.status === "HIRED"
                    ? "bg-green-100 "
                    : "bg-red-100 "
            }`}
          >
            {data.status}
          </span>
        </div>
         }
        
      </div>
       { view=="reviewer"&&
        <Button onClick={()=>setIsSeeMore(!isSeeMore)}>{isSeeMore?"Cancel":"See More"}</Button>        
        }
        {isSeeMore&&view=="reviewer" &&
         <div className="mx-3">
          <TableContainer component={Paper}>
            <Table aria-label="simple table" color="Green">
              <TableHead>
                <TableRow>
                  <TableCell> Id</TableCell>
                  <TableCell align="right">Updated By</TableCell>
                   <TableCell align="right">Update At</TableCell>
                  <TableCell align="right">Status</TableCell>
                  </TableRow>
                  </TableHead>
                   <TableBody>
                    {data.jobReferReviews.map((r) => {
                    return (
                       <TableRow>
                         <TableCell align="right">{r.jobReferReviewId}</TableCell>
                        <TableCell align="right">{r.updatedBy.name}</TableCell>
                        <TableCell align="right">{r.updatedAt}</TableCell>
                         <TableCell align="right">{r.status}</TableCell>
                       </TableRow>
                    );
                  })}
                  </TableBody>
                 </Table>
                </TableContainer>
                </div>
        }
    </div>
  );
}

export default JobReferralCard;
