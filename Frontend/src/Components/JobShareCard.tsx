 

function JobShareCard({ data}) {
   

  return (
    <div className=" rounded-lg p-4 bg-sky-100">
      <div className="mb-3">
        <h3>{data.receiverMail}</h3>
      </div>

      <div className="mb-3">
        <p>
          {data.jobTitle || "No title"}
        </p>
      </div>

      <div className="mb-3">
        <p>
          {data.datetime || "No title"}
        </p>
      </div>
  
    </div>
  );
}

export default JobShareCard;