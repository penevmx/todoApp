import React, { FC, ReactElement } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { IDateField } from './interfaces/IDateField';
import PropTypes from 'prop-types';

export const TaskDateField: FC<IDateField> = (
    props,
): ReactElement => {

    const {
        value = new Date(),
        disabled = false,
        onChange = (date) => { console.log(date) },
    } = props;


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
                label='Task Date'
                format='dd/MM/yyyy'
                disabled={disabled}
                value={value}
                onChange={onChange}
            />
        </LocalizationProvider>
    )
};

TaskDateField.propTypes = {
    value: PropTypes.instanceOf(Date),
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
}