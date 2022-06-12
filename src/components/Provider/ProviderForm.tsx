import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProvider } from "../../features/providerSlice";
import { providerType } from "../../types/providerTypes";

interface IProviderFormProps { }

const ProviderForm: React.FC<IProviderFormProps> = () => {
    
    const [name, setName] = useState('')
    const [passport, setPassport] = useState('')
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()

    const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(name && passport && email) {
        //dispatch
        const newProvider: providerType = {name, passport, email, id:nanoid()}
        dispatch(createProvider(newProvider))    
        setName('')
        setPassport('')
        setEmail('')
    }
}

  return (
    <>
    <form onSubmit={(e) => handleClick(e)}>
        <div className="form-group row ml-3">
            <label className="col-sm-1 col-form-label">Name</label>
            <div className="col-sm-10 ml-5">
                <input type="text" name="name" id="name" placeholder="Name" className="form-control mb-4" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
        </div>
        <div className="form-group row">
            <label className="col-sm-1 col-form-label">Passport</label>
            <div className="col-sm-10">
            <input type="text" name="passport" id="passport" placeholder="passport" className="form-control mb-4" value={passport} onChange={(e) => setPassport(e.target.value)}/>
            </div>
        </div>
        <div className="form-group row">
            <label className="col-sm-1 col-form-label">Email</label>
            <div className="col-sm-10">
                <input type="email" name="email" id="email" placeholder="email" className="form-control mb-4" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
        </div>
        <div className="text-center">
            <button type="submit" className="btn btn-success mb-4 btn-outline-dark btn-lg">
                Add provider
            </button>
        </div>
    </form>
    </>
  );
}

export default ProviderForm;
