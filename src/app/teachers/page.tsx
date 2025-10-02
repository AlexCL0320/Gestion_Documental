'use client';
import { useState } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { TeachersTable } from '@/components/teachers/teachers-table';
import { Button } from '@/components/ui/button';
import { File, ListFilter, PlusCircle } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '@/components/ui/dialog';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { AddTeacherForm } from '@/components/teachers/add-teacher-form';
import { useToast } from '@/hooks/use-toast';
import { teachersData as initialTeachersData, Teacher } from '@/app/lib/data';

export default function TeachersPage() {
    const { toast } = useToast();
    const [teachers, setTeachers] = useState<Teacher[]>(initialTeachersData);
    const [isAddOpen, setIsAddOpen] = useState(false);

    const handleAddTeacher = (newTeacher: Omit<Teacher, 'id' | 'avatarUrl' | 'status'>) => {
        const teacherWithDefaults: Teacher = {
            ...newTeacher,
            id: `TCH${String(teachers.length + 1).padStart(3, '0')}`,
            avatarUrl: `https://picsum.photos/seed/${newTeacher.name}/36/36`,
            status: 'Activo',
        };
        setTeachers(prev => [...prev, teacherWithDefaults]);
        toast({
            title: 'Docente Agregado',
            description: `${newTeacher.name} ha sido agregado al sistema.`,
        });
        setIsAddOpen(false);
    };

  return (
    <AppLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="active">Activos</TabsTrigger>
                <TabsTrigger value="inactive">Inactivos</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <Button size="sm" variant="outline" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filtrar
                  </span>
                </Button>
                <Button size="sm" variant="outline" className="h-8 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Exportar
                  </span>
                </Button>
                <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm" className="h-8 gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Agregar Docente
                            </span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle>Agregar Nuevo Docente</DialogTitle>
                        </DialogHeader>
                        <AddTeacherForm onSave={handleAddTeacher} onCancel={() => setIsAddOpen(false)} />
                    </DialogContent>
                </Dialog>
              </div>
            </div>
            <TabsContent value="all">
                <TeachersTable teachers={teachers} setTeachers={setTeachers} />
            </TabsContent>
             <TabsContent value="active">
                <TeachersTable teachers={teachers.filter(t => t.status === 'Activo')} setTeachers={setTeachers} />
            </TabsContent>
             <TabsContent value="inactive">
                <TeachersTable teachers={teachers.filter(t => t.status === 'Inactivo')} setTeachers={setTeachers} />
            </TabsContent>
          </Tabs>
      </div>
    </AppLayout>
  );
}