//import React, { Profiler, useState } from "react";
//import {useParams} from "react-router-dom"
import { fetchProviderStatus, providerType } from "../../types/providerTypes";
import { useDispatch, useSelector } from "react-redux";
import ProviderForm from "./ProviderForm";
import { RootState } from "../../app/store";
import { getAllProviders, selectProviderFetchError, selectProviderState, selectProviderStatus } from "../../features/providerSlice";
import { useEffect } from "react";

interface IProviderProps {
  provider?: providerType
}

const Provider:React.FC<IProviderProps> = () => {
  const dispatch = useDispatch()
  const error = useSelector(selectProviderFetchError())
  const status = useSelector(selectProviderStatus())
  const providersState = useSelector(selectProviderState())

  const providers = useSelector((state: RootState) => state.providers.providers);

  useEffect(() => {
    if (status === fetchProviderStatus.IDLE) {
      dispatch(getAllProviders())
    }
  }, [dispatch])

  console.log(status)

  const renderList = () => {
    if(error) return <p><b>¡ERROR!</b> Unable to display questions.</p>
  
    if(providersState) return providers.map((provider) => {
      return (
        <tr key={provider.id}>
            <td>{provider.name}</td>
            <td>{provider.passport}</td>
            <td>{provider.email}</td>
        </tr>
      );
    });
  };

  return (
    <div className="table-responsive">
      <h1>Providers!</h1>
      <table className="table table-xl table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Passport</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
          <tbody>{renderList()}</tbody>
      </table>
    <ProviderForm />
    </div>
    
  );
};

export default Provider;
