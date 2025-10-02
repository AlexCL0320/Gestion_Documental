import { documents } from '@/app/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Clock3, Users, XCircle } from 'lucide-react';

export function OverviewCards() {
  const totalDocuments = documents.length;
  const submitted = documents.filter((doc) => doc.status === 'Entregada').length;
  const rejected = documents.filter((doc) => doc.status === 'Rechazada').length;
  const pending = documents.filter((doc) => doc.status === 'Sin Entregar').length;

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Entregados</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{submitted}</div>
          <p className="text-xs text-muted-foreground">
            de {totalDocuments} documentos totales
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rechazados</CardTitle>
          <XCircle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{rejected}</div>
          <p className="text-xs text-muted-foreground">Requieren revisión y reenvío</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
          <Clock3 className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pending}</div>
          <p className="text-xs text-muted-foreground">
            Aún no se han entregado
          </p>
        </CardContent>
      </Card>
       <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Docentes Activos</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+5</div>
          <p className="text-xs text-muted-foreground">
            Participando en el sistema
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
