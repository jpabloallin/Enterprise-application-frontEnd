import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { productType } from "../../types/productTypes";
import { getAllProducts, selectProductState } from "../../features/productSlice";
import { addProductSoldReducer, getItems } from "../../features/productSoldSlice";
import { productSoldType, soldProductsType } from "../../types/billTypes";
import ItemList from "./ProductsSoldList";

interface IItemFormProps {}

const ProductsSoldForm: React.FunctionComponent<IItemFormProps> = (props) => {
  const [product, setProduct] = useState({} as productType);
  const [currentUnits, setCurrentUnits] = useState<any>(0);
  const products = useSelector(selectProductState());
  const items = useSelector(getItems);

  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const addProduct = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProduct = products.find((p) => p.id === e.target.value)
    if(selectedProduct){
        setProduct(selectedProduct)
    }
  };

  const onAdd = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if(currentUnits && product && product.currentUnits >= currentUnits){
       const newItem: productSoldType = 
       {
        id: product.id,
        name: product.name,
        description: product.description,
        minimumUnits: product.minimumUnits,
        maximumUnits: product.maximumUnits,
        currentUnits: currentUnits,
        price: product.price,
        subTotal: currentUnits*product.price,
        balance: product.currentUnits - currentUnits,
        provider: product.provider
       }
       
       dispatch(addProductSoldReducer(newItem))
       setCurrentUnits(0)
       setProduct({} as productType)
    }else{
        setCurrentUnits(0)
        setProduct({} as productType)
    }
  };

  return (
    <>
      <div className="row">
        <div>
          <div className="row m-2">
            <div className="form-group col-md-4 mt-4">
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => addProduct(e)}
              >
                <option selected disabled>Select product</option>
                {products.map((prod) => (
                  <option key={prod.id} value={prod.id}>
                    {prod.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group col-md-4 d-flex align-items-center pt-3">
              <label className= "p-3">Units</label>
              <input
                type="number"
                className="form-control"
                name="currentunits"
                placeholder="currentunits"
                value={currentUnits}
                onChange={(e) => setCurrentUnits(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <button onClick={(e) => onAdd(e)} type="submit" className="btn btn-success mt-4 btn-outline-dark btn-lg">
                Add product
              </button>
            </div>
          </div>
        </div>
        <ItemList items={items}/>
      </div>
    </>
  );
};

export default ProductsSoldForm;