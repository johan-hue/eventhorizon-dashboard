import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NewsModal } from '@/components/NewsModal';
import { EventModal } from '@/components/EventModal';
import { mockNews, mockEvents, News, Event } from '@/data/mockData';
import { Newspaper, Calendar, Users, BarChart3, Clock, MapPin } from 'lucide-react';

export const Dashboard = () => {
  const [news, setNews] = useState<News[]>(mockNews);
  const [events] = useState<Event[]>(mockEvents);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const handleNewsClick = (newsItem: News) => {
    setSelectedNews(newsItem);
    setIsNewsModalOpen(true);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const handleUpdateNewsStatus = (id: string, status: News['status']) => {
    setNews(prevNews => 
      prevNews.map(item => 
        item.id === id ? { ...item, status } : item
      )
    );
  };

  const handleDeleteNews = (id: string) => {
    setNews(prevNews => prevNews.filter(item => item.id !== id));
    setIsNewsModalOpen(false);
  };

  const handleDeleteEvent = (id: string) => {
    // In a real app, you would update the events state here
    setIsEventModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendiente': return 'bg-warning text-warning-foreground';
      case 'en-proceso': return 'bg-primary text-primary-foreground';
      case 'resuelto': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const pendingNews = news.filter(item => item.status === 'pendiente').length;
  const inProgressNews = news.filter(item => item.status === 'en-proceso').length;
  const resolvedNews = news.filter(item => item.status === 'resuelto').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="dashboard-gradient text-primary-foreground p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">LA VOZ DE TODOS</h1>
          <p className="text-primary-foreground/80">Panel de Administración</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Noticias</CardTitle>
              <Newspaper className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{news.length}</div>
            </CardContent>
          </Card>
          
          <Card className="card-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{pendingNews}</div>
            </CardContent>
          </Card>

          <Card className="card-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Proceso</CardTitle>
              <BarChart3 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{inProgressNews}</div>
            </CardContent>
          </Card>

          <Card className="card-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eventos</CardTitle>
              <Calendar className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{events.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Próximas Noticias */}
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <Newspaper className="h-5 w-5" />
                Próximas Noticias
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {news.slice(0, 3).map((item) => (
                <div 
                  key={item.id}
                  className="p-4 border border-border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                  onClick={() => handleNewsClick(item)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-foreground line-clamp-2">{item.title}</h4>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Por: {item.author}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              ))}
              {news.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No hay noticias disponibles
                </p>
              )}
            </CardContent>
          </Card>

          {/* Próximos Eventos */}
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Próximos Eventos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {events.slice(0, 3).map((event) => (
                <div 
                  key={event.id}
                  className="p-4 border border-border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                  onClick={() => handleEventClick(event)}
                >
                  <h4 className="font-semibold text-foreground mb-2">{event.title}</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>{event.date} - {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      <span>Participantes: {event.participants}/{event.maxParticipants}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Organizador: {event.organizer}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <NewsModal
        news={selectedNews}
        isOpen={isNewsModalOpen}
        onClose={() => setIsNewsModalOpen(false)}
        onUpdateStatus={handleUpdateNewsStatus}
        onDelete={handleDeleteNews}
      />

      <EventModal
        event={selectedEvent}
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onDelete={handleDeleteEvent}
      />
    </div>
  );
};