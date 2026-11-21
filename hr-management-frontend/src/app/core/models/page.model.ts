/** Structure de pagination renvoyée par Spring Data. */
export interface SpringPage<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  /** Page courante (index 0) */
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
