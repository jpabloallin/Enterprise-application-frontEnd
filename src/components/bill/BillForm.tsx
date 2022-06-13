import * as React from 'react';
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from '@reduxjs/toolkit';
import { clearProductsSoldReducer, getItems } from '../../features/productSoldSlice';
import { updateProduct } from '../../features/productSlice';
import { billType, productSoldType } from '../../types/billTypes';
import { createBill } from '../../features/billSlice';
import ProductsSoldForm from '../item/ProductsSoldForm';

interface IBillFormProps {
}

const BillForm: React.FunctionComponent<IBillFormProps> = () => {
  
  const [client, setClient] = useState('')
  const [seller, setSeller] = useState('')
  const items = useSelector(getItems);

  const dispatch = useDispatch() 

   const onAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(items.length !== 0){
      const total = items.reduce((subTotal, nextSubTotal) => subTotal + nextSubTotal.subTotal, 0)
      const newBill: billType =
      {
        id: nanoid(),
        client: client,
        seller: seller,
        total: total,
        productsSold: items,
      }

      items.forEach(async(item: productSoldType) => {
        return dispatch(updateProduct(
          {
            id: item.id,
            name: item.name,
            description: item.description,
            minimumUnits: item.minimumUnits,
            maximumUnits: item.maximumUnits,
            currentUnits: item.balance,
            price: item.price,        
            provider: item.provider
	        }))
      })
      
      //updateProducts(items)
      dispatch(createBill(newBill)) 
      setClient('')
      setSeller('')
      dispatch(clearProductsSoldReducer())
    }}  
  
  return (
    <div className="row">
      <div className="col-md">
        <div className="border border-dark bg-success text-white">
          <h2>Create a Bill</h2>
        </div>
        <div className="card card-body">
          <form onSubmit={(e) => onAdd(e)}>
            <div className="row">
            <div className="form-group col-md-6">
                <input type="text" className="form-control" name='cliente' placeholder="Cliente name" value={client}
                  onChange={(e) => setClient(e.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <input type="text" className="form-control" name='sellerName' placeholder="Seller name" value={seller}
                  onChange={(e) => setSeller(e.target.value)}
                />
              </div>
            </div>  
            <ProductsSoldForm />          
            <button type="submit" className="btn btn-success mb-2 mt-3 btn-outline-dark btn-lg">Generate Bill</button>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default BillForm;