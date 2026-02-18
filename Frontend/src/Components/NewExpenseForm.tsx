import { Button, FormControl, Input, InputLabel } from "@mui/material";
import { useCreateExpense } from "../Query/useQueries";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { original } from "@reduxjs/toolkit";

function NewExpenseForm({ travelerId, ownerType }) {
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  });
  const [fileList, setFileList] = useState([]);
  const { mutate, isPending, isError, error } = useCreateExpense();

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map((file) => ({
      file: file,
      originalName: file.name,
      userName: "",
      documentType: "",
    }));
    setFileList([...fileList, ...newFiles]);
  };
  const updateFileName = (idx, newName) => {
    const updatedFiles = [...fileList];
    updatedFiles[idx].userName = newName;
    setFileList(updatedFiles);
  };
  const onSubmit = (data) => {
    const filesWithoutNames = fileList.filter((f) => !f.userName.trim());
    if (filesWithoutNames.length > 0) {
      alert("Please provide names for all files");
      return;
    }

    const formData = new FormData();

    const expenseDTO = {
      amount: data.amount,
      expenseDate: data.expenseDate,
      traveler: data.travelerId,
      documentType: data.documentType,
      ownerType: data.ownerType,

      fileNameList: fileList.map((f) => f.userName),
    };

    formData.append("expenseData", JSON.stringify(expenseDTO));

    fileList.forEach((fileItem) => {
      const renamedFile = new File([fileItem.file], fileItem.userName, {
        type: fileItem.file.type,
      });
      formData.append("documents", renamedFile);
    });

    mutate(formData, {
      onSuccess: (response) => {
        console.log("success");
        alert("expense created");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col border p-20 rounded-lg w-100"
    >
      <FormControl>
        <InputLabel htmlFor="amount">Amount</InputLabel>
        <Input
          type="number"
          className="mt-10 mb-10"
          {...register("amount", {
            required: "Please enter amount",
            min: { value: 0, message: "Amount must be positive" },
          })}
        />
      </FormControl>
      <FormControl>
        <Input
          type="number"
          hidden
          className="mt-10 mb-10"
          value={travelerId}
          {...register("travelerId")}
        />
      </FormControl>
      <FormControl>
        <Input
          type="text"
          hidden
          className="mt-10 mb-10"
          value={{ ownerType }}
          {...register("ownerType")}
        />
      </FormControl>

      <FormControl>
        <Input
          type="text"
          hidden
          className="mt-10 mb-10"
          value={".doc"}
          {...register("documentType")}
        />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="date">Date</InputLabel>
        <Input
          type="datetime-local"
          className="mt-10 mb-10"
          {...register("expenseDate", {
            required: "Please enter date",
          })}
        />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="documents">Upload Documents</InputLabel>
        <input
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx"
          onChange={handleFileSelect}
          className="mt-10 mb-10"
        />
      </FormControl>
      {fileList.length > 0 && (
        <div className="mt-4 mb-4 border p-4 rounded">
          <h3 className="mb-3">Selected Files ({fileList.length})</h3>
          {fileList.map((fileItem, index) => (
            <div
              key={index}
              className="flex items-center gap-3 mb-3 p-3 border rounded bg-gray-50"
            >
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">
                  Original: {fileItem.originalName}
                </p>
                <Input
                  type="text"
                  placeholder="Enter file name (e.g., Receipt_Hotel_NYC)"
                  value={fileItem.userName}
                  onChange={(e) => updateFileName(index, e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Add New Travel Expense"}
      </Button>
    </form>
  );
}
export default NewExpenseForm;
