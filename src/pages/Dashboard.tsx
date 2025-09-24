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
      <div className="bg-muted/30 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 animate-slide-up">
            <div className="w-12 h-12 dashboard-gradient rounded-xl flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard Principal</h1>
              <p className="text-muted-foreground">Panel de control y gestión comunitaria</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="stat-card card-elegant animate-slide-up" style={{animationDelay: '0.1s'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Noticias</CardTitle>
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Newspaper className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{news.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Reportes activos</p>
            </CardContent>
          </Card>
          
          <Card className="stat-card card-elegant animate-slide-up" style={{animationDelay: '0.2s'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pendientes</CardTitle>
              <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                <Clock className="h-4 w-4 text-warning" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">{pendingNews}</div>
              <p className="text-xs text-muted-foreground mt-1">Requieren atención</p>
            </CardContent>
          </Card>

          <Card className="stat-card card-elegant animate-slide-up" style={{animationDelay: '0.3s'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">En Proceso</CardTitle>
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{inProgressNews}</div>
              <p className="text-xs text-muted-foreground mt-1">En seguimiento</p>
            </CardContent>
          </Card>

          <Card className="stat-card card-elegant animate-slide-up" style={{animationDelay: '0.4s'}}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Eventos</CardTitle>
              <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                <Calendar className="h-4 w-4 text-success" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{events.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Programados</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Últimas Noticias */}
          <Card className="card-elegant animate-slide-up" style={{animationDelay: '0.5s'}}>
            <CardHeader className="border-b border-border/50">
              <CardTitle className="text-foreground flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Newspaper className="h-4 w-4 text-primary" />
                </div>
                Últimas Noticias
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {news.slice(0, 3).map((item, index) => (
                <div 
                  key={item.id}
                  className="news-item p-5 border-b border-border/50 last:border-0 cursor-pointer"
                  onClick={() => handleNewsClick(item)}
                  style={{animationDelay: `${0.6 + index * 0.1}s`}}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-foreground line-clamp-2 flex-1 pr-2">{item.title}</h4>
                    <Badge className={`badge-modern ${getStatusColor(item.status)} text-xs font-medium`}>
                      {item.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{item.date}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Por: {item.author}
                  </div>
                </div>
              ))}
              {news.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  <Newspaper className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No hay noticias disponibles</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Próximos Eventos */}
          <Card className="card-elegant animate-slide-up" style={{animationDelay: '0.6s'}}>
            <CardHeader className="border-b border-border/50">
              <CardTitle className="text-foreground flex items-center gap-3">
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-success" />
                </div>
                Próximos Eventos
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {events.slice(0, 3).map((event, index) => (
                <div 
                  key={event.id}
                  className="event-item p-5 border-b border-border/50 last:border-0 cursor-pointer"
                  onClick={() => handleEventClick(event)}
                  style={{animationDelay: `${0.7 + index * 0.1}s`}}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-foreground flex-1">{event.title}</h4>
                    <Badge className="badge-modern bg-success/10 text-success text-xs font-medium border-success/20">
                      ACTIVO
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-success" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-success" />
                      <span>{event.date} - {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3 text-success" />
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