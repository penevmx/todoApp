import React, { FC, ReactElement, useState, useEffect, useContext } from 'react'
import { Box, Typography, Stack, LinearProgress, Button, Alert, AlertTitle } from '@mui/material';
import TaskTitleField from './_taskTitleField';
import TaskDescriptionField from './_taskDescriptionField';
import { TaskDateField } from './_taskDateField';
import TaskSelectField from './_taskSelectField';
import { Status } from './enums/Status';
import { Priority } from './enums/Priority';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ICreateTask } from '../TaskArea/interfaces/ICreateTask';
import { useMutation } from '@tanstack/react-query';
import { TaskStatusChangedContext } from '../../context/TaskStatusChangedContext/TaskStatusChangedContext';


const CreateTaskForm: FC = (): ReactElement => {

    const [title, setTitle] = useState<string | undefined>(undefined);
    const [description, setDescription] = useState<string | undefined>(undefined);
    const [date, setDate] = useState<Date | null>(new Date());
    const [status, setStatus] = useState<string>(Status.todo);
    const [priority, setPriority] = useState<string>(Priority.normal);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const taskUpdatedContext = useContext(TaskStatusChangedContext)
    //create task mutation
    const createTaskMutation = useMutation((data: ICreateTask) =>
        sendApiRequest(
            'http://localhost:3200/tasks',
            'POST',
            data,
        )
    )


    function createTaskHandler() {//TODO use yup here

        if (!title || !date || !description) {
            return
        }

        const task: ICreateTask = {
            title: title,  //= title: title,
            description: description,
            date: date.toString(),
            status: status,
            priority: priority,
        }
        // console.log('vafli');
        // console.log(createTaskMutation);


        createTaskMutation.mutate(task)
    }

    //menage side effects inside the app
    useEffect(() => {
        if (createTaskMutation.isSuccess) {
            setShowSuccess(true);
            taskUpdatedContext.toggle();
        }

        const successTimeout = setTimeout(() => {
            setShowSuccess(false);
        }, 2000)

        return () => {
            clearTimeout(successTimeout)
        }

    }, [createTaskMutation.isSuccess])

    return (
        <Box
            display='flex'
            flexDirection='column'
            alignItems='flex-start'
            width='100%'
            px={4}
            my={6}
        >
            {showSuccess && <Alert
                severity='success'
                sx={{ width: '100%', marginBottom: '20px' }}
            >
                <AlertTitle>Success</AlertTitle>
                The task has been created successfully
            </Alert>}

            <Typography variant='h6' mb={2} component='h2'>
                Create a task
            </Typography>

            <Stack sx={{ width: '100%' }} spacing={2}>
                <TaskTitleField
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={createTaskMutation.isLoading}
                />
                <TaskDescriptionField
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={createTaskMutation.isLoading}
                />
                <TaskDateField
                    value={date}
                    onChange={(date) => setDate(date)}
                    disabled={createTaskMutation.isLoading}
                />


                <Stack direction='row' spacing={2} sx={{ width: '100%' }}>
                    <TaskSelectField
                        label='Status'
                        name='status'
                        value={status}
                        onChange={(e) => setStatus(e.target.value as string)}
                        disabled={createTaskMutation.isLoading}
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
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as string)}
                        disabled={createTaskMutation.isLoading}
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
                        ]}
                    />
                </Stack>
                {createTaskMutation.isLoading && <LinearProgress />}
                <Button
                    disabled={
                        !title ||
                        !description ||
                        !date ||
                        !status ||
                        !priority
                    }
                    size='large'
                    variant='contained'
                    fullWidth
                    onClick={createTaskHandler}
                >Create a task</Button>
            </Stack>


        </Box>
    )
}

export default CreateTaskForm