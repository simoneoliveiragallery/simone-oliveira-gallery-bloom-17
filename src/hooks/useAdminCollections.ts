import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Collection {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export const useAdminCollections = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: collections = [], isLoading } = useQuery({
    queryKey: ["admin-collections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("collections")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data as Collection[];
    },
  });

  const createCollection = useMutation({
    mutationFn: async (collectionData: { name: string; description?: string }) => {
      const { data, error } = await supabase
        .from("collections")
        .insert([collectionData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-collections"] });
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast({
        title: "Coleção criada",
        description: "A coleção foi criada com sucesso.",
      });
    },
    onError: (error) => {
      console.error("Error creating collection:", error);
      toast({
        title: "Erro",
        description: "Erro ao criar a coleção.",
        variant: "destructive",
      });
    },
  });

  const updateCollection = useMutation({
    mutationFn: async ({ id, ...collectionData }: { id: string; name: string; description?: string }) => {
      const { data, error } = await supabase
        .from("collections")
        .update(collectionData)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-collections"] });
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast({
        title: "Coleção atualizada",
        description: "A coleção foi atualizada com sucesso.",
      });
    },
    onError: (error) => {
      console.error("Error updating collection:", error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar a coleção.",
        variant: "destructive",
      });
    },
  });

  const deleteCollection = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("collections")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-collections"] });
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      toast({
        title: "Coleção excluída",
        description: "A coleção foi excluída com sucesso.",
      });
    },
    onError: (error) => {
      console.error("Error deleting collection:", error);
      toast({
        title: "Erro",
        description: "Erro ao excluir a coleção.",
        variant: "destructive",
      });
    },
  });

  return {
    collections,
    isLoading,
    createCollection,
    updateCollection,
    deleteCollection,
  };
};