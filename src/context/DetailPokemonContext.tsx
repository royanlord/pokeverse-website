import { createContext, ReactNode, useState } from "react";

interface DetailPokemonContextValue {
    data: any;
    setData: (data: any) => void;
    showDetailPokemon: (index: number) => Promise<void>
}

interface DetailPokemonProviderProps {
    children: ReactNode;
}

const defaultValue: DetailPokemonContextValue = {
    data: null,
    setData: () => {},
    showDetailPokemon: async () => {},
};

export const DetailPokemonContext = createContext<DetailPokemonContextValue>(defaultValue)

export const DetailPokemonProvider = ({ children }: DetailPokemonProviderProps) => {
    const [data, setData] = useState<any>(null);

    const showDetailPokemon = async (index: number) => {
        console.log(index);
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
            const result = await response.json();
            console.log(result);
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    
    return (
        <DetailPokemonContext.Provider value={{ data, setData, showDetailPokemon }}>
            {children}
        </DetailPokemonContext.Provider>
    )
}