type User = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  session_id: string;
  auth_type: string;
  isVerified: boolean;
  isArchived: boolean;
};

export type CustomerType = User & {
  customer_id: number;
  isEmployee: boolean;
};

export type AdminType = User & {
  admin_id: number;
};
