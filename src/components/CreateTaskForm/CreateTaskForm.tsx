import React, { FC, ReactElement } from 'react'
import { Box, Typography, Stack } from '@mui/material';
import TaskTitleField from './_taskTitleField';
import TaskDescriptionField from './_taskDescriptionField';
import { TaskDateField } from './_taskDateField';
import TaskSelectField from './_taskSelectField';
import { Status } from './enums/Status';
import { Priority } from './enums/Priority';


const CreateTaskForm: FC = (): ReactElement => {

    return (
        <Box
            display='flex'
            flexDirection='column'
            alignItems='flex-start'
            width='100%'
            px={4}
            my={6}
        >
            <Typography variant='h6' mb={2} component='h2'>
                Create a task
            </Typography>

            <Stack sx={{ width: '100%' }} spacing={2}>
                <TaskTitleField disabled />
                <TaskDescriptionField />
                <TaskDateField />
            </Stack>

            <Stack direction='row' spacing={2} sx={{ width: '100%' }}>
                <TaskSelectField
                    label='Status'
                    name='status'
                    items={[
                        {
                            value: Status.todo,
                            label: Status.todo.toUpperCase(),
                        },
                        {
                            value: Status.inProgress,
                            label: Status.inProgress.toUpperCase(),
                        }
                    ]}
                />
                <TaskSelectField
                    label='Priority'
                    name='priority'
                    items={[
                        {
                            value: Priority.high,
                            label: Priority.high,
                        },
                        {
                            value: Priority.normal,
                            label: Priority.normal,
                        },
                        {
                            value: Priority.low,
                            label: Priority.low,
                        }
                    ]} />

            </Stack>
        </Box>
    )
}

export default CreateTaskForm