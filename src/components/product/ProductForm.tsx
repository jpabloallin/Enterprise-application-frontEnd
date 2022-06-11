import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { createProduct } from "../../features/productSlice";
import { productType } from "../../types/productTypes";
import { providerType } from "../../types/providerTypes";

interface IProductFormProps { }

const ProductForm: React.FC<IProductFormProps> = (props) => {
    
    // <select name="" id="" onChange={e => setProviderId(e.target.value)}>
    //             {providers.map((provider) => 
    //             <option key={provider.id} value = {provider.id}> 
    //               {provider.name} 
    //             </option>)}
    //           </select>
    const providers = useSelector((state: RootState) => state.providers.providers);
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [currentUnits, setCurrentUnits] = useState<any>(0)
    const [minimumUnits, setMinimumUnits] = useState<any>(0)
    const [maximumUnits, setMaximumUnits] = useState<any>(0)
    const [price, setPrice] = useState<any>(0)
    const [provider, setProvider] = useState({} as providerType)
    const dispatch = useDispatch()

    const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const providerValues = providers.find((p) => p.id === e.target.value)
        if (providerValues) return setProvider(providerValues)
    }
    console.log('provider :>> ', provider);

    const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(name && currentUnits && minimumUnits && maximumUnits && price && provider) {
        //dispatch
        console.log('objectProvider :>> ', provider);
        const newProduct:productType = {id:nanoid(), name:name, description:description, currentUnits:currentUnits, minimumUnits:minimumUnits, maximumUnits:maximumUnits , price:price , provider:provider}
        dispatch(createProduct(newProduct))    
        setName('')
        setDescription('')
        setCurrentUnits(0)
        setMinimumUnits(0)
        setMaximumUnits(0)
        setPrice(0)
    }
}

  return (
    <>
    <form className="form-inline" onSubmit={(e) => handleClick(e)}>
        <div className="form-group row ml-3">
            <label className="col-sm-1 col-form-label">Name</label>
            <div className="col-sm-10 ml-5">
                <input type="text" name="name" id="name" placeholder="Name" className="form-control mb-4" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
        </div>
        <div className="form-group row ml-3">
            <label className="col-sm-1 col-form-label">Description</label>
            <div className="col-sm-10 ml-5">
                <input type="text" name="description" id="description" placeholder="Description" className="form-control mb-4" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
        </div>
        <div className="form-group row">
            <label className="col-sm-1 col-form-label">Current Units</label>
            <div className="col-sm-10">
                <input type="number" name="currentUnits" id="currentUnits" placeholder="Current Units" className="form-control mb-4" value={currentUnits} onChange={(e) => setCurrentUnits(e.target.value)}/>
            </div>
        </div>
        <div className="form-group row">
            <label className="col-sm-1 col-form-label">Minimum Units</label>
            <div className="col-sm-10">
                <input type="number" name="minimumUnits" id="minimumUnits" placeholder="Minimum Units" className="form-control mb-4" value={minimumUnits} onChange={(e) => setMinimumUnits(e.target.value)}/>
            </div>
        </div>
        <div className="form-group row ml-3">
            <label className="col-sm-1 col-form-label">Maximum Units</label>
            <div className="col-sm-10 ml-5">
                <input type="number" name="maximumUnits" id="maximumUnits" placeholder="Maximum Units" className="form-control mb-4" value={maximumUnits} onChange={(e) => setMaximumUnits(e.target.value)}/>
            </div>
        </div>
        <div className="form-group row">
            <label className="col-sm-1 col-form-label">Price</label>
            <div className="col-sm-10">
                <input type="number" name="price" id="price" placeholder="price" className="form-control mb-4" value={price} onChange={(e) => setPrice(e.target.value)}/>
            </div>
        </div>
        <select name="" id="" onChange={e => handleChange(e)}>
            {providers.map((provider) => (
                <option  key={provider.id} value={provider.id}>{provider.name}</option>
                ))}
        </select>
        <div className="text-center">
            <button type="submit" className="btn btn-success mb-4 btn-outline-dark btn-lg">
                Create product
            </button>
        </div>

    </form>
    </>
  );
}

export default ProductForm;