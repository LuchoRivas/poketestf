import React from 'react';
import { Card, Badge, Row, Col } from "react-bootstrap";

const MainPokemonCard = (props) => {
    const [isShiny, setShiny] = React.useState(false);

    const color1 = props.pokemon.types[0].type.name;
    const imgCol = props.pokemon.sprites.front_female !== null ? 'col-4' : 'col-6'
    return (
        <React.Fragment>
            {
                props &&
                    <Col xs={9}>
                        <Card className={`pokemon-type-${color1}`}>
                            <Card.Body>
                                <Card.Title className="text-capitalize">{props.pokemon.name}</Card.Title>
                                <div>
                                    {
                                        props.pokemon.types.map((pokemonType, i) =>
                                            <h6 key={`badge_${pokemonType.type.name}_${i}`} className="text-uppercase d-inline"><Badge className={`pokemon-type-${pokemonType.type.name}`} variant="dark">{pokemonType.type.name}</Badge>{' '}</h6>
                                        )
                                    }
                                </div>
                                <Card.Text>
                                    {
                                        props.pokemon.species[0].flavor_text
                                    }
                                </Card.Text>
                                <Row>
                                    <Col xs={12} className={"d-flex justify-content-center"}>
                                        <Card.Img hidden={isShiny} className="col-6" variant="top" alt="pokemon_image" src={`${props.pokemon.sprites.front_default}`} />
                                        {
                                            props.pokemon.sprites.front_female &&
                                            <Card.Img hidden={isShiny || imgCol === 'col-12'} className="col-6" variant="top" alt="pokemon_image" src={`${props.pokemon.sprites.front_female || ''}`} /> 
                                        }
                                    </Col>
                                    <Col>
                                        <Card.Img hidden={!isShiny} className="col-6" variant="top" alt="pokemon_image" src={`${props.pokemon.sprites.front_shiny}`} />
                                        <Card.Img hidden={!isShiny || imgCol === 'col-12'} className="col-6" variant="top" alt="pokemon_image" src={`${props.pokemon.sprites.front_shiny_female || ''}`} />
                                    </Col>
                                </Row>
                                <Row hidden={imgCol === 'col-12'}>
                                    <p className={imgCol}>Macho</p>
                                    {
                                        props.pokemon.sprites.front_female &&
                                        <p className={imgCol}>Hembra</p>
                                    }
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
            }
        </React.Fragment>
    )
}

export default MainPokemonCard;
