import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function JobCard({ data,view }) {
  const navigate = useNavigate();
  

  const handleViewDetails = () => {
   if (view === "hr") {
      navigate(`/hr/job/config/${data.jobId}`);
   } else {
     navigate(`/employee/job/details/${data.jobId}`);
   }
  };

  return (
    <div className=" rounded-lg p-4 bg-sky-100">
      <div className="mb-3">
        <h3>{data.title}</h3>
      </div>

      <div className="mb-3">
        <p  >
          {data.description || "No description"}
        </p>
      </div>

      <div className="mb-3 flex gap-2">
        <span className="px-2 py-1 bg-blue-100 rounded">
          {data.status || "Active"}
        </span>
        {data.createdByName && (
          <span className="px-2 py-1 bg-gray-100 rounded">
            By: {data.createdByName}
          </span>
        )}
      </div>

      {data.reviewers && data.reviewers.length > 0 && (
        <div className="mb-3">
          <p className="mb-1">Reviewers:</p>
          <div className="flex flex-wrap gap-1">
            {data.reviewers.map((reviewer, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-green-100 rounded"
              >
                {reviewer.userName} {reviewer.companyEmail}
              </span>
            ))}
          </div>
        </div>
      )}
      {data.jobDescriptionUrl && (
        <div className="mb-3">
          <a
            href={data.jobDescriptionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 "
          >
            View JD
          </a>
        </div>
         )}

      <div className="flex gap-2">
        <button
          onClick={handleViewDetails}
          className="flex-1 px-3 py-2  bg-blue-200  rounded   text-sm"
        >
          View Details
        </button>
      </div>
      


    </div>
  );
}

export default JobCard;