export type Gender = 'MALE' | 'FEMALE';

export const GENDER_OPTIONS: ReadonlyArray<{ value: Gender; label: string }> = [
  { value: 'MALE', label: 'Homme' },
  { value: 'FEMALE', label: 'Femme' }
];

export interface AddressRequest {
  street: string;
  city: string;
  country: string;
  postalCode: number;
}

export interface EmployeeRequest {
  name: string;
  email: string;
  gender: Gender;
  departementId: string | null;
  adresse: AddressRequest | null;
}

export interface EmployeeResponse {
  /** UUID */
  employeeID: string;
  name: string;
  email: string;
  gender: Gender;
  departementName?: string | null;
  city?: string | null;
}
