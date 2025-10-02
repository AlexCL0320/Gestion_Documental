'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Icons } from '@/components/icons';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { login, waitForUser } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      await waitForUser(); // Espera a que el estado del usuario se propague
      toast({
        title: 'Inicio de sesión exitoso',
        description: 'Bienvenido a Docentix.',
      });
      router.push('/');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error de inicio de sesión',
        description:
          error instanceof Error ? error.message : 'Ocurrió un error desconocido.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center">
        <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
                backgroundImage:
                "url('https://media.istockphoto.com/id/1493269753/photo/group-of-young-people-in-technical-vocational-training.jpg?s=612x612&w=0&k=20&c=XOiA_E4kfv_YvsMw1qYdaioPWDgTH5IBjCULUCQrp9o=')",
            }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <Card className="mx-auto w-full max-w-md z-10">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <Icons.logo className="h-10 w-10 text-yellow-500" />
            </div>
          <CardTitle className="text-2xl">Docentix</CardTitle>
          <CardDescription>
            Departamento de Ingenieria Industrial
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="jefatura.docencia@itoaxaca.edu.mx"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Contraseña</Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-0 right-1 h-9 w-9"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  </span>
                </Button>
              </div>
            </div>
            <div className="text-center">
              <Link
                    href="/forgot-password"
                    className="inline-block text-sm underline"
                  >
                    ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Iniciar Sesión
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
