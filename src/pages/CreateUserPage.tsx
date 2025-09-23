import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, User, Mail, Phone, Calendar, IdCard } from 'lucide-react';

interface UserFormData {
  firstName: string;
  lastName: string;
  dni: string;
  phone: string;
  birthDate: string;
  email: string;
  password: string;
  role: 'admin' | 'vecino' | 'moderador' | '';
}

export const CreateUserPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    birthDate: '',
    email: '',
    password: '',
    role: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Usuario creado exitosamente",
      description: `Se ha creado el usuario ${formData.firstName} ${formData.lastName}`,
    });

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      dni: '',
      phone: '',
      birthDate: '',
      email: '',
      password: '',
      role: ''
    });

    setIsSubmitting(false);
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() !== '');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="dashboard-gradient text-primary-foreground p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <UserPlus className="h-8 w-8" />
            Crear Usuario
          </h1>
          <p className="text-primary-foreground/80">Registra un nuevo usuario en el sistema</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        <Card className="card-elegant">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <User className="h-5 w-5" />
              Información del Usuario
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombres y Apellidos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombres *</Label>
                  <Input
                    id="firstName"
                    placeholder="Ingrese los nombres"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellidos *</Label>
                  <Input
                    id="lastName"
                    placeholder="Ingrese los apellidos"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* DNI */}
              <div className="space-y-2">
                <Label htmlFor="dni" className="flex items-center gap-2">
                  <IdCard className="h-4 w-4" />
                  DNI *
                </Label>
                <Input
                  id="dni"
                  placeholder="Ingrese el número de DNI"
                  value={formData.dni}
                  onChange={(e) => handleInputChange('dni', e.target.value)}
                  maxLength={8}
                  pattern="[0-9]{8}"
                  required
                />
              </div>

              {/* Teléfono */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Teléfono *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Ingrese el número de teléfono"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>

              {/* Fecha de Nacimiento */}
              <div className="space-y-2">
                <Label htmlFor="birthDate" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Fecha de Nacimiento *
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  required
                />
              </div>

              {/* Correo Electrónico */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Correo Electrónico *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              {/* Contraseña */}
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Ingrese una contraseña segura"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  minLength={6}
                  required
                />
              </div>

              {/* Rol */}
              <div className="space-y-2">
                <Label htmlFor="role">Rol *</Label>
                <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="moderador">Moderador</SelectItem>
                    <SelectItem value="vecino">Vecino</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Nota informativa */}
              <div className="bg-accent p-4 rounded-lg">
                <p className="text-sm text-accent-foreground">
                  <strong>Nota:</strong> Este formulario es solo una maqueta para demostración. 
                  Los datos no se guardan realmente en una base de datos.
                </p>
              </div>

              {/* Botones */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setFormData({
                    firstName: '',
                    lastName: '',
                    dni: '',
                    phone: '',
                    birthDate: '',
                    email: '',
                    password: '',
                    role: ''
                  })}
                >
                  Limpiar Formulario
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={!isFormValid() || isSubmitting}
                >
                  {isSubmitting ? 'Creando Usuario...' : 'Crear Usuario'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};