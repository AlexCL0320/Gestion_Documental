"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function SubmissionStatus() {
  const statusInfo = {
    "Estatus Envío": "Envío pendiente",
    "Número de Intento": "Este es el intento 0",
    "Estatus Entrega": "Sin revisar",
    "Tiempo Restante": "10 días, 3 horas, 13 minutos",
    "Archivo(s) enviado(s)": "-",
    "Comentarios": "-",
    "Observaciones": "-",
  };

  return (
    <Card>
      <CardHeader className='pb-2'>
        <div className='text-sm text-muted-foreground'>
            <p>Abrió: 27 de mayo de 2025, 02:43 p. m.</p>
            <p>Cierra: 6 de junio de 2025, 05:57 p. m.</p>
        </div>
      </CardHeader>
      <CardContent>
        <Card className='mt-4'>
            <CardHeader className='bg-gray-800 text-white rounded-t-lg py-3'>
                <CardTitle className='text-base'>Estatus Entrega</CardTitle>
            </CardHeader>
            <CardContent className='p-0'>
                <div className="divide-y divide-border">
                {Object.entries(statusInfo).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 text-sm">
                        <div className="font-medium p-3">{key}</div>
                        <div className="text-muted-foreground p-3 bg-muted/20">{value}</div>
                    </div>
                ))}
                </div>
            </CardContent>
        </Card>
      </CardContent>
      <CardFooter>
        <p className='text-xs text-center w-full text-muted-foreground'>Departamento de Ingenieria Industrial © 2025</p>
      </CardFooter>
    </Card>
  );
}
