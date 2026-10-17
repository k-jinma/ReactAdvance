import type { Task, TaskStatus } from "../types/task"
import { TaskCard } from "./TaskCard"

type Props = {
    status: TaskStatus
    title: string
    tasks: Task[]
    onDelete: (id: string) => void
}

export function Column( {status, title, tasks, onDelete} : Props ){
    
    let items = tasks

    if(status !== "all"){
        items = tasks.filter((task) => task.status === status);
    }

    return(
        <div className="column">
            <h2>
                {title}({items.length})
            </h2>
            
            {items.length === 0 && <p className="empty">まだタスクがありません</p>}
            
            { items.map( (task) => (
                <TaskCard key={task.id} task={task} onDelete={onDelete}/>
            ))}

        </div>
    )
}