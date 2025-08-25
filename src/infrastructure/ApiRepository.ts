import axios from "axios";
import type { GenericRepository } from "../domain/GenericRepository";

export class ApiRepository<T, TFilters = any>
  implements GenericRepository<T, TFilters>
{
  constructor(private baseUrl: string) {}

  async getAll(): Promise<T[]> {
    const res = await axios.get<T[]>(this.baseUrl);
    return res.data;
  }

  async getById(id: string): Promise<T> {
    const res = await axios.get<T>(`${this.baseUrl}/${id}`);
    return res.data;
  }

  async create(entity: T): Promise<T> {
    const res = await axios.post<T>(this.baseUrl, entity);
    return res.data;
  }

  async update(id: string, entity: T): Promise<T> {
    const res = await axios.put<T>(`${this.baseUrl}/${id}`, entity);
    return res.data;
  }

  async delete(id: string): Promise<void> {
    await axios.delete(`${this.baseUrl}/${id}`);
  }

  async search(filters: TFilters): Promise<T[]> {
    const res = await axios.post<T[]>(`${this.baseUrl}/search`, filters);
    return res.data;
  }
}
