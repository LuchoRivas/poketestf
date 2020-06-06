import React from 'react';
import { Card, Button } from "react-bootstrap";

const PokeCard = (props) => {
    return(
        <React.Fragment>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" alt="pokemon_image" src={`${props.pokemon.sprites.front_default}`} />
                <Card.Body>
                    <Card.Title className="text-capitalize">{props.pokemon.name}</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="primary">Ver mas</Button>
                </Card.Body>
            </Card>
        </React.Fragment>
    )
}

export default PokeCard;