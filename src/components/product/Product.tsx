import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { deleteProduct, getAllProducts, selectProductFetchError, selectProductState, selectProductStatus } from '../../features/productSlice'
import { fetchProductStatus, productType } from '../../types/productTypes'
import ProductForm from './ProductForm'

interface IProductProps { 
  product?: productType
}


const Product:React.FC<IProductProps> = () => {
  const dispatch = useDispatch()
  const error = useSelector(selectProductFetchError())
  const status = useSelector(selectProductStatus())
  const productsState = useSelector(selectProductState())

  const products = useSelector((state: RootState) => state.products.products);

  useEffect(() => {
    if (status === fetchProductStatus.IDLE) {
      dispatch(getAllProducts())
    }
  }, [dispatch])

  const handleDeletion = (product: productType) => {
    dispatch(deleteProduct(product))
  }

  const renderList = () => {
    if(error) return <p><b>¡ERROR!</b> Unable to display products.</p>
  
    if(productsState) return products.map((product) => {
      return (
        <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.currentUnits}</td>
            <td>{product.minimumUnits}</td>
            <td>{product.maximumUnits}</td>
            <td>{product.price}</td>
            <td><button className="btn btn-success btn-outline-dark" type="button" key={product.id} onClick={() => handleDeletion(product)}>Delete</button></td>
        </tr>
      );
    });
  };

  return (
    <div className="table-responsive ">
      <div className="border border-dark bg-success text-white"><h2>Products</h2></div>
      <table className="table table-lg table-hover">
        <thead className="thead-dark bg-dark text-white">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Current Units</th>
            <th scope="col">Minimun Units</th>
            <th scope="col">Maximun Units</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
          <tbody>{renderList()}</tbody>
      </table>
    <ProductForm />
    </div>
    
  );
}

export default Product