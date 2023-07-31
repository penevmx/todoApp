import React, { FC, ReactElement } from 'react'
import { Box, Typography, Stack } from '@mui/material';
import TaskTitleField from './_taskTitleField';
import TaskDescriptionField from './_taskDescriptionField';
import { TaskDateField } from './_taskDateField';

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

            <Stack sx={{ width:'100%'}} spacing={2}>
            <TaskTitleField disabled/>
                <TaskDescriptionField />
                <TaskDateField/>
            </Stack>
        </Box>
    )
}

export default CreateTaskForm