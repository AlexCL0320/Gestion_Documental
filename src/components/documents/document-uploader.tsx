'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { UploadCloud } from 'lucide-react';
import { FileList } from './file-list';

export interface UploadedFile {
    id: string;
    file: File;
    name: string;
}

export function DocumentUploader() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [comments, setComments] = useState('');

  // Cargar borrador al iniciar el componente
  useEffect(() => {
    const savedDraft = localStorage.getItem('documentDraft');
    if (savedDraft) {
      const { draftComments, draftFileNames } = JSON.parse(savedDraft);
      if (window.confirm(`Hemos encontrado un borrador guardado con ${draftFileNames.length} archivos y comentarios. ¿Deseas restaurarlo?`)) {
        setComments(draftComments);
        alert('Comentarios restaurados. Por favor, vuelve a seleccionar los archivos del borrador: ' + draftFileNames.join(', '));
      }
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map((file) => ({
        id: crypto.randomUUID(),
        file,
        name: file.name,
      }));
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const newFiles = Array.from(event.dataTransfer.files)
        .filter(file => file.type === 'application/pdf')
        .map((file) => ({
            id: crypto.randomUUID(),
            file,
            name: file.name,
        }));
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      event.dataTransfer.clearData();
    }
  };
  
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleRenameFile = (id: string, newName: string) => {
    setFiles(files.map(f => f.id === id ? {...f, name: newName.endsWith('.pdf') ? newName : `${newName}.pdf` } : f));
  };

  const handleRemoveFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const handleSendDocuments = () => {
    if (files.length === 0) {
      alert('Por favor, añade al menos un archivo para enviar.');
      return;
    }
    const formData = new FormData();
    files.forEach((file) => {
        formData.append('documents', file.file, file.name);
    });
    formData.append('comments', comments);
    console.log('Enviando los siguientes datos al servidor:');
    for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
            console.log(`${key}: ${value.name} (${value.size} bytes)`);
        } else {
            console.log(`${key}: ${value}`);
        }
    }
    alert('¡Documentos enviados con éxito! (Simulación)');
    setFiles([]);
    setComments('');
    localStorage.removeItem('documentDraft'); // Limpiar borrador después de enviar
  };

  const handleSaveDraft = () => {
    if (files.length === 0 && comments === '') {
        alert('No hay nada que guardar como borrador.');
        return;
    }
    const draftData = {
        draftComments: comments,
        draftFileNames: files.map(f => f.name),
    };
    localStorage.setItem('documentDraft', JSON.stringify(draftData));
    alert('Borrador guardado con éxito. Recuerda que deberás volver a seleccionar los archivos al restaurar.');
  };

  const handleClearForm = () => {
    if(window.confirm('¿Estás seguro de que deseas limpiar el formulario? Se borrarán los archivos y comentarios no guardados.')){
        setFiles([]);
        setComments('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Carga de Archivos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div 
          className="border-2 border-dashed border-muted rounded-lg p-8 text-center cursor-pointer hover:border-primary/70 transition-colors"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById('file-upload-input')?.click()}
        >
          <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">
            Arrastra y suelta tus archivos PDF aquí, o haz clic para seleccionar.
          </p>
          <input 
            id="file-upload-input"
            type="file" 
            accept="application/pdf"
            multiple 
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {files.length > 0 && (
          <FileList files={files} onRename={handleRenameFile} onRemove={handleRemoveFile} />
        )}

        <div>
          <label htmlFor="comments" className="block text-sm font-medium text-foreground mb-2">
            Comentarios Adicionales (Opcional)
          </label>
          <Textarea
            id="comments"
            placeholder="Añade cualquier comentario relevante para la jefatura de docencia..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={4}
          />
        </div>
        <div className="flex flex-wrap gap-2 justify-end">
            <Button variant="outline" onClick={handleSaveDraft}>Guardar Borrador</Button>
            <Button variant="destructive" className="bg-red-600 hover:bg-red-700" onClick={handleClearForm}>Anular Envío</Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={handleSendDocuments}>Enviar Documentos</Button>
        </div>
      </CardContent>
    </Card>
  );
}
