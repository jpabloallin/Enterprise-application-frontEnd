//import React, { Profiler, useState } from "react";
//import {useParams} from "react-router-dom"
import { providerType } from "../../types/providerTypes";
import { useDispatch, useSelector } from "react-redux";
import ProviderForm from "./ProviderForm";
import { RootState } from "../../app/store";

interface IProviderProps {
  provider?: providerType
}

const Provider:React.FC<IProviderProps> = () => {
  

  const providers = useSelector((state: RootState) => state.providers.providers);

  const renderList = () => {
    return providers.map((provider) => {
      return (
        <li className="list-group-item list-group-item-info d-flex justify-content-around" key={provider.id}>
          <div>
            <h2>{provider.name}</h2>
          </div>
          <div>
            <h2>{provider.passport}</h2>
          </div>
          <div>
            <h3>{provider.email}</h3>
          </div>
        </li>
      );
    });
  };

  return (
    <div>
      <h1>Providers!</h1>
      <ul>{renderList()}</ul>
      <ProviderForm />
    </div>
  );
};

export default Provider;
