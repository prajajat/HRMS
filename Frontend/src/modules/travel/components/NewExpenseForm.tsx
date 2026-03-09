import {
  Button,
  FormControl,
  Input, 
  MenuItem,
  Select,
} from "@mui/material";
import {
  useCreateExpense,
  useGetAllCurrencies,
  useGetCurrencyInINR,
} from "../queries/TravelQueries";
import { useForm } from "react-hook-form";
import {  useState } from "react"; 

function NewExpenseForm({ travelerId, ownerType }) {
  
  const { mutate, isPending, reset } =useCreateExpense(travelerId);
  const { isLoading: isLoadingAllCurrencies,data: dataAllCurrencies, isError: isErrorAllCurrencies } = useGetAllCurrencies();
  const {isLoading: isLoadingINR,data: dataINR, isError: isErrorINR } = useGetCurrencyInINR();

  const { register, handleSubmit, watch } = useForm({ shouldUseNativeValidation: true,});
  const watchAmount = watch("amount");
  const watchCurrency = watch("currency", "inr");
  const [fileList, setFileList] = useState([]);
  const [amountInINR, setAmountInINR] = useState();
 
  //functions
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

  const  Converter = () => {
    if(isLoadingINR||isErrorINR)return 0;
    return watchAmount / dataINR?.data.inr[watchCurrency];
  };

  const onSubmit = (data) => {
    const filesWithoutNames = fileList.filter((f) => !f.userName.trim());
    if (filesWithoutNames.length > 0) {
      alert("Please provide names for all files");
      return;
    }
    const formData = new FormData();
    const expenseDTO = {
      amount: amountInINR,
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
        reset();
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4  rounded-lg bg-blue-100 w-full max-w-2xl space-y-4 flex flex-col"
    >  Add new Expense
    <hr />
       {
        isErrorAllCurrencies&& <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-600">Failed to load </p>
        </div>
       }
      {!isLoadingAllCurrencies && dataAllCurrencies != undefined && (
        <FormControl>
          <label>Currency</label>
          <Select
            type="text"
            defaultValue=""
            className="mt-10 mb-10"
            {...register("currency")}
            onBlur={() => { 
              setAmountInINR(Converter());
            }}
          >
            <MenuItem value={"inr"}> {dataAllCurrencies.data.inr}</MenuItem>
            <MenuItem value={"aud"}> {dataAllCurrencies.data.aud}</MenuItem>
            <MenuItem value={"eur"}> {dataAllCurrencies.data.eur}</MenuItem>
            <MenuItem value={"jpy"}> {dataAllCurrencies.data.jpy}</MenuItem>
            <MenuItem value={"mxn"}> {dataAllCurrencies.data.mxn}</MenuItem>
            <MenuItem value={"cad"}> {dataAllCurrencies.data.cad}</MenuItem>
          </Select>
        </FormControl>
      )}
      <FormControl>
        <label htmlFor="amount">Amount</label>
         <p className="text-green-800 text-sm">in INR {amountInINR}</p>
        <Input
          type="number"
          className="mt-10 mb-10"
          {...register("amount", {
            required: "Please enter amount",
            min: { value: 0, message: "Amount must be positive" },
          })}
          onBlur={() => { 
            setAmountInINR(Converter());
          }}
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
        <label htmlFor="date">Date</label>
        <Input
          type="datetime-local"
          className="mt-10 mb-10"
          {...register("expenseDate", {
            required: "Please enter date",
          })}
        />
      </FormControl>

      <FormControl>
        <label htmlFor="documents">Upload Documents</label>
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
