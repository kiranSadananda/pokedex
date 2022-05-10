
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import axios from 'axios';


import Header from "../components/Header/Header";
import PokeCard from "../components/Pokemon/PokeCard"
import api from '../services/api';
import PokeOverview from '../components/Pokemon/PokeOverview';
import PokeInfo from '../components/Pokemon/PokeInfo';
import PokeStats from '../components/Pokemon/PokeStats';
import LoadingDetails from '../components/Loading/LoadingDetails';
import PokeEvolution from '../components/Pokemon/PokeEvolution';
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
          if (response.status === 200) {
            LoadSpecies(response.data);
          }
        }).catch((error) => {
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
                number: poke.id.toString().padStart(3, "0"),
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
            <Container fluid className="mb-4">
                {loading ? (<LoadingDetails/>) : (
                <>
                <Row>
                    <Col xs={12} md={6}>
                        <PokeCard
                        name={details.name}
                        id={details.id}
                        number={details.number}
                        types={details.types}
                        click={false}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <PokeOverview
                        sword_text={details.sword_text}
                        shield_text={details.shield_text}
                        default_text={details.default_text}
                        />
                        
                        <PokeInfo
                        height={details.height}
                        capture_rate={details.capture_rate}
                        weight={details.weight}
                        abilities={details.abilities}
                        gender_rate={details.gender_rate}
                        habitat={details.habitat}
                        />
                    </Col>
                    <Col xs={12}>
                        <PokeStats stats={details.stats} types={details.types} />
                    </Col>
                </Row>
                <PokeEvolution data={details.evolution} types={details.types} />
                </>
                )}
            </Container>
       </div>
   ) 
}

export default Details;