import React from 'react';
import { Modal, Col, Row, Badge } from "react-bootstrap";

const DetailModal = (props) => {
    const pokemon = props.pokemon_data || undefined;
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="text-capitalize">
            {pokemon.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
            pokemon.stats &&
                <Row>
                    <Col xs={3}>
                        <p>N° {pokemon.id}</p>
                        {
                          pokemon.types.map(pokemonType => 
                                  <h5 key={`${pokemonType.type.name}_badge`} className="text-uppercase d-inline"><Badge variant="dark">{pokemonType.type.name}</Badge></h5>
                          )
                        }
                    </Col>
                    <Col xs={3}>
                          <ul className="list-group">
                          {
                            pokemon.stats.map(pokemonStat => 
                                    <li key={`stat_${pokemonStat.stat.name}`} className="list-group-item">{pokemonStat.stat.name}: {pokemonStat.base_stat}</li>
                            )
                          }
                          </ul>
                    </Col>
                    {/* Evolution panel */}
                    {/* <Col xs={3}>
                      {
                        pokemon.evolutions && pokemon.evolutions.chain.evolves_to.map(pokemonEvolution => 
                              <ul className="list-group">
                                  <li className="list-group-item">{pokemonEvolution.species.name}</li>
                              </ul>
                          )
                      }
                    </Col> */}
                </Row>
            }
        </Modal.Body>
      </Modal>
    );
  }

  export default DetailModal;
