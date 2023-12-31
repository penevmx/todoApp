import React, { FC, ReactElement } from 'react';
import { Box } from '@mui/material';
import TaskHeader from './_taskHeader';
import TaskDescription from './_taskDescription';
import TaskFooter from './_taskFooter';
import { ITask } from './interfaces/ITask';
import { Priority } from '../CreateTaskForm/enums/Priority';
import { Status } from '../CreateTaskForm/enums/Status';
import PropTypes from 'prop-types';
import { renderPriorityBorderColor } from './helpers/renderPriorityBorderColor';

const Task: FC<ITask> = (
    props
): ReactElement => {

    const {
        title = 'test title',
        date = new Date(),
        description = 'dummy text',
        priority = Priority.normal,
        status = Status.completed,
        onStatusChange = (e) => { console.log(e) },
        onClick = (e) => { console.log(e) },
        id,
    } = props;



    return (
        <Box
            display='flex'
            flexDirection='column'
            justifyContent='flex-start'
            width='100%'
            mb={4}
            p={2}
            sx={{
                backgroundColor: 'background.paper',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: renderPriorityBorderColor(priority),
            }}
        >
            <TaskHeader title={title} date={date} />
            <TaskDescription description={description} />
            <TaskFooter
                id={id}
                status={status}
                onStatusChange={onStatusChange}
                onClick={onClick} />
        </Box>
    )
}

Task.propTypes = {
    title: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    description: PropTypes.string,
    priority: PropTypes.string,
    status: PropTypes.string,
    onClick: PropTypes.func,
    onStatusChange: PropTypes.func,
}
export default Task