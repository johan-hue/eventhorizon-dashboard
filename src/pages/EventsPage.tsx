import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EventModal } from '@/components/EventModal';
import { SearchFilter } from '@/components/SearchFilter';
import { mockEvents, Event } from '@/data/mockData';
import { Calendar, Clock, MapPin, Users, User } from 'lucide-react';

export const EventsPage = () => {
  const [events] = useState<Event[]>(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.date.includes(searchTerm) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    // In a real app, you would update the events state here
    setIsModalOpen(false);
  };

  const totalParticipants = events.reduce((sum, event) => sum + event.participants, 0);
  const avgParticipation = events.length > 0 
    ? events.reduce((sum, event) => sum + (event.participants / event.maxParticipants), 0) / events.length * 100
    : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="dashboard-gradient text-primary-foreground p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Calendar className="h-8 w-8" />
            Gestión de Eventos
          </h1>
          <p className="text-primary-foreground/80">Administra todos los eventos comunitarios</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Search and Filter */}
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter=""
          onStatusChange={() => {}}
          showStatusFilter={false}
          placeholder="Buscar por título, descripción, organizador, fecha o ubicación..."
        />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="card-elegant">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{events.length}</div>
              <p className="text-sm text-muted-foreground">Total Eventos</p>
            </CardContent>
          </Card>
          <Card className="card-elegant">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success">{totalParticipants}</div>
              <p className="text-sm text-muted-foreground">Participantes</p>
            </CardContent>
          </Card>
          <Card className="card-elegant">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{avgParticipation.toFixed(0)}%</div>
              <p className="text-sm text-muted-foreground">Participación Promedio</p>
            </CardContent>
          </Card>
          <Card className="card-elegant">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-warning">
                {events.filter(e => e.participants < e.maxParticipants / 2).length}
              </div>
              <p className="text-sm text-muted-foreground">Necesitan Promoción</p>
            </CardContent>
          </Card>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const participationPercentage = (event.participants / event.maxParticipants) * 100;
            
            return (
              <Card 
                key={event.id}
                className="card-elegant cursor-pointer"
                onClick={() => handleEventClick(event)}
              >
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {event.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{event.organizer}</span>
                    </div>
                    
                    <div className="pt-2">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span className="text-xs text-muted-foreground">
                            {event.participants}/{event.maxParticipants}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {participationPercentage.toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${participationPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No hay eventos</h3>
            <p className="text-muted-foreground">
              {searchTerm 
                ? 'No se encontraron eventos con los filtros aplicados'
                : 'No hay eventos disponibles en este momento'
              }
            </p>
          </div>
        )}
      </div>

      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={handleDelete}
      />
    </div>
  );
};