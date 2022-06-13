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
      <h1> Bienvenidos a la página de inicio!</h1>
    </div>
  );
};

export default Main;
