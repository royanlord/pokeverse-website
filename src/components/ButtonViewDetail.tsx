import { useContext } from "react";
import { IoMdOpen } from "react-icons/io"
import { Link } from "react-router-dom"
import { DetailPokemonContext } from "../context/DetailPokemonContext";

interface Pokemon {
    name: string;
    url: string;
}

interface ButtonViewDetailProps {
    pokemon: Pokemon;
    index: number
}

export const ButtonViewDetail = ({ pokemon, index }: ButtonViewDetailProps) => {
    const { showDetailPokemon } = useContext(DetailPokemonContext)

    return (
        <Link
            to={`/${pokemon.name}/${index}`}
            onClick={() => showDetailPokemon(index)}
        >
            <button 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex justify-between items-center gap-1"
            >
                Detail <IoMdOpen className="text-lg" />
            </button>
        </Link>
    )
}
