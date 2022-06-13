import * as React from 'react';
import { productSoldType } from '../../types/billTypes';

interface IProductsSoldListProps {
    items: productSoldType[]
}

const ItemList: React.FunctionComponent<IProductsSoldListProps> = ({items}) => {
  return (
    <>
    <div className="card card-body">
                <table className="justTable">
                  <tbody>
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

export default ItemList;