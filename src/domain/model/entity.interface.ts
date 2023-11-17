export interface Entity<T> {
  getId(): string
  getSnapshot(): T
}