import React from 'react';
import { Modal, Col, Row, Badge } from "react-bootstrap";

const DetailModal = (props) => {
    const pokemon = props.pokemonData || undefined;
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
                                   <h5 className="text-uppercase d-inline"><Badge variant="dark">{pokemonType.type.name}</Badge></h5>
                            )
                        }
                    </Col>
                    <Col xs={3}>
                        {
                            pokemon.stats.map(pokemonStat => 
                                <ul class="list-group">
                                    <li class="list-group-item">{pokemonStat.stat.name}: {pokemonStat.base_stat}</li>
                                </ul>
                            )
                        }
                    </Col>
                    {/* Evolution panel */}
                    {/* <Col xs={3}>
                      {
                        pokemon.evolutions && pokemon.evolutions.chain.evolves_to.map(pokemonEvolution => 
                              <ul class="list-group">
                                  <li class="list-group-item">{pokemonEvolution.species.name}</li>
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
