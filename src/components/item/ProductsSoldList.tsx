import * as React from 'react';
import { productSoldType } from '../../types/billTypes';

interface IProductsSoldListProps {
    items: productSoldType[]
}

const ProductsSoldList: React.FunctionComponent<IProductsSoldListProps> = ({items}) => {
  return (
    <>
    <div className="mt-3">
                <table className="table table-lg">
                  <tbody className="thead-dark bg-dark text-white p-2">
                      <tr>
                          <th>Product:</th>
                          <th>Current Units</th>                
                          <th>Price</th>
                          <th>Subtotal</th>
                      </tr>
                    </tbody>  
                    <tbody>
                        {items.map((item)=>(
                        item !== null && 
                        <tr key={item.id}>
                            <td>{ item.name}</td>
                            <td>{ item.currentUnits}</td>
                            <td>{ item.price}</td>
                            <td>{ item.subTotal}</td>                           
                        </tr>          
                        ))}
                    </tbody>
                </table>
            </div>
    </>
  );
};

export default ProductsSoldList;