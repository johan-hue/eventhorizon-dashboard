import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { NewsModal } from '@/components/NewsModal';
import { SearchFilter } from '@/components/SearchFilter';
import { mockNews, News } from '@/data/mockData';
import { Newspaper, Clock, MapPin } from 'lucide-react';

export const NewsPage = () => {
  const [news, setNews] = useState<News[]>(mockNews);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.date.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleNewsClick = (newsItem: News) => {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = (id: string, status: News['status']) => {
    setNews(prevNews => 
      prevNews.map(item => 
        item.id === id ? { ...item, status } : item
      )
    );
  };

  const handleDelete = (id: string) => {
    setNews(prevNews => prevNews.filter(item => item.id !== id));
    setIsModalOpen(false);
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="dashboard-gradient text-primary-foreground p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Newspaper className="h-8 w-8" />
            Gestión de Noticias
          </h1>
          <p className="text-primary-foreground/80">Administra todas las noticias reportadas por los vecinos</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Search and Filter */}
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          placeholder="Buscar por título, descripción, autor o fecha..."
        />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="card-elegant">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{news.length}</div>
              <p className="text-sm text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          <Card className="card-elegant">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-warning">
                {news.filter(n => n.status === 'pendiente').length}
              </div>
              <p className="text-sm text-muted-foreground">Pendientes</p>
            </CardContent>
          </Card>
          <Card className="card-elegant">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">
                {news.filter(n => n.status === 'en-proceso').length}
              </div>
              <p className="text-sm text-muted-foreground">En Proceso</p>
            </CardContent>
          </Card>
          <Card className="card-elegant">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success">
                {news.filter(n => n.status === 'resuelto').length}
              </div>
              <p className="text-sm text-muted-foreground">Resueltas</p>
            </CardContent>
          </Card>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <Card 
              key={item.id}
              className="card-elegant cursor-pointer"
              onClick={() => handleNewsClick(item)}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {item.description}
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{item.date} - {item.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{item.location}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Reportado por: {item.author}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <Newspaper className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No hay noticias</h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== 'all' 
                ? 'No se encontraron noticias con los filtros aplicados'
                : 'No hay noticias disponibles en este momento'
              }
            </p>
          </div>
        )}
      </div>

      <NewsModal
        news={selectedNews}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdateStatus={handleUpdateStatus}
        onDelete={handleDelete}
      />
    </div>
  );
};