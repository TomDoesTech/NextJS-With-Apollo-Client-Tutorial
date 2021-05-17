import Image from "next/image";
import { get } from "lodash";
import Link from "next/link";
import { getDataFromTree } from "@apollo/client/react/ssr";
import withApollo from "../lib/withApollo";
import { CharactersQuery, useCharactersQuery } from "../generated";

function Home() {
  const { data } = useCharactersQuery();

  const characters = get(
    data,
    "characters.results",
    []
  ) as CharactersQuery["characters"]["results"];

  return (
    <div>
      {characters.map((character) => (
        <div key={character.id}>
          <Image
            src={character.image}
            alt={character.name}
            width="200px"
            height="200px"
          />
          <Link href="/characters/[id]" as={`/characters/${character.id}`}>
            {character.name}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default withApollo(Home, { getDataFromTree });
