'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Teacher } from '@/app/lib/data';

type NewTeacherData = Omit<Teacher, 'id' | 'avatarUrl' | 'status'>;

interface AddTeacherFormProps {
  onSave: (teacher: NewTeacherData) => void;
  onCancel: () => void;
}

export function AddTeacherForm({ onSave, onCancel }: AddTeacherFormProps) {
  const [formData, setFormData] = useState<NewTeacherData>({
    name: '',
    email: '',
    department: '',
    contractType: 'Base',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, contractType: value as Teacher['contractType'] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Nombre
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="email" className="text-right">
          Correo
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="department" className="text-right">
          Departamento
        </Label>
        <Input
          id="department"
          value={formData.department}
          onChange={handleChange}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="contractType" className="text-right">
          Contrato
        </Label>
        <Select
          value={formData.contractType}
          onValueChange={handleSelectChange}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Selecciona un tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Base">Base</SelectItem>
            <SelectItem value="Interinato">Interinato</SelectItem>
            <SelectItem value="Honorarios">Honorarios</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Guardar Docente</Button>
      </div>
    </form>
  );
}