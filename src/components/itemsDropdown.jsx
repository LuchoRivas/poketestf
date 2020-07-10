import React, { useState } from 'react';
import { DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";
import { useEffect } from 'react';

const ItemsDropdown = (props) => {
    const { onSelect, items, result, dropdownTitle } = props;
    const [options, setOptions] = useState([]);
    
    // load tipos
    useEffect(() => {
        const types = items;
        setOptions(types);
    }, []);



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
                                key={i} 
                                eventKey={`${option}`}
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
