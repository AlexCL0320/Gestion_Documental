'use client';
import { useState } from 'react';
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
import { useToast } from '@/hooks/use-toast';
import { Icons } from '@/components/icons';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
    toast({
      title: 'Correo enviado',
      description: 'Si existe una cuenta con ese correo, recibirás un enlace para restablecer tu contraseña.',
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <Icons.logo className="h-10 w-10 text-primary" />
            </div>
          <CardTitle className="text-2xl">Recuperar Contraseña</CardTitle>
          <CardDescription>
            {isSubmitted 
              ? "Revisa tu bandeja de entrada."
              : "Ingresa tu correo para enviarte un enlace de recuperación."
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
             <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                    Hemos enviado un enlace a <span className="font-medium text-foreground">{email}</span>.
                </p>
                <Button variant="outline" asChild>
                    <Link href="/login">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver a Inicio de Sesión
                    </Link>
                </Button>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="jefatura.docencia@itoaxaca.edu.mx"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Enviar enlace
              </Button>
               <Button variant="ghost" asChild>
                    <Link href="/login">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Cancelar
                    </Link>
                </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
