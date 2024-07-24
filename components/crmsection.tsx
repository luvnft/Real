'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

type Task = {
  id: string
  title: string
  description: string
}

type Column = {
  id: string
  title: string
  tasks: Task[]
}

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([
    { id: 'todo', title: 'To Do', tasks: [] },
    { id: 'inprogress', title: 'In Progress', tasks: [] },
    { id: 'done', title: 'Done', tasks: [] },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskDescription, setNewTaskDescription] = useState('')

  const addTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: newTaskDescription,
    }

    setColumns(prevColumns => {
      const newColumns = [...prevColumns]
      newColumns[0].tasks.push(newTask)
      return newColumns
    })

    setNewTaskTitle('')
    setNewTaskDescription('')
    setIsDialogOpen(false)
  }

  const moveTask = (taskId: string, fromColumn: string, toColumn: string) => {
    setColumns(prevColumns => {
      const newColumns = [...prevColumns]
      const fromColumnIndex = newColumns.findIndex(col => col.id === fromColumn)
      const toColumnIndex = newColumns.findIndex(col => col.id === toColumn)
      const taskIndex = newColumns[fromColumnIndex].tasks.findIndex(task => task.id === taskId)
      const task = newColumns[fromColumnIndex].tasks[taskIndex]
      newColumns[fromColumnIndex].tasks.splice(taskIndex, 1)
      newColumns[toColumnIndex].tasks.push(task)
      return newColumns
    })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
      <Button onClick={() => setIsDialogOpen(true)}>Add Task</Button>

      <div className="flex gap-4 mt-4">
        {columns.map(column => (
          <Card key={column.id} className="w-64 p-4">
            <h2 className="font-bold mb-2">{column.title}</h2>
            {column.tasks.map(task => (
              <Card key={task.id} className="p-2 mb-2">
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm">{task.description}</p>
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => moveTask(task.id, column.id, 'todo')}
                    disabled={column.id === 'todo'}
                  >
                    ←
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => moveTask(task.id, column.id, 'inprogress')}
                    disabled={column.id === 'inprogress'}
                  >
                    In Progress
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => moveTask(task.id, column.id, 'done')}
                    disabled={column.id === 'done'}
                  >
                    →
                  </Button>
                </div>
              </Card>
            ))}
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Task title"
              value={newTaskTitle}
              onChange={e => setNewTaskTitle(e.target.value)}
            />
            <Input
              placeholder="Task description"
              value={newTaskDescription}
              onChange={e => setNewTaskDescription(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button onClick={addTask}>Add Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}