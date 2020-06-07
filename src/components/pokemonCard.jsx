import React from 'react';
import { Card, Button } from "react-bootstrap";

const PokeCard = (props) => {
    return(
        <React.Fragment>
            {
                props &&
                <Card style={{ width: '18rem' }} className={`pokemon-type-${props.pokemon.types[0].type.name}`}>
                    <Card.Img variant="top" alt="pokemon_image" src={`${props.pokemon.sprites.front_default}`} />
                    <Card.Body>
                        <Card.Title className="text-capitalize">{props.pokemon.name}</Card.Title>
                        <Card.Text>
                            {
                                props.pokemon.species[0].flavor_text
                            }
                        </Card.Text>
                        <Button variant="primary">Ver mas</Button>
                    </Card.Body>
                </Card>
            }
        </React.Fragment>
    )
}

export default PokeCard;