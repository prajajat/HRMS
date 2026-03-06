import { Button, CircularProgress, Typography } from "@mui/material";
import { useGetUserReferrals } from "../../../Query/useQueries";
import JobReferralCard from "../components/JobReferralCard";
import { useState } from "react";

function EmployeeJobReferrals() {

  const { isLoading, data, isError } = useGetUserReferrals();
  
  const [view, setView] = useState("myReferrals");
 
  return (
    <div className="p-4">
      <Typography fontSize={36}>Job Referrals</Typography>
      
      
       <div className="flex flex-row justify-start item-center gap-2">
            <Button
              onClick={() => setView("myReferrals")}
              sx={{backgroundColor:view=="myReferrals"?"#a7caf3":""}}
              >
              My Referrals
            </Button>
            <Button
              onClick={() => setView("referralsToReview")}
                
                sx={{backgroundColor:view=="referralsToReview"?"#a7caf3":""}}
            >
              Referrals To Review
            </Button>
          </div>
        
          <hr />
      <br />
        
          
      {isLoading && (
        <div className="flex justify-center py-8">
          <CircularProgress />
        </div>
      )}

      {isError && (
        <div className="p-4 mb-4 rounded">
          <p>Failed to load referrals</p>
        </div>
      )}

      {!isLoading && data?.data?.length === 0 && (
        <div className="p-8 ">
          <p>No referrals yet</p>
        </div>
      )}

      {view=="myReferrals"&&!isLoading && data?.data  && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.data.myRefers.map((referral) => (
            <JobReferralCard key={referral.referralId} data={referral} />
          ))}
        </div>
      )}

       { view=="referralsToReview" &&!isLoading && data?.data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.data.referToReview.map((referral) => (
            <JobReferralCard key={referral.referralId} data={referral} view={"reviewer"}/>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmployeeJobReferrals;