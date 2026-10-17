export type TaskStatus = "todo" | "doing" | "done" | "other" | "all"

export type Task = {
    id: string
    title: string
    status: TaskStatus
}