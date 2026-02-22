import { Button, CircularProgress } from "@mui/material";
import { useGetUserReferrals } from "../Query/useQueries";
import JobReferralCard from "../Components/JobReferralCard";
import { useState } from "react";

function EmployeeJobReferrals() {
  
  const { isLoading, data, isError } = useGetUserReferrals();

 

  return (
    <div className="p-4">
      <h2 className="mb-4">My Job Referrals</h2>

      {isLoading && (
        <div className="flex justify-center py-8">
          <CircularProgress />
        </div>
      )}

      {isError && (
        <div className="p-4 mb-4 rounded">
          <p >Failed to load referrals</p>
        </div>
      )}

      {!isLoading && data?.data?.length === 0 && (
        <div className="p-8 ">
          <p>No referrals yet</p>
        </div>
      )}

      {!isLoading && data?.data && data.data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.data.map((referral) => (
            <JobReferralCard
              key={referral.referralId}
              data={referral}
            />
          ))}
        </div>
      )}
 
      
    </div>
  );
}

export default EmployeeJobReferrals;