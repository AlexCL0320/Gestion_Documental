'use client';
import { AppLayout } from '@/components/layout/app-layout';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import Image from 'next/image';

export default function ProfilePage() {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    return (
        <AppLayout>
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Perfil de Usuario
                </h1>
                <p className="text-muted-foreground">
                    Gestiona la configuración de tu cuenta y tus datos personales.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Foto de Perfil</CardTitle>
                                <CardDescription>Actualiza tu imagen de perfil.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center gap-4">
                                <Avatar className="h-32 w-32">
                                    {user.avatarUrl ? (
                                        <Image src={user.avatarUrl} alt={user.name ?? 'Usuario'} width={128} height={128} className="rounded-full object-cover"/>
                                    ) : (
                                        <AvatarFallback>{user.name?.[0] ?? 'U'}</AvatarFallback>
                                    )}
                                </Avatar>
                                <Button>Cambiar Foto</Button>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="md:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Información Personal</CardTitle>
                                <CardDescription>Edita tu información personal.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre Completo</Label>
                                    <Input id="name" defaultValue={user.name ?? ''} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Correo Electrónico</Label>
                                    <Input id="email" type="email" defaultValue={user.email ?? ''} readOnly />
                                </div>
                                <Button>Guardar Cambios</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
