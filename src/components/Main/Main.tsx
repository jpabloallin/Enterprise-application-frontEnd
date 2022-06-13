import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import { getAllBills } from "../../features/billSlice";
import { getAllProducts } from "../../features/productSlice";
import { getAllProviders } from "../../features/providerSlice";
import { getAllReceipts } from "../../features/receiptSlice";

const Main = () => {

  const { user } = useSelector((state: RootState) => state.logged);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
      dispatch(getAllProviders())
   }, []);

   useEffect(() => {
      dispatch(getAllProducts())
   }, [])

   useEffect(() => {
      dispatch(getAllReceipts())
   }, [])

   useEffect(() => {
      dispatch(getAllBills())
   }, [])

  return (
    <div>
      <h1 className="p-4"> Welcome to Don Raul’s Hardware store!</h1>
      <img 
      src='https://previews.123rf.com/images/joyskifranzi/joyskifranzi1407/joyskifranzi140700049/29813184-ilustraci%C3%B3n-de-un-conjunto-de-software-y-hardware-de-la-computadora-incluyendo-pantallas-perif%C3%A9ricos.jpg'
      className='img-thumbnail pb-4'
      alt='...'
      style={{ maxWidth: '31rem' }}
    />
    </div>
  );
};

export default Main;
