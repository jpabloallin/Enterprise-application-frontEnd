import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import * as currentDate from "moment";
import { receiptType } from "../../types/receiptTypes";
import { createReceipt } from "../../features/receiptSlice";
import { getAllProviders } from "../../features/providerSlice";

interface IReceiptFormProps {}

const ReceiptForm: React.FC<IReceiptFormProps> = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProviders())
  }, [])

  const [productId, setProductId] = useState("");
  const [units, setUnits] = useState(0);

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (productId && units) {
      const product = products.filter(p => p.id === productId)[0];
      let date = currentDate(new Date()).format("DD/MM/YYYY")
      const newReceipt: receiptType = {id:nanoid(), date:date, providerId:product.provider.id, productId:productId, units:units};
      //dispatch
      dispatch(createReceipt(newReceipt));
    }
    setProductId("");
    setUnits(0);
  };

  return (
    <form
      onSubmit={(e) => handleClick(e)} className="w-1/2 mx-auto border-4">
      <div className="bg-orange-600 py-6">
        <h1 className="text-lg text-center font-bold">Create Receipt</h1>
      </div>
      <table className="w-full mx-auto pl-6 text-sm text-center rounded-lg">
        <thead className="bg-amber-500">
          <tr>
            <th className="p-6 px-50 text-lg">Product Name</th>
            <th className="p-6 px-50 text-lg">Units</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <select name="" id="" className="border-2 border-amber-500 rounded-md"
                onChange={(e) => setProductId(e.target.value)}
              >
              
                {products.map((product) => (
                  <option key={product.id} value={product.id} >
                    {product.name}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <input type="text" name="" id="" className="border-2 border-amber-500 rounded-md" value={units}
                onChange={(e) => setUnits(Number(e.target.value))}
              />
            </td>
          </tr>
        </tbody>
      </table>
        <div className="mt-3">
          <button type="submit" className="btn btn-success mb-4 btn-outline-dark btn-lg">
            Get Receipt
          </button>
        </div>
    </form>
  );
};

export default ReceiptForm;
