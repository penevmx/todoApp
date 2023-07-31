import React, { FC, ReactElement } from 'react'
import { Box, Typography } from '@mui/material';
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
            <Typography
                variant='h6'
                mb={2}
                component='h2'
            >Create a task</Typography>
        </Box>
    )
}

export default CreateTaskForm