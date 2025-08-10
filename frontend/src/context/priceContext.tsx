
import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";



interface priceInterface {
    price: number
    setPrice: React.Dispatch<React.SetStateAction<number>>
    annual: boolean
    setAnnual: React.Dispatch<React.SetStateAction<boolean>>
}

const PriceContext = createContext<priceInterface | undefined>(undefined)


// Provider props
type PriceProviderProps = {
    children: React.ReactNode;
};

export const PriceProvider = ({ children }: PriceProviderProps) => {

    const [price, setPrice] = useState(6) // default price
    const [annual, setAnnual] = useState(true)

    return (
        <PriceContext.Provider value={{ price, setPrice, annual, setAnnual }}>
            {children}
        </PriceContext.Provider>
    )
}


export const usePriceContext = () => {
    const context = useContext(PriceContext);
    if (context === undefined) {
        throw new Error("usePriceContext must be used within a PriceProvider");
    }
    return context;
};

