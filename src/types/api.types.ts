export interface CosmereResponse<T> {
  success: boolean;
  data: T | null;
  error?: string;
}
