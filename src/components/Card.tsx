import { useEffect, useState } from "react";

interface Pokemon {
    name: string;
    url: string;
}
export default function Card() {
    const [dataPokemon, setDataPokemon] = useState<Pokemon[]>([])
    const fetchData = async (): Promise<void> => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon', {
                method: 'GET',
            })

            const data = await response.json()
            setDataPokemon(data.results)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <>
            {dataPokemon.map((pokemon, index) => {
                return (
                    <div key={index} className='border-solid border-2 w-52 rounded-lg shadow-lg mt-5'>
                        <img src={pokemon.url} alt={pokemon.name} className='w-full h-32 object-cover rounded-t-lg' />
                        <div className='p-4'>
                            <h1 className='text-red-500 text-xl'>{pokemon.name}</h1>
                            <p className='text-gray-700'>This is a card body content.</p>
                        </div>
                    </div>
                )
            })}
        </>
    )
}
