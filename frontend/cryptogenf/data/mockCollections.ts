import { CollectionI } from "@/app/types";

export default async function getCollectionById(id: string): Promise<CollectionI> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `Erro ${res.status}: Falha ao buscar a coleção`);
    }

    const collection: CollectionI = await res.json();
    return collection;
  } catch (error: any) {
    console.error('Erro ao buscar coleção:', error.message);
    throw error;
  }
}