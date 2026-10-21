const API_URL = process.env.API_URL || "http://backend:4000";

export type Garderie = {
  name: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  openingHours: string;
  ageRange: string;
};

export type Service = {
  id: number;
  icon: string;
  title: string;
  description: string;
};

export type Activite = {
  id: number;
  title: string;
  description: string;
  ageGroup: string;
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

async function fetchApi<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}/api/${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Erreur API (${response.status}) sur /api/${path}`);
  }

  const body = (await response.json()) as ApiResponse<T>;
  if (!body.success) {
    throw new Error(body.message || "La réponse de l'API est invalide.");
  }
  return body.data;
}

export async function getGarderie() {
  return fetchApi<Garderie>("garderie");
}

export async function getServices() {
  return fetchApi<Service[]>("services");
}

export async function getActivites() {
  return fetchApi<Activite[]>("activites");
}
