import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from "../components/Header/Header";
import api from '../services/api';
const Details = ({history, ...props}) => {
    const [{name}, setName] = useState(props.match.params)
    const [loading, setLoading] = useState(true)
    const [details, setDetails] = useState({})
    useEffect(() => {
        if (name === undefined) history.push({ pathname: "/" })
        LoadPokemon()
        window.scrollTo(0, 0)
    }, [name])

    const LoadPokemon = async() => {
        api.get(`/pokemon/${name}`)
        .then((response) => {
          if (response.status == 200) {
            LoadSpecies(response.data);
          }
        }).catch((error) => {
        //   setShowModalError(true);
        console.log(error);
        });
    }

    async function LoadSpecies(poke) { 
        try {
            let pokeSpecies = await api.get(`pokemon-species/${name}`);
            let pokeEvolution = await axios.get(pokeSpecies.data.evolution_chain.url);

            // Overview data
            let sword_text = "";
            let shield_text = "";
            let default_text = "";
            pokeSpecies.data.flavor_text_entries.map((item) => {
                if (item.language.name !== "en") return false;
                if (item.version.name === "sword") {
                    sword_text = item.flavor_text;
                } else if (item.version.name === "shield") {
                    shield_text = item.flavor_text;
                }
                default_text = item.flavor_text;
              });

              // Abilities data
              let abilities = "";
              poke.abilities.map((item, index) => {
                abilities += `${item.ability.name}${
                    poke.abilities.length == index + 1 ? "" : ", "
                  }`;
              })
              let detailsPageData = {
                id: poke.id,
                name: poke.name,
                types: poke.types,
                sword_text,
                shield_text,
                default_text,
                height: poke.height,
                weight: poke.weight,
                abilities,
                gender_rate: pokeSpecies.data.gender_rate,
                capture_rate: pokeSpecies.data.capture_rate,
                habitat: pokeSpecies.data.habitat?.name,
                stats: poke.stats,
                evolution: pokeEvolution.data.chain,
              };
              setDetails(detailsPageData)
              setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
   return(
       <div>
           <Header/>
            <div>details page</div>
       </div>
   ) 
}

export default Details;