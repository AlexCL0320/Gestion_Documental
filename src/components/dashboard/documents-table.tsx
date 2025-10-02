'use client';
import Image from 'next/image';
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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, FileCheck, FileClock, FileX } from 'lucide-react';
import { documents, DocumentType } from '@/app/lib/data';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarFallback } from '../ui/avatar';

const statusIcons = {
  Entregada: <FileCheck className="h-4 w-4 text-green-500" />,
  'Sin Entregar': <FileClock className="h-4 w-4 text-orange-500" />,
  Rechazada: <FileX className="h-4 w-4 text-red-500" />,
};

const documentTypes: DocumentType[] = [
  'Evaluaciones', 
  'Instrumentaciones', 
  'Rubricas', 
  'Actas de Inicio', 
  'Reporte Final', 
  'Reporte Intermedio'
];

interface DocumentsTableProps {
  showFilter?: boolean;
}

export function DocumentsTable({ showFilter = false }: DocumentsTableProps) {
  const [isClient, setIsClient] = useState(false);
  const [filterType, setFilterType] = useState<DocumentType | 'all'>('all');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredDocuments = documents.filter(doc => 
    filterType === 'all' || doc.type === filterType
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Últimas Entregas</CardTitle>
        <CardDescription>
          Una lista de los documentos gestionados recientemente.
        </CardDescription>
      </CardHeader>
      <CardContent>
      {showFilter && (
          <div className="mb-4">
            <Select value={filterType} onValueChange={(value) => setFilterType(value as DocumentType | 'all')}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Filtrar por tipo de evidencia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                {documentTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Documento</TableHead>
              <TableHead className="hidden sm:table-cell">Estatus</TableHead>
              <TableHead className="hidden md:table-cell">Actualizado</TableHead>
              <TableHead>
                <span className="sr-only">Acciones</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{doc.teacher.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-0.5">
                      <div className="font-medium text-foreground">{doc.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {doc.teacher.name}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge
                    variant="outline"
                    className={cn(
                      'text-xs',
                      doc.status === 'Entregada' && 'border-green-500/50 bg-green-500/10 text-green-700',
                      doc.status === 'Rechazada' && 'border-red-500/50 bg-red-500/10 text-red-700',
                      doc.status === 'Sin Entregar' && 'border-orange-500/50 bg-orange-500/10 text-orange-700'
                    )}
                  >
                    <span className="mr-1.5">{statusIcons[doc.status]}</span>
                    {doc.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {isClient ? formatDistanceToNow(new Date(doc.lastUpdated), { addSuffix: true, locale: es }) : 'cargando...'}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem>Revisar</DropdownMenuItem>
                      <DropdownMenuItem>Ver historial</DropdownMenuItem>
                      <DropdownMenuItem>Descargar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
