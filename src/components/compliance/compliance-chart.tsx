"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { documents, Document } from "@/app/lib/data"

type Status = Document['status'];

const statusOrder: Status[] = ['Entregada', 'Rechazada', 'Sin Entregar'];

const data = statusOrder.map(status => ({
    name: status,
    total: documents.filter(doc => doc.status === status).length,
}));

const statusFills: Record<Status, string> = {
    'Entregada': "hsl(var(--chart-2))",
    'Rechazada': "hsl(var(--chart-5))",
    'Sin Entregar': "hsl(var(--chart-4))",
}

export function ComplianceChart() {
  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle>Estado General de Documentos</CardTitle>
        <CardDescription>Resumen de entregas por estado.</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
      <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
              allowDecimals={false}
            />
            <Tooltip
                contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))' 
                }}
            />
            <Legend />
            <Bar dataKey="total" name="Total Documentos" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={statusFills[entry.name as Status]} />
                ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}