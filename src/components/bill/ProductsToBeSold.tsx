import * as React from "react"
import {useSelector} from "react-redux";
import {selectProductById} from "../../features/productSlice";
import {productType, IProductToBeSold} from "../../types/productTypes";
import {Alert, Box, Button, Group, Text} from "@mantine/core";
import {AlertCircle} from "tabler-icons-react";

interface IProps {
    productId: string
    idCallbackSetter: React.Dispatch<React.SetStateAction<string[]>>
    callbackSetter: React.Dispatch<React.SetStateAction<IProductToBeSold[]>>
}

const ProductsToBeSold: React.FC<IProps> = ({productId, callbackSetter, idCallbackSetter}) => {
    const product = useSelector(selectProductById(productId)) as productType
    const [units, setUnits] = React.useState(0)
    const [disableButtons, setDisableButtons] = React.useState(false)
    const productToSell: IProductToBeSold = {
        id: `${product.id}`,
        name: product.name,
        units,
        currentUnits: product.currentUnits,
        minimumUnits: product.minimumUnits,
        maximumUnits: product.maximumUnits,
        price: product.price,
    }

    const handleConfirmToList = (product: IProductToBeSold) => {
        callbackSetter((prev) => [...prev, product])
        setDisableButtons(true)
    }

    const handleSelfRemoval = (product: IProductToBeSold) => {
        callbackSetter((prev) => prev.filter(p => p.id !== product.id))
        idCallbackSetter((prev) => prev.filter(value => value !== product.id))
    }

    //show alerts
    const handlePlus = () => {
        setUnits((prev) => {
            const step = prev + 1;
            if (step <= productToSell.currentUnits) {
                return step
            }
            return prev
        })
    }

    //show alerts
    const handleMinus = () => {
        setUnits((prev) => {
            const step = prev - 1
            if (step <= productToSell.currentUnits && step >= 0) {
                return step
            }
            return prev
        })
    }

    const showStockAlert = productToSell.currentUnits === units
    const showStockWarning = (productToSell.currentUnits - productToSell.minimumUnits) <= units
    const disableConfirmButton = units > 0
    return <>
        <Box sx={{maxWidth: 500}} mx="auto">

            {
                showStockAlert &&
                <Alert icon={<AlertCircle size={16} />} title="Stock" color="red">
                    This sell will deplete your stock!
                </Alert>
            }
            {
                (showStockWarning && !showStockAlert ) &&
                <Alert icon={<AlertCircle size={16} />} title="Stock" color="yellow">
                    This sell will lower your stock!
                </Alert>
            }

                <Group mb="xs" mt="md">
                    <Text weight={500} size="sm" sx={{flex: 1}}>
                         {productToSell.name} - stock: {productToSell.currentUnits}
                    </Text>
                    <Text weight={500} size="sm" sx={{flex: 1}}>
                        Price: {productToSell.price * units}
                    </Text>
                    <Text weight={500} size="sm" pr={90}>
                        Amount: {productToSell.units}
                    </Text>
                </Group>

            <Group position="center" mt="md">
                <Button disabled={disableButtons} onClick={handlePlus}>+</Button>
                <Button color='red' disabled={disableButtons} onClick={handleMinus}>-</Button>
                <Button color='green' disabled={!disableConfirmButton || disableButtons} onClick={() => handleConfirmToList(productToSell)}>confirm</Button>
                <Button color='red' disabled={!disableButtons} onClick={() => handleSelfRemoval(productToSell)}>Remove item</Button>
            </Group>
        </Box>
    </>
}

export default ProductsToBeSold