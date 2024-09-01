import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ButtonViewDetail } from "./ButtonViewDetail";

interface Pokemon {
    name: string;
    url: string;
}

export const Table = () => {
    const [dataPokemon, setDataPokemon] = useState<Pokemon[]>([])
    const [pageSize, setPageSize] = useState<number>(5)
    const [page, setPage] = useState<number>(1)

    const fetchData = async (): Promise<void> => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50', {
                method: 'GET',
            })

            const data = await response.json()
            setDataPokemon(data.results)
        } catch (error) {
            console.log(error);
        }
    }

    const prevPage = (): void => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    const nextPage = (): void => {
        if (page < Math.ceil(dataPokemon.length / pageSize)) {
            setPage(page + 1);
        }
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = dataPokemon.slice(startIndex, endIndex);

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="flex justify-center flex-col mt-7">
            <div className="w-full flex flex-col items-center">
                <div className="mb-4 w-9/12 mx-auto self-start">
                    <label htmlFor="pageSize" className="mr-2">Show</label>
                    <select 
                        id="pageSize" 
                        value={pageSize} 
                        onChange={(e) => {
                            const value = e.target.value === 'all' ? dataPokemon.length : Number(e.target.value);
                            setPageSize(value);
                            setPage(1);
                        }} 
                        className="border border-gray-300 rounded px-2 py-1"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value="all">All</option>
                    </select>
                    <label htmlFor="pageSize" className="ml-2">Entries</label>
                </div>
                <table className="table-fixed w-9/12 border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="w-14 border border-gray-300 p-2">No</th>
                            <th className="border border-gray-300 p-2">Pokemon</th>
                            <th className="border w-1/5 border-gray-300 p-2">Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((pokemon, index) => {
                            const idPokemon: number = startIndex + index + 1
                            return (
                                <tr key={startIndex + index + 1} className={index % 2 === 0 ? 'bg-white capitalize hover:bg-gray-100' : 'bg-gray-50 hover:bg-gray-100 capitalize'}>
                                    <td className="border border-gray-300 p-2">{startIndex + index + 1}</td>
                                    <td className="border border-gray-300 p-2">{pokemon.name}</td>
                                    <td className="border border-gray-300 p-2 flex justify-center">
                                        <ButtonViewDetail pokemon={pokemon} index={idPokemon} />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3}>
                                <div className="py-4 px-4 flex justify-between items-center">
                                    <div className="flex items-center join">
                                        <button 
                                            className={`py-4 px-4 flex justify-between text-gray-400 items-center ${page !== 1 ? 'hover:text-gray-500' : ''}`}
                                            onClick={prevPage}
                                            disabled={page === 1}
                                        >
                                            <IoIosArrowBack />
                                        </button>
                                        <div className="text-base flex space-x-4 px-2 py-2 text-gray-500">
                                            Page {page}
                                        </div>
                                        <button 
                                            className={`text-lg text-gray-400 px-4 py-2 rounded ${page === Math.ceil(dataPokemon.length / pageSize) ? '' : 'hover:text-gray-500'}`}
                                            onClick={nextPage}
                                            disabled={page === Math.ceil(dataPokemon.length / pageSize)}
                                        >
                                            <IoIosArrowForward />
                                        </button>
                                    </div>
                                    <span className="text-gray-500">
                                        Showing {startIndex + 1} to {Math.min(endIndex, dataPokemon.length)} of {dataPokemon.length} results
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}
