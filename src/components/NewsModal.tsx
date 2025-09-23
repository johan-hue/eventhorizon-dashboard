import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { News } from '@/data/mockData';
import { Eye, MessageSquare, Trash2, Download } from 'lucide-react';

interface NewsModalProps {
  news: News | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, status: News['status']) => void;
  onDelete: (id: string) => void;
}

export const NewsModal = ({ news, isOpen, onClose, onUpdateStatus, onDelete }: NewsModalProps) => {
  const [view, setView] = useState<'details' | 'respond'>('details');
  const [newStatus, setNewStatus] = useState<News['status'] | ''>('');
  const [response, setResponse] = useState('');

  if (!news) return null;

  const handleUpdateStatus = () => {
    if (newStatus && news) {
      onUpdateStatus(news.id, newStatus);
      setView('details');
      setNewStatus('');
      setResponse('');
    }
  };

  const handleDownload = () => {
    const content = `
REPORTE DE NOTICIA
==================

Título: ${news.title}
Autor: ${news.author}
Fecha: ${news.date} - ${news.time}
Estado: ${news.status.toUpperCase()}
Ubicación: ${news.location}

Descripción:
${news.description}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `noticia-${news.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendiente': return 'bg-warning text-warning-foreground';
      case 'en-proceso': return 'bg-primary text-primary-foreground';
      case 'resuelto': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary">
            {news.title}
          </DialogTitle>
        </DialogHeader>

        {view === 'details' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Badge className={getStatusColor(news.status)}>
                {news.status.toUpperCase()}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Por: {news.author} - {news.date}
              </span>
            </div>

            {news.image && (
              <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Imagen del caso</span>
              </div>
            )}

            <div>
              <h4 className="font-semibold mb-2">Descripción:</h4>
              <p className="text-foreground">{news.description}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Ubicación:</h4>
              <p className="text-muted-foreground">{news.location}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setView('details')}
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                Ver Detalle
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setView('respond')}
                className="flex items-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Responder
              </Button>
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
                onClick={() => onDelete(news.id)}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Eliminar
              </Button>
            </div>
          </div>
        )}

        {view === 'respond' && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Respuesta</label>
              <Textarea
                placeholder="Escriba su respuesta..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Actualizar Estado</label>
              <Select value={newStatus} onValueChange={(value) => setNewStatus(value as News['status'])}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="en-proceso">En Proceso</SelectItem>
                  <SelectItem value="resuelto">Resuelto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={() => setView('details')} variant="outline">
                Cancelar
              </Button>
              <Button onClick={handleUpdateStatus} disabled={!newStatus}>
                Actualizar Estado
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};