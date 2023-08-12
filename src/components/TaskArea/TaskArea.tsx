import React, { FC, ReactElement, useContext, useEffect } from 'react'
import { Grid, Box, Alert, LinearProgress } from '@mui/material';
import { format } from 'date-fns';
import TaskCounter from '../TaskCounter/TaskCounter';
import Task from '../Task/Task';
import { useMutation, useQuery } from '@tanstack/react-query';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ITaskApi } from './interfaces/ITaskApi';
import { Status } from '../CreateTaskForm/enums/Status';
import { IUpdateTask } from '../CreateTaskForm/interfaces/IUpdateTask';
import { countTasks } from './helpers/countTasks';
import { TaskStatusChangedContext } from '../../context';

const TaskArea: FC = (): ReactElement => {
    const tasksUpdatedContext = useContext(TaskStatusChangedContext);

    const { error, isLoading, data, refetch } = useQuery(
        ['tasks'],
        async () => {
            return await sendApiRequest<ITaskApi>(
                'http://localhost:3200/tasks',
                'GET'
            )
        }
    )

    //update task mutation
    const updateTaskMutation = useMutation(
        (data: IUpdateTask) => sendApiRequest(
            'http://localhost:3200/tasks',
            'PUT',
            data
        )
    )

    useEffect(() => {
        refetch()
    }, [tasksUpdatedContext.updated])
    
    useEffect(() => {
        if (updateTaskMutation.isSuccess) {
            tasksUpdatedContext.toggle();
        }
    }, [updateTaskMutation.isSuccess])

    function onStatusChangeHandler(
        e: React.ChangeEvent<HTMLInputElement>,
        id: string,
    ) {
        updateTaskMutation.mutate({
            id,
            status: e.target.checked ? Status.inProgress : Status.todo
        })
    }

    function markCompleteHandler(
        e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>,
        id: string,
    ) {
        updateTaskMutation.mutate({
            id,
            status: Status.completed
        })
    }

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
                    <TaskCounter status={Status.todo}
                        count={data ? countTasks(data, Status.todo) : undefined}
                    />
                    <TaskCounter status={Status.inProgress}
                        count={data ? countTasks(data, Status.inProgress) : undefined}
                    />
                    <TaskCounter status={Status.completed}
                        count={data ? countTasks(data, Status.completed) : undefined}
                    />
                </Grid>

                <Grid
                    item
                    display='flex'
                    flexDirection='column'
                    xs={10}
                    md={8}
                >
                    {!!error && (
                        <Alert severity='error'>
                            There was an error fetching your tasks.
                        </Alert>
                    )}

                    {!error &&
                        Array.isArray(data) &&
                        data.length === 0 && <Alert severity='warning'>
                            You do not have any tasks created yet.
                        </Alert>}

                    {isLoading ? (
                        <LinearProgress />
                    ) : (
                        Array.isArray(data) &&
                        data.length > 0 &&
                        data.map((el, i) => {
                            // console.log(el.date, 'date');
                            // console.log(new Date(el.date), 'timestamp')

                            return Status.todo === el.status ||
                                el.status === Status.inProgress ?

                                <Task
                                    key={i + el.priority}
                                    id={el.id}
                                    title={el.title}
                                    // date={new Date(el.date)}
                                    description={el.description}
                                    priority={el.priority}
                                    status={el.status}
                                    onStatusChange={onStatusChangeHandler}
                                    onClick={markCompleteHandler}
                                />
                                : (false)
                        })
                    )}


                </Grid>

            </Grid>
        </Grid>
    )
}

export default TaskArea