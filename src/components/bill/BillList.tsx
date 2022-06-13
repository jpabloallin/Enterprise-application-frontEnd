import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react"
import { getAllBills, selectBillError, selectBillState, selectBillStatus } from '../../features/billSlice';
import { fetchBillStatus } from '../../types/billTypes';
import Bill from './Bill';
import BillForm from './BillForm';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store';

interface IBillListProps {
}

const BillList: React.FunctionComponent<IBillListProps> = () => {
  
  const dispatch = useDispatch();
  const bills = useSelector(selectBillState)
  const billStatus = useSelector(selectBillStatus)
  const billError = useSelector(selectBillError)

  const { user } = useSelector((state: RootState) => state.logged);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (billStatus === fetchBillStatus.IDLE){
      dispatch(getAllBills())
    }
   }, [dispatch])
  
  
  return (
    <>
    <BillForm />
    <div className="row">
    
    <div className="col-md">
    
        <div className="border border-dark bg-success text-white p-2">
            <h5>Bills</h5>
        </div>
        <div className="card card-body">
            <table className="table table-lg table-hover">
              <thead className="thead-dark bg-dark text-white p-2">
                  <tr>
                      <th>Customer name:</th>
                      <th>Seller name:</th>                
                      <th>Total</th>
                      <th>Date:</th>
                  </tr>
                </thead>  
                <tbody>
                {!billError && bills.map((bill) => <Bill key={bill.id} bill={bill}/>)}
              </tbody>
            </table>
        </div>
    </div>
  </div>
    </>
  );
};

export default BillList;