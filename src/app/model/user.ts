export class User {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  settings?: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    notificationFrequency: string;
    language: string;
    timezone: string;
    theme: string;
  };
}
