import React, { useState } from 'react';
import { DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";
import constants from "../constants";
import { useEffect } from 'react';

const TypesDropdown = (props) => {
    const [pokemonTypes, setpokemonTypes] = useState([]);
    
    useEffect(() => {
        const types = constants.pokemonTypes;
        setpokemonTypes(types);
    }, []);

    return(
        <React.Fragment>
            {
                <DropdownButton
                    title={'Tipos'}
                    variant={'dark'}
                    as={ButtonGroup}
                    key={'dropdown'}
                    id={`dropdown_id`}>
                    {
                       pokemonTypes.length > 0 && pokemonTypes.map((x, i) => <Dropdown.Item key={i} eventKey="1">{x}</Dropdown.Item>)
                    }
                </DropdownButton>
            }
        </React.Fragment>
    )
}

export default TypesDropdown;
