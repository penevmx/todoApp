import React, { FC, ReactElement } from 'react'
import { Grid, Box } from '@mui/material';
import { format } from 'date-fns';

const TaskArea: FC = (): ReactElement => {
    return (
        <Grid item md={8} px={4}>
            <Box mb={8} px={4}>
                <h3>{`Status as on: ${format(new Date(), 'PPPP')}`}</h3>
            </Box>

            <Grid container display='flex' justifyContent='center'>
                <Grid
                    item
                    display='flex'
                    flexDirection='row'
                    justifyContent='space-around'
                    alignItems='center'
                    md={10} // at mid device 10 columns from grid
                    xs={12} // at small devices ще окупира 12 колони
                    mb={8}
                >
                    <Box>task counter</Box>
                    <Box>task counter</Box>
                    <Box>task counter</Box>
                </Grid>

                <Grid
                    item
                    display='flex'
                    flexDirection='column'
                    xs={10}
                    md={8}
                >
                    <Box>task here</Box>
                    <Box>task here</Box>
                    <Box>task here</Box>
                </Grid>

            </Grid>
        </Grid>
    )
}

export default TaskArea