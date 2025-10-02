'use client';
import { useState } from 'react';
import { UploadedFile } from './document-uploader';
import { FileIcon, X, Edit, Check, Trash2 } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface FileListProps {
  files: UploadedFile[];
  onRename: (id: string, newName: string) => void;
  onRemove: (id: string) => void;
}

export function FileList({ files, onRename, onRemove }: FileListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleStartEdit = (file: UploadedFile) => {
    setEditingId(file.id);
    setEditingName(file.name);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  const handleSaveRename = (id: string) => {
    if (editingName.trim()) {
      onRename(id, editingName.trim());
    }
    handleCancelEdit();
  };

  return (
    <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Archivos Cargados</h3>
      {files.map((uploadedFile) => (
        <div
          key={uploadedFile.id}
          className="flex items-center justify-between rounded-md border border-border p-2"
        >
          <div className="flex items-center gap-3 min-w-0">
            <FileIcon className="h-6 w-6 text-primary flex-shrink-0" />
            {editingId === uploadedFile.id ? (
              <Input
                type="text"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveRename(uploadedFile.id)}
                className="h-8 text-sm"
                autoFocus
              />
            ) : (
              <span className="text-sm text-foreground truncate" title={uploadedFile.name}>
                {uploadedFile.name}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {editingId === uploadedFile.id ? (
              <>
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleSaveRename(uploadedFile.id)}>
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleCancelEdit}>
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleStartEdit(uploadedFile)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => onRemove(uploadedFile.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
