import React, { createContext, FC, ReactElement, useState, PropsWithChildren } from 'react';

export const TaskStatusChangedContext = createContext({
    updated: false,
    toggle: () => { },// eslint-disable-line @typescript-eslint/no-empty-function
});

export const TaskStatusChangedContextProvider: FC<PropsWithChildren<object>> = (
    props
): ReactElement => {
    const [updated, setUpdated] = useState(false);

    function toggleHandler() {
        updated ? setUpdated(false) : setUpdated(true)
    }

    return <TaskStatusChangedContext.Provider value={{
        updated: updated,
        toggle: toggleHandler,
    }}>
        {props.children}
    </TaskStatusChangedContext.Provider>
}