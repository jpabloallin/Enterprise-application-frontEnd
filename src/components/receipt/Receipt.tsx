import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../app/store'
import { getAllProducts, selectProductState} from '../../features/productSlice'
import { getAllProviders, selectProviderState } from '../../features/providerSlice'
import { getAllReceipts, selectReceiptFetchError, selectReceiptState } from '../../features/receiptSlice'
import { receiptType } from '../../types/receiptTypes'
import ReceiptForm from './ReceiptForm'

interface IReceiptProps { 
  receipt?: receiptType
}

const Receipt:React.FC<IReceiptProps> = () => {
  const dispatch = useDispatch()
  const error = useSelector(selectReceiptFetchError())
  const receiptsState = useSelector(selectReceiptState())
  const receipts = useSelector((state: RootState) => state.receipts.receipts);
  const products = useSelector(selectProductState())
  const providers = useSelector(selectProviderState())
  const { user } = useSelector((state: RootState) => state.logged);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  useEffect(() => {
    dispatch(getAllReceipts())
  }, [])

  useEffect(() => {
    dispatch(getAllProviders())
  }, [])


  const renderList = () => {
    if(error) return <p><b>¡ERROR!</b> Unable to display receipts.</p>
    if(receiptsState && products.length>0 && providers.length>0)  return receipts.map((receipt) => {
      const productName = products.find(product => product.id === receipt.productId)!.name
      const providerName = providers.find(provider => provider.id === receipt.providerId)?.name
      return (
        <tr key={receipt.id}>
            <td>{receipt.date}</td>
            <td>{productName}</td>
            <td>{receipt.units}</ td>
            <td>{providerName}</td>
        </tr>
      );
    });
  };

  return (
    <div className="table-responsive ">
      <div className="border border-dark bg-success text-white"><h2>Receipts</h2></div>
      <table className="table table-lg table-hover">
        <thead className="thead-dark bg-dark text-white">
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Product</th>
            <th scope="col">Units</th>
            <th scope="col">Provider</th>
          </tr>
        </thead>
          <tbody>{renderList()}</tbody>
      </table>
    <ReceiptForm/>
    </div>
  );
}

export default Receipt