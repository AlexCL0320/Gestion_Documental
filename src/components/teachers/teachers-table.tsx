'use client';
import Image from 'next/image';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Teacher } from '@/app/lib/data';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { EditTeacherForm } from './edit-teacher-form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '../ui/avatar';

interface TeachersTableProps {
    teachers: Teacher[];
    setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
}

export function TeachersTable({ teachers, setTeachers }: TeachersTableProps) {
  const { toast } = useToast();
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeactivateOpen, setIsDeactivateOpen] = useState(false);

  const handleEdit = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsEditOpen(true);
  };

  const handleDeactivate = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsDeactivateOpen(true);
  };

  const handleUpdateTeacher = (updatedTeacher: Teacher) => {
    setTeachers((prev) =>
      prev.map((t) => (t.id === updatedTeacher.id ? updatedTeacher : t))
    );
    toast({
      title: 'Docente actualizado',
      description: `La información de ${updatedTeacher.name} ha sido actualizada.`,
    });
  };

  const handleToggleStatus = () => {
    if (selectedTeacher) {
      const newStatus =
        selectedTeacher.status === 'Activo' ? 'Inactivo' : 'Activo';
      setTeachers((prev) =>
        prev.map((t) =>
          t.id === selectedTeacher.id ? { ...t, status: newStatus } : t
        )
      );
      toast({
        title: `Estado del docente actualizado`,
        description: `${selectedTeacher.name} ahora está ${newStatus.toLowerCase()}.`,
      });
    }
    setIsDeactivateOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Docentes</CardTitle>
          <CardDescription>
            Una lista de todos los docentes en el sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead className="hidden sm:table-cell">Estatus</TableHead>
                <TableHead className="hidden md:table-cell">
                  Tipo de Contrato
                </TableHead>
                <TableHead>
                  <span className="sr-only">Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{teacher.name?.[0]}</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-0.5">
                        <div className="font-medium text-foreground">
                          {teacher.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {teacher.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge
                      variant="outline"
                      className={cn(
                        'text-xs',
                        teacher.status === 'Activo'
                          ? 'border-green-500/50 bg-green-500/10 text-green-700'
                          : 'border-muted-foreground/50 bg-muted/80 text-muted-foreground'
                      )}
                    >
                      {teacher.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {teacher.contractType}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem onSelect={() => handleEdit(teacher)}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onSelect={() => handleDeactivate(teacher)}
                          className={cn(
                            teacher.status === 'Activo'
                              ? 'text-red-600'
                              : 'text-green-600',
                              "focus:text-white"
                          )}
                        >
                          {teacher.status === 'Activo'
                            ? 'Dar de baja'
                            : 'Reactivar'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Docente</DialogTitle>
          </DialogHeader>
          {selectedTeacher && (
            <EditTeacherForm
              teacher={selectedTeacher}
              onSave={handleUpdateTeacher}
              onCancel={() => setIsEditOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
      <AlertDialog
        open={isDeactivateOpen}
        onOpenChange={setIsDeactivateOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              {`Esto cambiará el estado de ${
                selectedTeacher?.name
              } a ${
                selectedTeacher?.status === 'Activo' ? 'Inactivo' : 'Activo'
              }.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleToggleStatus}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
