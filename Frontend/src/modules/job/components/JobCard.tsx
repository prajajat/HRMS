import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function JobCard({ data, view }) {
  
   const navigate = useNavigate();

  const handleViewDetails = () => {
    if (view === "hr") {
      navigate(`/hr/job/config/${data.jobId}`);
    } else {
      navigate(`/employee/job/details/${data.jobId}`);
    }
  };

  return (
    <div className=" rounded-lg p-4 bg-sky-100 shadow-md">
      <div className="mb-3 border-b border-solid flex felx-row justify-between w-full">
        <h3>{data.title}</h3>
        <span
          className={`px-2 py-1 ${data.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} m-1 rounded`}
        >
          {data.status ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="mb-3">
        <p>{data.description || "No description"}</p>
      </div>

      <div className="mb-3 flex gap-2"></div>
     
      <div className="mb-3 flex felx-row justify-between w-full">
        {data.jobDescriptionUrl ? (
          <a
            href={data.jobDescriptionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 "
          >
            View JD
          </a>
        ) : (
          "No JD found"
        )}

        {data.createdByName && (
          <span className="px-2 py-1 bg-green-100 rounded">
            By: {data.createdByName}
          </span>
        )}
      </div>

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
