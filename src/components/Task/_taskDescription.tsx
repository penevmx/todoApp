import React, { FC, ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import { ITaskDescription } from './interfaces/ITaskDescription';
import PropTypes from 'prop-types';

const TaskDescription: FC<ITaskDescription> = (
    props
): ReactElement => {

    const { description = 'default text' } = props;
    return (
        <Box >
            <Typography sx={{ wordBreak: "break-word" }}>{description}</Typography>
        </Box>
    )
}

TaskDescription.propTypes = {
    description: PropTypes.string,
}

export default TaskDescription