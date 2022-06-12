import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllProducts } from '../../features/productSlice'
import { getAllProviders } from '../../features/providerSlice'
import { getAllReceipts } from '../../features/receiptSlice'

const Main = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    
    dispatch(getAllProviders())
    
  }, [])

  useEffect(() => {
    
    dispatch(getAllProducts())
    
  }, [])
  useEffect(() => {
    
    dispatch(getAllReceipts())
    
  }, [])

  return (
    <div>
        <h1> Bienvenidos a la página de inicio!</h1>
    </div>
  )
}

export default Main