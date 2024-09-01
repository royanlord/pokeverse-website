import { useContext, useEffect, useState } from "react"
import { DetailPokemonContext } from "../context/DetailPokemonContext"
import { useParams } from "react-router-dom"
import { BreadCrumb } from "../components/BreadCrumb"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

interface Types {
    slot: number,
    type: {
        name: string,
        url: string
    }
}

interface Abilities {
    ability: {
        name: string,
        url: string
    },
}

export const DetailPokemon = () => {
    const { data, showDetailPokemon } = useContext(DetailPokemonContext)
    const { id } = useParams<{ id: string }>()
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (!data) {
            showDetailPokemon(Number(id));
        }
    }, [data, showDetailPokemon]);

    const getAbilities = () => {
        return data.abilities.map((ability: Abilities) => ability.ability.name).join(', ');
    };

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: data?.name || 'Loading...' }
    ];

    const images = [
        data?.sprites.front_default,
        data?.sprites.front_shiny,
        data?.sprites.back_default,
        data?.sprites.back_shiny,
    ].filter(Boolean);
    
    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
    
    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <>
            <BreadCrumb items={breadcrumbItems} />
            {data && (
                <div 
                    className='lg:w-2/5 mx-auto py-6 px-10 mb-14 rounded-lg'
                    style={{
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
                    }}
                >
                    <h1 className='text-center text-4xl capitalize font-semibold'>{data.name}</h1>
                    <div className="lg:w-4/5 mx-auto mt-7">
                        <div className="relative flex justify-center h-52 overflow-hidden">
                            <button 
                                onClick={handlePrevImage}
                                className="absolute top-1/2 transform -translate-y-1/2 left-4"
                            >
                                <IoIosArrowBack className="w-10 h-10 ms-3 text-gray-300 hover:text-gray-400" />
                            </button>
                            <img 
                                src={images[currentImageIndex]}
                                className="relative -z-10 pb-[-100px] top-[-70px] mb-[-135px]" 
                                width={350} 
                                height={350} 
                                alt={images[currentImageIndex]} 
                            />
                            <button 
                                onClick={handleNextImage}
                                className="absolute top-1/2 transform -translate-y-1/2 right-4"
                            >
                                <IoIosArrowForward className="w-10 h-10 ms-3 text-gray-300 hover:text-gray-400" />
                            </button>
                        </div>
                        <div className="lg:w-5/6 mx-auto">
                            <h1 className='text-center text-3xl capitalize font-medium mt-1'>Type</h1>
                            <div className="flex justify-center mt-3">
                                {data.types.map((type: Types) => {
                                    return (
                                        <span key={type.slot} className='text-center capitalize inline-block px-3 py-1 m-1 rounded-md bg-green-500 text-white text-base'>
                                            {type.type.name}
                                        </span>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="w-full mx-auto mt-3">
                            <div className="grid grid-cols-2 w-8/12 mx-auto text-center">
                                <div className="flex flex-col">
                                    <h1 className="text-lg font-medium">Name</h1>
                                    <h2 className="text-lg capitalize">{data.name}</h2>
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="text-lg font-medium">Species</h1>
                                    <h2 className="text-lg capitalize">{data.species.name}</h2>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 w-8/12 mx-auto mt-2 text-center">
                                <div className="flex flex-col">
                                    <h1 className="text-lg font-medium">Height</h1>
                                    <h2 className="text-lg">{data.height} m</h2>
                                </div>
                                <div className="flex flex-col">
                                    <h1 className="text-lg font-medium">Weight</h1>
                                    <h2 className="text-lg">{data.weight} kg</h2>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 w-8/12 mx-auto mt-2 text-center">
                                <div className="flex flex-col col-span-2">
                                    <h1 className="text-lg font-medium">Abilities</h1>
                                    <span className="text-lg inline-block capitalize">
                                        {getAbilities()}
                                    </span>
                                </div>
                                {/* <div className="flex flex-col">
                                    <h1 className="text-lg font-medium">Weight</h1>
                                    <h2 className="text-lg">{data.weight} kg</h2>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
