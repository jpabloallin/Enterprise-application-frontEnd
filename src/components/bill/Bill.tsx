import * as React from 'react';
import { billType } from '../../types/billTypes';

interface IBillProps {
  bill: billType
}

const Bill: React.FunctionComponent<IBillProps> = ({bill}) => {
  return (
    <tr>
      <td>{ bill.client}</td>
      <td>{ bill.seller}</td>
      <td>{ bill.total}</td>
      <td>{ bill.date}</td>
    </tr>
  );
};

export default Bill;