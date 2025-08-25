export interface GenericRepository<T, TFilters = any> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
  create(entity: T): Promise<T>;
  update(id: string, entity: T): Promise<T>;
  delete(id: string): Promise<void>;
  search(filters: TFilters): Promise<T[]>;
}