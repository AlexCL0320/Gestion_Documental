'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { activities } from '@/app/lib/data';
import { Bot } from 'lucide-react';
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export function RecentActivity() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
        <CardDescription>Trazabilidad Total de la gestión documental.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4">
            <Avatar className="h-9 w-9 border">
              {activity.user.avatarUrl ? (
                <AvatarImage
                  src={activity.user.avatarUrl}
                  alt={`Avatar de ${activity.user.name}`}
                  className="object-cover"
                />
              ) : (
                <AvatarFallback>
                    <Bot className="h-5 w-5 text-muted-foreground"/>
                </AvatarFallback>
              )}
              <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm text-foreground">
                <span className="font-medium">{activity.user.name}</span>{' '}
                {activity.action}{' '}
                <span className="font-medium">{activity.target}</span>.
              </p>
              <p className="text-xs text-muted-foreground">
                {isClient ? formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true, locale: es }) : 'cargando...'}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
