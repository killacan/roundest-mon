import type { GetServerSideProps } from "next";
import { prisma } from "@/backend/utils/prisma";
import { inferAsyncReturnType } from "@trpc/server";
import { AsyncReturnType } from "@/utils/ts-bs";

import Image from "next/image";

const getPokemonInOrder = async () => {
    const pokemonOrdered = await prisma.pokemon.findMany({
        orderBy: {
            VoteFor: {
                _count: "desc"
            }
        },
        select: {
            id: true, 
            name: true, 
            spriteUrl: true,
            _count: {
                select: {
                    VoteFor: true,
                    VoteAgainst: true
                }
            }
        }
    });

    return pokemonOrdered;
}

type PokemonQueryResult = AsyncReturnType<typeof getPokemonInOrder>;

const PokemonListing: React.FC<{pokemon: PokemonQueryResult[number] }> = ( props ) => {
    return (
        <div className="flex border-b p-4 items-center">
            <Image 
                width={64} 
                height={64} 
                alt="" 
                src={props.pokemon.spriteUrl!} 
            />
            <div className="capitalize" >{props.pokemon.name}</div>
        </div>

    )
}

const ResultsPage: React.FC<{pokemon: AsyncReturnType<typeof getPokemonInOrder>}> = (props) => {
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl ">Results</h2>
            <div className="flex flex-col w-full max-w-2xl border">
                {props.pokemon.map((pokemon, index) => {
                    return <PokemonListing pokemon={pokemon} key={index} />
                })}
            </div>
        </div>
    )
}

export default ResultsPage;


export const getStaticProps: GetServerSideProps = async () => {
    
    const DAY_IN_SECONDS = 60 * 60 * 24;
    const pokemonOrdered = await getPokemonInOrder();

    console.log(pokemonOrdered)

    return { props: { pokemon: pokemonOrdered }, revalidate: 60}
    // return { props: { pokemon: pokemonOrdered }, revalidate: DAY_IN_SECONDS };
};