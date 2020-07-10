import React, { useState } from 'react';
import { DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";
import { useEffect } from 'react';

const ItemsDropdown = (props) => {
    const { onSelect, items, dropdownTitle } = props;
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(false);
    
    // load tipos
    useEffect(() => {
        const types = items;
        setOptions(types);
    }, []);

    // pinta de color la opcion
    const selectedEvent = (option) => {
        setSelectedOption(option);
    };

    return(
        <React.Fragment>
            {
                <DropdownButton
                    title={dropdownTitle}
                    variant={'dark'}
                    as={ButtonGroup}
                    key={'dropdown'}
                    id={`dropdown_id`}>
                    {
                       options.length > 0 && 
                        options.map((option, i) => 
                            <Dropdown.Item 
                                className="text-capitalize"
                                active={selectedOption === option}
                                key={`option_${option}`} 
                                eventKey={`${option}`}
                                onSelect={() => selectedEvent(option)}
                                onClick={() => onSelect(option)}>
                                    {option}
                            </Dropdown.Item>
                        )
                    }
                </DropdownButton>
            }
        </React.Fragment>
    )
}

export default ItemsDropdown;
