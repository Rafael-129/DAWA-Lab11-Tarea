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
import { TeamMemberForm } from "@/components/TeamMemberForm"
import { useApp } from "@/context/AppContext"
import { TeamMember } from "@/lib/types"
import { Edit, Trash2, AlertTriangle } from "lucide-react"

interface TeamMemberActionsProps {
  member: TeamMember
}

export function TeamMemberActions({ member }: TeamMemberActionsProps) {
  const { dispatch } = useApp()
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    dispatch({ type: 'DELETE_TEAM_MEMBER', payload: member.userId })
    setLoading(false)
    setDeleteOpen(false)
  }

  const editTrigger = (
    <Button size="sm" variant="outline">
      <Edit className="h-4 w-4 mr-1" />
      Editar
    </Button>
  )

  return (
    <div className="flex items-center gap-2">
      <TeamMemberForm member={member} trigger={editTrigger} />
      
      <Button 
        size="sm" 
        variant="outline" 
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
              Esta acción no se puede deshacer. El miembro será eliminado permanentemente.
            </DialogDescription>
          </DialogHeader>

          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              ¿Estás seguro de que quieres eliminar a "{member.name}"?
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
                "Eliminar Miembro"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}