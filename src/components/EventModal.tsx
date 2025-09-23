import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Event } from '@/data/mockData';
import { Calendar, MapPin, Users, Clock, Download, Trash2 } from 'lucide-react';

interface EventModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export const EventModal = ({ event, isOpen, onClose, onDelete }: EventModalProps) => {
  if (!event) return null;

  const handleDownload = () => {
    const content = `
INFORMACIÓN DEL EVENTO
=====================

Título: ${event.title}
Organizador: ${event.organizer}
Fecha: ${event.date}
Hora: ${event.time}
Ubicación: ${event.location}
Participantes: ${event.participants}/${event.maxParticipants}

Descripción:
${event.description}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evento-${event.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const participationPercentage = (event.participants / event.maxParticipants) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary">
            {event.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {event.image && (
            <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground">Imagen del evento</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Fecha</p>
                <p className="font-medium">{event.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Hora</p>
                <p className="font-medium">{event.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Ubicación</p>
                <p className="font-medium">{event.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Participantes</p>
                <p className="font-medium">{event.participants}/{event.maxParticipants}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Organizador: <span className="font-medium text-foreground">{event.organizer}</span>
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Nivel de participación</p>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${participationPercentage}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {participationPercentage.toFixed(0)}% de capacidad
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Descripción:</h4>
            <p className="text-foreground">{event.description}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleDownload}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Descargar
            </Button>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => onDelete(event.id)}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Eliminar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};