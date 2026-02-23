 

function JobShareCard({ data}) {
   

  return (
    <div className=" rounded-lg p-4 bg-sky-100">
      <div className="mb-3 flex flex-row">
        Receiver Mail {" : "}
        <h3>{data.receiverMail}</h3>
      </div>

      <div className="mb-3 flex flex-row">
        For Job Title {" : "}
        <p>
          {data.jobTitle || "No title"}
        </p>
      </div>

      <div className="mb-3 flex flex-row">
        Share At {" : "}
        <p>
          {data.datetime || "No title"}
        </p>
      </div>
  
    </div>
  );
}

export default JobShareCard;