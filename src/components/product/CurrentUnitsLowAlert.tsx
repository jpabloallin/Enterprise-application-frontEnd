import * as React from "react"
import {useSelector} from "react-redux";
import {Alert} from "@mantine/core";
import {AlertCircle} from "tabler-icons-react";
import { selectProductState } from "../../features/productSlice";

interface IProps {
}

const CurrentUnitsLowAlert: React.FC<IProps> = () => {
    const products = useSelector(selectProductState())
    const productWithLowCurrentUnits = products.filter(product => product.currentUnits <= product.minimumUnits).map(p => p.name)
    return <>
        {
            (productWithLowCurrentUnits.length > 0) &&
            <Alert icon={<AlertCircle size={16}/>} title="¡Low Supply!" color="red">
                {productWithLowCurrentUnits.join(", ")}
            </Alert>

        }


    </>
}

export default CurrentUnitsLowAlert
