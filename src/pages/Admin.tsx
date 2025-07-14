

import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import AdminAuth from '../components/AdminAuth';
import { Plus, Edit, Trash2, Save, X, Upload, Calendar, MapPin, Star } from 'lucide-react';
import { useArtworks } from '../hooks/useArtworks';
import { useCollections } from '../hooks/useCollections';
import { useCreateArtwork, useUpdateArtwork, useDeleteArtwork, useToggleFeaturedArtwork } from '../hooks/useAdminArtworks';
import { useAdminCollections } from '../hooks/useAdminCollections';
import { toast } from 'sonner';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'artworks' | 'collections'>('artworks');
  
  // Fetch data from Supabase
  const { data: artworks = [], isLoading: artworksLoading } = useArtworks();
  const { data: collections = [], isLoading: collectionsLoading } = useCollections();
  
  // Artwork mutations
  const createArtworkMutation = useCreateArtwork();
  const updateArtworkMutation = useUpdateArtwork();
  const deleteArtworkMutation = useDeleteArtwork();
  const toggleFeaturedMutation = useToggleFeaturedArtwork();
  
  // Collection mutations
  const { createCollection, updateCollection, deleteCollection } = useAdminCollections();

  const [editingArtworkId, setEditingArtworkId] = useState<string | null>(null);
  const [editingCollectionId, setEditingCollectionId] = useState<string | null>(null);
  const [isAddingArtwork, setIsAddingArtwork] = useState(false);
  const [isAddingCollection, setIsAddingCollection] = useState(false);
  const [artworkFormData, setArtworkFormData] = useState<any>({});
  const [collectionFormData, setCollectionFormData] = useState<any>({});

  // Artwork handlers
  const handleEditArtwork = (artwork: any) => {
    console.log('Editing artwork:', artwork);
    setEditingArtworkId(artwork.id);
    setArtworkFormData({
      title: artwork.title || '',
      artist: artwork.artist || 'Simone Oliveira',
      image: artwork.image || '',
      year: artwork.year || new Date().getFullYear().toString(),
      medium: artwork.medium || '',
      description: artwork.description || '',
      dimensions: artwork.dimensions || '',
      collection_id: artwork.collection_id || '',
      featured: artwork.featured || false
    });
    setIsAddingArtwork(false);
  };

  const handleAddArtwork = () => {
    setIsAddingArtwork(true);
    setEditingArtworkId(null);
    setArtworkFormData({
      title: '',
      artist: 'Simone Oliveira',
      image: '',
      year: new Date().getFullYear().toString(),
      medium: '',
      description: '',
      dimensions: '',
      collection_id: '',
      featured: false
    });
  };

  const handleSaveArtwork = async () => {
    try {
      console.log('Saving artwork:', artworkFormData);
      
      if (isAddingArtwork) {
        await createArtworkMutation.mutateAsync(artworkFormData);
        toast.success('Obra criada com sucesso!');
      } else if (editingArtworkId) {
        await updateArtworkMutation.mutateAsync({ 
          id: editingArtworkId, 
          ...artworkFormData 
        });
        toast.success('Obra atualizada com sucesso!');
      }
      
      setEditingArtworkId(null);
      setIsAddingArtwork(false);
      setArtworkFormData({});
    } catch (error) {
      console.error('Error saving artwork:', error);
      if (error instanceof Error && error.message.includes('Máximo de 6 obras')) {
        toast.error('Máximo de 6 obras podem estar em destaque');
      } else {
        toast.error('Erro ao salvar obra');
      }
    }
  };

  const handleCancelArtwork = () => {
    setEditingArtworkId(null);
    setIsAddingArtwork(false);
    setArtworkFormData({});
  };

  const handleDeleteArtwork = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta obra?')) {
      try {
        await deleteArtworkMutation.mutateAsync(id);
        toast.success('Obra excluída com sucesso!');
      } catch (error) {
        toast.error('Erro ao excluir obra');
      }
    }
  };

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      await toggleFeaturedMutation.mutateAsync({ 
        id, 
        featured: !currentFeatured 
      });
      toast.success(
        !currentFeatured 
          ? 'Obra adicionada aos destaques!' 
          : 'Obra removida dos destaques!'
      );
    } catch (error) {
      console.error('Error toggling featured:', error);
      if (error instanceof Error && error.message.includes('Máximo de 6 obras')) {
        toast.error('Máximo de 6 obras podem estar em destaque');
      } else {
        toast.error('Erro ao alterar destaque');
      }
    }
  };

  // Collection handlers
  const handleEditCollection = (collection: any) => {
    setEditingCollectionId(collection.id);
    setCollectionFormData({
      name: collection.name || '',
      description: collection.description || ''
    });
    setIsAddingCollection(false);
  };

  const handleAddCollection = () => {
    setIsAddingCollection(true);
    setEditingCollectionId(null);
    setCollectionFormData({
      name: '',
      description: ''
    });
  };

  const handleSaveCollection = async () => {
    try {
      if (isAddingCollection) {
        await createCollection.mutateAsync(collectionFormData);
      } else if (editingCollectionId) {
        await updateCollection.mutateAsync({ 
          id: editingCollectionId, 
          ...collectionFormData 
        });
      }
      
      setEditingCollectionId(null);
      setIsAddingCollection(false);
      setCollectionFormData({});
    } catch (error) {
      console.error('Error saving collection:', error);
    }
  };

  const handleCancelCollection = () => {
    setEditingCollectionId(null);
    setIsAddingCollection(false);
    setCollectionFormData({});
  };

  const handleDeleteCollection = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta coleção?')) {
      try {
        await deleteCollection.mutateAsync(id);
      } catch (error) {
        console.error('Error deleting collection:', error);
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setArtworkFormData({ ...artworkFormData, image: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  if (artworksLoading || collectionsLoading) {
    return (
      <div className="min-h-screen bg-soft-beige flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-warm-terracotta border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-helvetica text-deep-black/70">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-beige">
      <Navigation />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-semplicita text-5xl lg:text-6xl font-light text-deep-black mb-6 leading-tight">
              Administração
            </h1>
            <p className="font-helvetica text-lg text-deep-black/80 max-w-2xl mx-auto justified-text">
              Gerencie o acervo de obras e coleções da galeria Simone Oliveira.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center space-x-1 bg-gentle-green/10 p-1 rounded-2xl mb-12 max-w-md mx-auto">
            <button
              onClick={() => setActiveTab('artworks')}
              className={`flex-1 py-3 px-6 rounded-xl font-helvetica font-medium text-sm transition-all duration-300 ${
                activeTab === 'artworks'
                  ? 'bg-warm-terracotta text-soft-beige shadow-lg'
                  : 'text-deep-black hover:text-warm-terracotta hover:bg-gentle-green/20'
              }`}
            >
              Obras
            </button>
            <button
              onClick={() => setActiveTab('collections')}
              className={`flex-1 py-3 px-6 rounded-xl font-helvetica font-medium text-sm transition-all duration-300 ${
                activeTab === 'collections'
                  ? 'bg-warm-terracotta text-soft-beige shadow-lg'
                  : 'text-deep-black hover:text-warm-terracotta hover:bg-gentle-green/20'
              }`}
            >
              Coleções
            </button>
          </div>

          {/* Add New Button */}
          <div className="mb-12 text-center">
            <button
              onClick={activeTab === 'artworks' ? handleAddArtwork : handleAddCollection}
              className="inline-flex items-center px-8 py-4 bg-warm-terracotta text-soft-beige font-helvetica font-medium rounded-full hover:bg-warm-terracotta/90 transition-all duration-300 shadow-elegant hover-lift-elegant"
            >
              <Plus size={20} className="mr-2" />
              {activeTab === 'artworks' ? 'Adicionar Nova Obra' : 'Adicionar Nova Coleção'}
            </button>
          </div>

          {/* Artworks Tab */}
          {activeTab === 'artworks' && (
            <>
              {/* Artwork Form */}
              {(isAddingArtwork || editingArtworkId) && (
                <div className="mb-12 bg-gentle-green/10 rounded-3xl p-8 border border-gentle-green/20">
                  <h3 className="font-semplicita text-2xl font-light text-deep-black mb-8">
                    {isAddingArtwork ? 'Adicionar Nova Obra' : 'Editar Obra'}
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block font-helvetica text-sm font-medium text-deep-black mb-2">
                          Título
                        </label>
                        <input
                          type="text"
                          value={artworkFormData.title || ''}
                          onChange={(e) => setArtworkFormData({ ...artworkFormData, title: e.target.value })}
                          className="w-full px-4 py-3 bg-soft-beige border border-gentle-green/30 rounded-xl focus:ring-2 focus:ring-warm-terracotta/20 focus:border-warm-terracotta transition-all duration-300 font-helvetica"
                          placeholder="Nome da obra"
                        />
                      </div>
                      
                      <div>
                        <label className="block font-helvetica text-sm font-medium text-deep-black mb-2">
                          Artista
                        </label>
                        <input
                          type="text"
                          value={artworkFormData.artist || ''}
                          onChange={(e) => setArtworkFormData({ ...artworkFormData, artist: e.target.value })}
                          className="w-full px-4 py-3 bg-soft-beige border border-gentle-green/30 rounded-xl focus:ring-2 focus:ring-warm-terracotta/20 focus:border-warm-terracotta transition-all duration-300 font-helvetica"
                          placeholder="Nome do artista"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block font-helvetica text-sm font-medium text-deep-black mb-2">
                            Ano
                          </label>
                          <input
                            type="text"
                            value={artworkFormData.year || ''}
                            onChange={(e) => setArtworkFormData({ ...artworkFormData, year: e.target.value })}
                            className="w-full px-4 py-3 bg-soft-beige border border-gentle-green/30 rounded-xl focus:ring-2 focus:ring-warm-terracotta/20 focus:border-warm-terracotta transition-all duration-300 font-helvetica"
                            placeholder="2024"
                          />
                        </div>
                        
                        <div>
                          <label className="block font-helvetica text-sm font-medium text-deep-black mb-2">
                            Técnica
                          </label>
                          <input
                            type="text"
                            value={artworkFormData.medium || ''}
                            onChange={(e) => setArtworkFormData({ ...artworkFormData, medium: e.target.value })}
                            className="w-full px-4 py-3 bg-soft-beige border border-gentle-green/30 rounded-xl focus:ring-2 focus:ring-warm-terracotta/20 focus:border-warm-terracotta transition-all duration-300 font-helvetica"
                            placeholder="Óleo sobre tela"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-helvetica text-sm font-medium text-deep-black mb-2">
                          Dimensões
                        </label>
                        <input
                          type="text"
                          value={artworkFormData.dimensions || ''}
                          onChange={(e) => setArtworkFormData({ ...artworkFormData, dimensions: e.target.value })}
                          className="w-full px-4 py-3 bg-soft-beige border border-gentle-green/30 rounded-xl focus:ring-2 focus:ring-warm-terracotta/20 focus:border-warm-terracotta transition-all duration-300 font-helvetica"
                          placeholder="120 x 80 cm"
                        />
                      </div>

                      <div>
                        <label className="block font-helvetica text-sm font-medium text-deep-black mb-2">
                          Coleção
                        </label>
                        <select
                          value={artworkFormData.collection_id || ''}
                          onChange={(e) => setArtworkFormData({ ...artworkFormData, collection_id: e.target.value || null })}
                          className="w-full px-4 py-3 bg-soft-beige border border-gentle-green/30 rounded-xl focus:ring-2 focus:ring-warm-terracotta/20 focus:border-warm-terracotta transition-all duration-300 font-helvetica"
                        >
                          <option value="">Sem coleção</option>
                          {collections?.map(collection => (
                            <option key={collection.id} value={collection.id}>
                              {collection.name}
                            </option>
                          ))}
                        </select>
                      </div>

                       <div>
                         <label className="flex items-center space-x-3">
                           <input
                             type="checkbox"
                             checked={artworkFormData.featured || false}
                             onChange={(e) => {
                               const featuredCount = artworks.filter(a => a.featured).length;
                               const currentlyFeatured = editingArtworkId && artworks.find(a => a.id === editingArtworkId)?.featured;
                               
                               if (e.target.checked && featuredCount >= 6 && !currentlyFeatured) {
                                 toast.error('Máximo de 6 obras podem estar em destaque');
                                 return;
                               }
                               
                               setArtworkFormData({ ...artworkFormData, featured: e.target.checked });
                             }}
                             className="w-5 h-5 text-warm-terracotta bg-soft-beige border-gentle-green/30 rounded focus:ring-2 focus:ring-warm-terracotta/20"
                           />
                           <span className="font-helvetica text-sm font-medium text-deep-black">
                             <Star size={16} className="inline mr-1 text-warm-terracotta" />
                             Obra em destaque (máximo 6)
                           </span>
                         </label>
                         <p className="font-helvetica text-xs text-deep-black/60 mt-1">
                           Obras em destaque aparecem na página inicial
                         </p>
                       </div>
                      
                      <div>
                        <label className="block font-helvetica text-sm font-medium text-deep-black mb-2">
                          Descrição
                        </label>
                        <textarea
                          value={artworkFormData.description || ''}
                          onChange={(e) => setArtworkFormData({ ...artworkFormData, description: e.target.value })}
                          rows={4}
                          className="w-full px-4 py-3 bg-soft-beige border border-gentle-green/30 rounded-xl focus:ring-2 focus:ring-warm-terracotta/20 focus:border-warm-terracotta transition-all duration-300 font-helvetica resize-none"
                          placeholder="Descrição da obra..."
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block font-helvetica text-sm font-medium text-deep-black mb-2">
                        Imagem
                      </label>
                      <div className="border-2 border-dashed border-gentle-green/30 rounded-xl p-8 text-center hover:border-warm-terracotta/50 transition-all duration-300">
                        {artworkFormData.image ? (
                          <div className="relative">
                            <img
                              src={artworkFormData.image}
                              alt="Preview"
                              className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <button
                              onClick={() => setArtworkFormData({ ...artworkFormData, image: '' })}
                              className="absolute top-2 right-2 p-2 bg-warm-terracotta text-soft-beige rounded-full hover:bg-warm-terracotta/90 transition-all duration-300"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <div>
                            <Upload size={48} className="mx-auto text-gentle-green/60 mb-4" />
                            <p className="font-helvetica text-deep-black/60 mb-4">
                              Clique para fazer upload ou cole uma URL
                            </p>
                          </div>
                        )}
                        
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="artwork-image-upload"
                        />
                        <label
                          htmlFor="artwork-image-upload"
                          className="inline-block px-6 py-2 bg-gentle-green/20 text-deep-black font-helvetica text-sm rounded-full cursor-pointer hover:bg-gentle-green/30 transition-all duration-300 mb-2"
                        >
                          Upload Arquivo
                        </label>
                        
                        <input
                          type="url"
                          value={artworkFormData.image || ''}
                          onChange={(e) => setArtworkFormData({ ...artworkFormData, image: e.target.value })}
                          className="w-full px-4 py-2 bg-soft-beige border border-gentle-green/30 rounded-lg text-sm font-helvetica mt-2"
                          placeholder="ou cole uma URL da imagem"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4 mt-8">
                    <button
                      onClick={handleCancelArtwork}
                      className="px-6 py-3 bg-gentle-green/20 text-deep-black font-helvetica font-medium rounded-full hover:bg-gentle-green/30 transition-all duration-300"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSaveArtwork}
                      disabled={createArtworkMutation.isPending || updateArtworkMutation.isPending}
                      className="inline-flex items-center px-6 py-3 bg-warm-terracotta text-soft-beige font-helvetica font-medium rounded-full hover:bg-warm-terracotta/90 transition-all duration-300 shadow-elegant disabled:opacity-50"
                    >
                      <Save size={18} className="mr-2" />
                      {(createArtworkMutation.isPending || updateArtworkMutation.isPending) ? 'Salvando...' : 'Salvar'}
                    </button>
                  </div>
                </div>
              )}

              {/* Artworks List */}
              {artworks.length === 0 ? (
                <div className="text-center py-16">
                  <p className="font-helvetica text-deep-black/70 text-lg">
                    Nenhuma obra cadastrada ainda
                  </p>
                  <p className="font-helvetica text-deep-black/50 text-sm mt-2">
                    Clique no botão "Adicionar Nova Obra" para começar
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                  {artworks.map((artwork) => (
                    <div key={artwork.id} className="bg-soft-beige border border-gentle-green/20 rounded-3xl overflow-hidden shadow-elegant hover-lift-elegant">
                      <div className="aspect-[4/3] relative">
                        <img
                          src={artwork.image}
                          alt={artwork.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <button
                            onClick={() => handleToggleFeatured(artwork.id, artwork.featured || false)}
                            disabled={toggleFeaturedMutation.isPending}
                            className={`p-2 rounded-full transition-all duration-300 shadow-lg disabled:opacity-50 ${
                              artwork.featured 
                                ? 'bg-warm-terracotta text-soft-beige' 
                                : 'bg-soft-beige/90 text-warm-terracotta hover:bg-soft-beige'
                            }`}
                            title={artwork.featured ? 'Remover dos destaques' : 'Adicionar aos destaques'}
                          >
                            <Star size={16} className={artwork.featured ? 'fill-current' : ''} />
                          </button>
                        </div>
                        <div className="absolute top-4 right-4 flex space-x-2">
                          <button
                            onClick={() => handleEditArtwork(artwork)}
                            className="p-2 bg-soft-beige/90 rounded-full hover:bg-soft-beige transition-all duration-300 shadow-lg"
                          >
                            <Edit size={16} className="text-warm-terracotta" />
                          </button>
                          <button
                            onClick={() => handleDeleteArtwork(artwork.id)}
                            disabled={deleteArtworkMutation.isPending}
                            className="p-2 bg-soft-beige/90 rounded-full hover:bg-soft-beige transition-all duration-300 shadow-lg disabled:opacity-50"
                          >
                            <Trash2 size={16} className="text-warm-terracotta" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semplicita text-xl font-light text-deep-black">
                            {artwork.title}
                          </h3>
                          {artwork.featured && (
                            <Star size={16} className="text-warm-terracotta fill-current flex-shrink-0 ml-2" />
                          )}
                        </div>
                        <p className="font-helvetica text-sm text-deep-black/70 mb-1">
                          {artwork.year} • {artwork.medium}
                        </p>
                        {artwork.dimensions && (
                          <p className="font-helvetica text-sm text-deep-black/70 mb-1">
                            {artwork.dimensions}
                          </p>
                        )}
                        <p className="font-helvetica text-sm text-deep-black/60 line-clamp-2">
                          {artwork.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Collections Tab */}
          {activeTab === 'collections' && (
            <>
              {/* Collection Form */}
              {(isAddingCollection || editingCollectionId) && (
                <div className="mb-12 bg-gentle-green/10 rounded-3xl p-8 border border-gentle-green/20">
                  <h3 className="font-semplicita text-2xl font-light text-deep-black mb-8">
                    {isAddingCollection ? 'Adicionar Nova Coleção' : 'Editar Coleção'}
                  </h3>
                  
                  <div className="max-w-2xl mx-auto space-y-6">
                    <div>
                      <label className="block font-helvetica text-sm font-medium text-deep-black mb-2">
                        Nome da Coleção
                      </label>
                      <input
                        type="text"
                        value={collectionFormData.name || ''}
                        onChange={(e) => setCollectionFormData({ ...collectionFormData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-soft-beige border border-gentle-green/30 rounded-xl focus:ring-2 focus:ring-warm-terracotta/20 focus:border-warm-terracotta transition-all duration-300 font-helvetica"
                        placeholder="Ex: Natureza Abstrata, Cores Vibrantes..."
                      />
                    </div>
                    
                    <div>
                      <label className="block font-helvetica text-sm font-medium text-deep-black mb-2">
                        Descrição
                      </label>
                      <textarea
                        value={collectionFormData.description || ''}
                        onChange={(e) => setCollectionFormData({ ...collectionFormData, description: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 bg-soft-beige border border-gentle-green/30 rounded-xl focus:ring-2 focus:ring-warm-terracotta/20 focus:border-warm-terracotta transition-all duration-300 font-helvetica resize-none"
                        placeholder="Descrição da coleção e sua temática..."
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4 mt-8">
                    <button
                      onClick={handleCancelCollection}
                      className="px-6 py-3 bg-gentle-green/20 text-deep-black font-helvetica font-medium rounded-full hover:bg-gentle-green/30 transition-all duration-300"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSaveCollection}
                      disabled={createCollection.isPending || updateCollection.isPending}
                      className="inline-flex items-center px-6 py-3 bg-warm-terracotta text-soft-beige font-helvetica font-medium rounded-full hover:bg-warm-terracotta/90 transition-all duration-300 shadow-elegant disabled:opacity-50"
                    >
                      <Save size={18} className="mr-2" />
                      {(createCollection.isPending || updateCollection.isPending) ? 'Salvando...' : 'Salvar'}
                    </button>
                  </div>
                </div>
              )}

              {/* Collections List */}
              {collections.length === 0 ? (
                <div className="text-center py-16">
                  <p className="font-helvetica text-deep-black/70 text-lg">
                    Nenhuma coleção cadastrada ainda
                  </p>
                  <p className="font-helvetica text-deep-black/50 text-sm mt-2">
                    Clique no botão "Adicionar Nova Coleção" para começar
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                  {collections.map((collection) => (
                    <div key={collection.id} className="bg-soft-beige border border-gentle-green/20 rounded-3xl p-8 shadow-elegant hover-lift-elegant">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-semplicita text-xl font-light text-deep-black">
                          {collection.name}
                        </h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditCollection(collection)}
                            className="p-2 bg-gentle-green/20 rounded-full hover:bg-gentle-green/30 transition-all duration-300"
                          >
                            <Edit size={16} className="text-warm-terracotta" />
                          </button>
                          <button
                            onClick={() => handleDeleteCollection(collection.id)}
                            disabled={deleteCollection.isPending}
                            className="p-2 bg-gentle-green/20 rounded-full hover:bg-gentle-green/30 transition-all duration-300 disabled:opacity-50"
                          >
                            <Trash2 size={16} className="text-warm-terracotta" />
                          </button>
                        </div>
                      </div>
                      
                      {collection.description && (
                        <p className="font-helvetica text-sm text-deep-black/60 mb-4 leading-relaxed">
                          {collection.description}
                        </p>
                      )}
                      
                      <div className="flex items-center text-deep-black/50 text-xs">
                        <span>Criada em {new Date(collection.created_at).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Admin;
