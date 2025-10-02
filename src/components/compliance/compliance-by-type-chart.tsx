"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { documents, Document, DocumentType } from "@/app/lib/data"

type Status = Document['status'];

const documentTypes: DocumentType[] = [
    'Evaluaciones', 
    'Instrumentaciones', 
    'Rubricas', 
    'Actas de Inicio', 
    'Reporte Final', 
    'Reporte Intermedio'
];
const statusOrder: Status[] = ['Entregada', 'Rechazada', 'Sin Entregar'];

const data = documentTypes.map(type => {
    const counts = documents.reduce((acc, doc) => {
        if (doc.type === type) {
            if (!acc[doc.status]) {
                acc[doc.status] = 0;
            }
            acc[doc.status]++;
        }
        return acc;
    }, {} as Record<Status, number>);
    return {
        name: type,
        Entregada: counts['Entregada'] || 0,
        Rechazada: counts['Rechazada'] || 0,
        'Sin Entregar': counts['Sin Entregar'] || 0,
    };
});

const statusFills: Record<Status, string> = {
    'Entregada': "hsl(var(--chart-2))",
    'Rechazada': "hsl(var(--chart-5))",
    'Sin Entregar': "hsl(var(--chart-4))",
}

export function ComplianceByTypeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Entregas por Tipo de Evidencia</CardTitle>
        <CardDescription>Desglose de entregas por tipo y estado.</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={70}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip
                contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))' 
                }}
            />
            <Legend wrapperStyle={{fontSize: "12px"}}/>
            {statusOrder.map(status => (
                <Bar 
                    key={status} 
                    dataKey={status} 
                    stackId="a" 
                    fill={statusFills[status]} 
                    radius={[4, 4, 0, 0]}
                />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}