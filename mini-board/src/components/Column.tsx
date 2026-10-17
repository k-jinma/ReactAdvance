import type { Task, TaskStatus } from "../types/task"
import { TaskCard } from "./TaskCard"

type Props = {
    status: TaskStatus
    title: string
    tasks: Task[]
}

export function Column( {status, title, tasks} : Props ){
    
    let items = tasks

    if(status !== "all"){
        items = tasks.filter((task) => task.status === status);
    }

    return(
        <div className="column">
            <h2>
                {title}({items.length})
            </h2>
            { items.map( (task) => (
                <TaskCard key={task.id} task={task}/>
            ))}
        </div>
    )
}