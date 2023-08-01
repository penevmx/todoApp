import React, { FC, ReactElement } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ISelectField } from './interfaces/ISelectField';
import PropTypes from 'prop-types';

const TaskSelectField: FC<ISelectField> = (
    props
): ReactElement => {
    const {
        value = "",
        label = "selectBox",
        name = "selectBox",
        items = [{ value: '', label: 'add items' }],
        disabled = false,
        onChange = (e) => {
            console.log(e);
        }
    } = props


    return (
        <FormControl fullWidth size='small'>
            <InputLabel id={`${name}-id`}>{label}</InputLabel>
            <Select
                labelId={`${name}-id`}
                id={`${name}-id-select`}
                value={value}
                label={label}
                name={name}
                onChange={onChange}
                disabled={disabled}
            >
                {
                    items.map((item, i) => {
                        return <MenuItem
                            key={item.value + i}
                            value={item.value}
                        >
                            {item.label}
                        </MenuItem>

                    })
                }

            </Select>
        </FormControl>
    )
}

TaskSelectField.propTypes = {
    onChange: PropTypes.func,
    label: PropTypes.string,
    name: PropTypes.string,
    disabled: PropTypes.bool,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        }).isRequired
    ),
}


export default TaskSelectField