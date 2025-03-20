export interface Contact {
  id: string;
  userId: string;
  productName: string;
  openingDate: string;
  expirationDate: string;
  contactType: ContactType;
  isExpired: boolean;
  isNotificationOn: boolean;
  description?: string;
  priority: Priority;
  lastNotificationSent?: string;
  createdAt: string;
  updatedAt: string;
}

export enum ContactType {
  INSURANCE = 'INSURANCE',
  WARRANTY = 'WARRANTY',
  SUBSCRIPTION = 'SUBSCRIPTION',
  MEMBERSHIP = 'MEMBERSHIP',
  OTHER = 'OTHER'
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}
