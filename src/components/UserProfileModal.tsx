import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, LogOut, X } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function UserProfileModal({ isOpen, onClose, onLogout }: UserProfileModalProps) {
  const userData = {
    name: "GERMAN HERNANDEZ",
    role: "Administrador",
    dni: "98765432",
    email: "GermanH@gmail.com",
    telefono: "912345678",
    fechaNacimiento: "12/10/1990"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm bg-white border-0 shadow-2xl rounded-2xl p-0 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary-glow text-white p-4 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-lg font-semibold">Perfil de Usuario</h2>
        </div>

        {/* Profile Content */}
        <div className="p-6 space-y-6">
          {/* Avatar */}
          <div className="flex justify-center">
            <Avatar className="w-20 h-20 bg-primary">
              <AvatarFallback className="bg-primary text-white text-2xl">
                <User className="h-10 w-10" />
              </AvatarFallback>
            </Avatar>
          </div>

          {/* User Name */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800">{userData.name}</h3>
          </div>

          {/* User Details */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-primary">ROL:</span>
              <span className="text-sm text-gray-600">{userData.role}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-primary">DNI:</span>
              <span className="text-sm text-gray-600">{userData.dni}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-primary">CORREO:</span>
              <span className="text-sm text-gray-600 truncate max-w-[150px]">{userData.email}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-primary">TELÉFONO:</span>
              <span className="text-sm text-gray-600">{userData.telefono}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-primary">F. NACIMIENTO:</span>
              <span className="text-sm text-gray-600">{userData.fechaNacimiento}</span>
            </div>
          </div>

          {/* Logout Button */}
          <div className="pt-4">
            <Button
              onClick={onLogout}
              className="w-full bg-primary hover:bg-primary-dark text-white rounded-full py-3 font-medium transition-all duration-300 hover:shadow-lg"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}