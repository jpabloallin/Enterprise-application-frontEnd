import { fetchProviderStatus, providerType } from "../../types/providerTypes";
import { useDispatch, useSelector } from "react-redux";
import ProviderForm from "./ProviderForm"
import { RootState } from "../../app/store";
import { deleteProvider, getAllProviders, selectProviderFetchError, selectProviderState, selectProviderStatus } from "../../features/providerSlice";
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

  const handleDeletion = (provider: providerType) => {
    dispatch(deleteProvider(provider))
  }


  const renderList = () => {
    if(error) return <p><b>¡ERROR!</b> Unable to display providers.</p>
  
    if(providersState) return providers.map((provider) => {
      return (
        <tr key={provider.id}>
            <td>{provider.name}</td>
            <td>{provider.passport}</td>
            <td>{provider.email}</td>
            <td><button className="btn btn-success btn-outline-dark" type="button" key={provider.id} onClick={() => handleDeletion(provider)}>Delete</button></td>
        </tr>
      );
    });
  };

  return (
    <div className="table-responsive ">
      <div className="border border-dark bg-success text-white"><h2>Providers</h2></div>
      <table className="table table-lg table-hover">
        <thead className="thead-dark bg-dark text-white">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Passport</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
          <tbody>{renderList()}</tbody>
      </table>
    <ProviderForm />
    </div>
    
  );
};

export default Provider;
