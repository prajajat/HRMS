import { Button, FormControl, Input, InputLabel } from "@mui/material";
import { useCreateJob } from "../Query/useQueries";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSelector } from "react-redux";

function CreateJobForm({ onSuccess }) {
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  });
  const [file, setFile] = useState(null);
  const { mutate, isPending } = useCreateJob();
  const userId = useSelector((state) => state.user.userId);

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const onSubmit = (data) => {
    if (!file) {
      alert("Please select a job description file");
      return;
    }

    const formData = new FormData();

    const jobDTO = {
      title: data.title,
      description: data.description,
    };

    formData.append("jobData", JSON.stringify(jobDTO));
    formData.append("document", file);

    mutate(formData, {
      onSuccess: (response) => {
        alert("Job created successfully");
        setFile(null);
        onSuccess();
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4  rounded-lg bg-blue-100 w-full max-w-2xl space-y-4"
    >
      <FormControl fullWidth size="small">
       
        <Input
          type="text"
          {...register("title", { required: "Please enter job title" })}
           placeholder=" job title"
        />
        
      </FormControl>

      <FormControl fullWidth size="small">
         
        <textarea
          {...register("description", {
            required: "Please enter job description",
          })}
          className="p-2   rounded w-full"
          rows={4}
          placeholder=" job desc"
        />
      </FormControl>

  

      <FormControl fullWidth size="small">
        <InputLabel htmlFor="jd"> </InputLabel>
        <input
          type="file"
        
          onChange={handleFileSelect}
          className="p-2  rounded"
        />
      </FormControl>

      {file && (
        <p >Selected file: {file.name}</p>
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={isPending}
      >
        {isPending ? "Creating..." : "Create Job"}
      </Button>
    </form>
  );
}

export default CreateJobForm;