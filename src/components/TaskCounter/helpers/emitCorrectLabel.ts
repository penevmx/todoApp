import { Status } from "../../CreateTaskForm/enums/Status";
import { TaskCounterStatusType } from "../interfaces/ITaskCounter";

export const emitCorrectLabel = (status: TaskCounterStatusType): string => {
    switch (status) {
        case Status.todo:
            return `Todo's`;
        case Status.inProgress:
            return `in progress`;
        case Status.completed:
            return `completed`;
    }
}