function JobReferralCard({ data}) {
  return (
    <div className="bg-sky-100 rounded">
      <div className="mb-3">
        <h3>{data.jobTitle}</h3>
        <p>{data.friendName}</p>
      </div>

      <div className="mb-3">
        <p>Email: {data.friendMail}</p>
        <p>Phone: {data.phone || "N/A"}</p>
         <p>Time: {data.datetime || "N/A"}</p>
      </div>

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
 
    </div>
  );
}

export default JobReferralCard;