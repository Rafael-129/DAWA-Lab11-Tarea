"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { TaskForm } from "@/components/TaskForm"
import { TaskActions } from "@/components/TaskActions"
import { useApp } from "@/context/AppContext"
import { translateStatus, translatePriority, formatDate, getDaysRemaining } from "@/lib/translations"

const statusVariant = (status: string) => {
  switch (status) {
    case "completed": return "default"
    case "in-progress": return "secondary"
    case "pending": return "outline"
    default: return "outline"
  }
}

const priorityVariant = (priority: string) => {
  switch (priority) {
    case "urgent": return "destructive"
    case "high": return "default"
    case "medium": return "secondary"
    case "low": return "outline"
    default: return "outline"
  }
}

export function TasksTable() {
  const { state } = useApp()
  const [currentPage, setCurrentPage] = useState(1)
  const tasksPerPage = 5

  // Calcular paginación
  const totalPages = Math.ceil(state.tasks.length / tasksPerPage)
  const startIndex = (currentPage - 1) * tasksPerPage
  const endIndex = startIndex + tasksPerPage
  const currentTasks = state.tasks.slice(startIndex, endIndex)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Gestión de Tareas</h3>
        <TaskForm />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableCaption>
            Lista de todas las tareas del proyecto ({state.tasks.length} total)
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox />
              </TableHead>
              <TableHead>Tarea</TableHead>
              <TableHead>Proyecto</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead>Asignado a</TableHead>
              <TableHead>Fecha límite</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTasks.map((task) => {
              const project = state.projects.find(p => p.id === task.projectId)
              const assignee = state.teamMembers.find(m => m.userId === task.userId)
              
              return (
                <TableRow key={task.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div>
                      <p className="font-medium">{task.title}</p>
                      {task.description && (
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{project?.name || "Proyecto no encontrado"}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(task.status)}>
                      {translateStatus(task.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={priorityVariant(task.priority)}>
                      {translatePriority(task.priority)}
                    </Badge>
                  </TableCell>
                  <TableCell>{assignee?.name || "Sin asignar"}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{formatDate(task.dateline)}</p>
                      {(() => {
                        const { days, isOverdue } = getDaysRemaining(task.dateline)
                        return (
                          <p className={`text-xs ${isOverdue ? 'text-red-600' : 'text-muted-foreground'}`}>
                            {isOverdue ? `Vencida hace ${days} días` : `${days} días restantes`}
                          </p>
                        )
                      })()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <TaskActions task={task} />
                  </TableCell>
                </TableRow>
              )
            })}
            {currentTasks.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <p className="text-muted-foreground">
                    No hay tareas disponibles. ¡Crea la primera tarea!
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  isActive={currentPage === i + 1}
                  className="cursor-pointer"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
