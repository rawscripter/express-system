import React, { useState, createContext } from 'react';
import { fetchProduct } from './prodcut.service';

export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {

    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSearch = (barcode) => {
        console.log(barcode);
        setIsLoading(true);
        setError(null);
        fetchProduct(barcode)
            .then(response => {
                setProduct(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
            });
    };

    return (
        <ProductContext.Provider value={{
            product,
            isLoading,
            error,
            onSearch
        }}>
            {children}
        </ProductContext.Provider>
    )
}