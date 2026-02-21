import { Button, FormControl, Input, InputLabel } from "@mui/material";
import { useCreateJobReferral } from "../Query/useQueries";
import { useForm } from "react-hook-form";
import { useState } from "react";

function JobReferralForm({ jobId, onSuccess }) {
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  });
  const [file, setFile] = useState(null);
  const { mutate, isPending } = useCreateJobReferral();

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const onSubmit = (data) => {
    if (!file) {
      alert("Please select a CV file");
      return;
    }

    const formData = new FormData();

    const referralDTO = {
      candidateName: data.candidateName,
      candidateEmail: data.candidateEmail,
      phone: data.phone || "",
    };

    formData.append("referralData", JSON.stringify(referralDTO));
    formData.append("cv", file);

    mutate(
      { jobId, data: formData },
      {
        onSuccess: (response) => {
          alert("Referral submitted successfully");
          setFile(null);
          onSuccess();
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 border border-gray-300 rounded-lg bg-white w-full max-w-md space-y-4"
    >
      <FormControl fullWidth size="small">
        <InputLabel htmlFor="candidateName">Candidate Name</InputLabel>
        <Input
          type="text"
          {...register("candidateName", {
            required: "Please enter candidate name",
          })}
        />
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel htmlFor="candidateEmail">Email</InputLabel>
        <Input
          type="email"
          {...register("candidateEmail", {
            required: "Please enter email",
          })}
        />
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel htmlFor="phone">Phone</InputLabel>
        <Input type="tel" {...register("phone")} />
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel htmlFor="cv">Upload CV</InputLabel>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileSelect}
          className="p-2 border border-gray-300 rounded"
        />
      </FormControl>

      {file && <p>Selected: {file.name}</p>}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Referral"}
      </Button>
    </form>
  );
}

export default JobReferralForm;