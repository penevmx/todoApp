import React, { FC, ReactElement } from 'react'
import { Grid, Box } from '@mui/material';
import { format } from 'date-fns';
import TaskCounter from '../TaskCounter/TaskCounter';
import Task from '../Task/Task';

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
                    <TaskCounter/>
                    <TaskCounter/>
                    <TaskCounter/>
                </Grid>

                <Grid
                    item
                    display='flex'
                    flexDirection='column'
                    xs={10}
                    md={8}
                >
                    <Task/>
                    <Task/>
                    <Task/>
                </Grid>

            </Grid>
        </Grid>
    )
}

export default TaskArea