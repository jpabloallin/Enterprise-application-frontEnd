import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import { getAllProducts } from "../../features/productSlice";
import { getAllProviders } from "../../features/providerSlice";
import { getAllReceipts } from "../../features/receiptSlice";

const Main = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.logged);

  const navigate = useNavigate();

  console.log(user);

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <h1> Bienvenidos a la página de inicio!</h1>
    </div>
  );
};

export default Main;
