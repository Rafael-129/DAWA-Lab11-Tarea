"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { TaskForm } from "@/components/TaskForm"
import { useApp } from "@/context/AppContext"
import { Task } from "@/lib/types"
import { Edit, Trash2, AlertTriangle } from "lucide-react"

interface TaskActionsProps {
  task: Task
}

export function TaskActions({ task }: TaskActionsProps) {
  const { dispatch } = useApp()
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    dispatch({ type: 'DELETE_TASK', payload: task.id })
    setLoading(false)
    setDeleteOpen(false)
  }

  const editTrigger = (
    <Button size="sm" variant="ghost">
      <Edit className="h-4 w-4 mr-1" />
      Editar
    </Button>
  )

  return (
    <div className="flex items-center gap-1">
      <TaskForm task={task} trigger={editTrigger} />
      
      <Button 
        size="sm" 
        variant="ghost" 
        onClick={() => setDeleteOpen(true)}
        className="text-red-600 hover:text-red-700"
      >
        <Trash2 className="h-4 w-4 mr-1" />
        Eliminar
      </Button>

      {/* Modal de confirmación de eliminación */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Confirmar Eliminación
            </DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. La tarea será eliminada permanentemente.
            </DialogDescription>
          </DialogHeader>

          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              ¿Estás seguro de que quieres eliminar la tarea "{task.title}"?
            </AlertDescription>
          </Alert>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleteOpen(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Eliminando...
                </>
              ) : (
                "Eliminar Tarea"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}