function JobShareCard({ data }) {
  return (
    <div className=" rounded-lg p-4 bg-sky-100 shadow-md">
      <div className="mb-3 flex flex-row justify-between w-full">
        <div className=" border border-blue-500 flex flex-row m-2 p-3 rounded-sm">
          <h3> Job </h3>
          <div className="bg-blue-400 mx-2 px-2 rounded-sm ">
            {data.jobTitle || "No title"}
          </div>
        </div>
        <p>
          {data.datetime.slice(0, data.datetime.lastIndexOf("T")) || "No title"}
        </p>
      </div>
      <div className="mb-3 flex flex-row font-medium">
        Receiver :<h3>{data.receiverMail}</h3>
        
      </div>
    </div>
  );
}

export default JobShareCard;
