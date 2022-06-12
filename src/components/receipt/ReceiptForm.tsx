import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import * as currentDate from "moment";
import { receiptType } from "../../types/receiptTypes";
import { createReceipt } from "../../features/receiptSlice";
import { getAllProviders } from "../../features/providerSlice";
import { productType } from "../../types/productTypes";
import { updateProduct } from "../../features/productSlice";
import { Alert, NumberInput } from "@mantine/core";

interface IReceiptFormProps {}

const ReceiptForm: React.FC<IReceiptFormProps> = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProviders())
  }, [])

  const [productId, setProductId] = useState("");
  const [editProduct, setEditProduct] = useState<productType>();
  const [units, setUnits] = useState<any>(0);

  const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (productId && units) {
      const product = products.filter(p => p.id === productId)[0];
      const date = currentDate(new Date()).format("DD/MM/YYYY")
      const productToUpdate = editProduct as productType
      const newReceipt: receiptType = {id:nanoid(), date:date, providerId:product.provider.id, productId:productId, units:units};
      const updateProductCurrentUnits: productType = {...productToUpdate, currentUnits: productToUpdate?.currentUnits + units}
      //dispatch
      dispatch(createReceipt(newReceipt));
      dispatch(updateProduct(updateProductCurrentUnits))

      setProductId("");
      setUnits(0);
    }
  };

  useEffect(() => {
    const product = products.find(p => p.id === productId)
    setEditProduct(product)
    setUnits(0)
  }, [productId])


  return (
    <form onSubmit={(e) => handleClick(e)} className="w-1/2 mx-auto border-4">
      <div className="p-3 border border-dark bg-success text-white">
        <h3 className="text-lg text-center font-bold ">Create Receipt</h3>
      </div>
      <table className="w-full mx-auto pl-6 text-sm text-center rounded-lg">
        <thead className="bg-amber-500">
          <tr>
            <th className=" px-1 text-lg">Product Name</th>
            <th className=" px-5 text-lg">Units</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <select name="" id="" className="form-select form-select-sm mt-4"
                onChange={(e) => setProductId(e.target.value)}>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </td>

            {
            editProduct?.name && (
              <td className=" px-5">
              <>
                <NumberInput
                  min={0}
                  max={editProduct.maximumUnits - editProduct.currentUnits}
                  value={units}
                  onChange={(e) => setUnits(e)}
                  placeholder="Units"
                  label={`Product's stock: ${editProduct.currentUnits + units}/ ${
                    editProduct.maximumUnits
                  }`}
                  required
                />
                {editProduct.currentUnits + units >= editProduct.maximumUnits && (
                  <Alert title="¡Alert!" color="red">
                    Product's stock has reached its max limit: {editProduct.maximumUnits}!
                  </Alert>
                )}
              </>
              </td>
            )}
          </tr>
        </tbody>
      </table>
      <div className="mt-3">
        <button
          type="submit"
          className="btn btn-success mb-4 btn-outline-dark btn-lg">
          Get Receipt
        </button>
      </div>
    </form>
  );
};

// {
//   editProduct?.name &&
//   <>  
//     <input type="text" name="" id="" className="border-2 border-amber-500 rounded-md" minimumUnits={0} maximumUnits={editProduct.maximumUnits - editProduct.currentUnits} value={units}
//       onChange={(e) => setUnits(Number(e.target.value))} label= {`Product units: ${editProduct.currentUnits + units} / ${editProduct.maximumUnits}`}
//     />
//     {
//       (editProduct.currentUnits + units) >= editProduct.maximumUnits &&
//       <Alert title="Max Current Units" color="red">
//         Product's currents units have reached its max: {editProduct.maximumUnits}!
//       </Alert>
//     }
//   </>  
// }
export default ReceiptForm;
