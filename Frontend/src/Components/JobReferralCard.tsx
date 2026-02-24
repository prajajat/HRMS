function JobReferralCard({ data }) {
  return (
    <div className="bg-sky-100 m-3 p-3 rounded shadow-md">
      <div className="mb-3 flex flex-row justify-between w-full">
        <div className=" border border-blue-500 flex flex-row m-2 p-3 rounded-sm">
          <h3> Job </h3>
          <div className="bg-blue-400 mx-2 px-2 rounded-sm ">
            {data.jobTitle}
          </div>
        </div>
        to
        <div className=" border border-blue-500 flex flex-row m-2 p-3 rounded-sm">
          <h3> Friend</h3>
          <div className="bg-blue-400 mx-2 px-2 rounded-sm ">
            {data.friendName}
          </div>
        </div>
      </div>

      <div className="mb-3 flex flex-col m-2 p-3 rounded-sm">
        <div className="bg-blue-200 flex flex-row rounded-sm m-1">
          Email:
          {data.friendMail}
        </div>
        <div className="bg-blue-200 flex flex-row rounded-sm m-1">
          Phone: {data.phone || "N/A"}
        </div>
        <div className="bg-blue-200 flex flex-row rounded-sm m-1">
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
      </div>
    </div>
  );
}

export default JobReferralCard;
