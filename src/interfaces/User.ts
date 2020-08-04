export interface CreateUser {
  name: string;
  phone: string;
  email: string;
  password: string;
  birthDate: Date;
}

export interface UpdateUser {
  name: string;
  phone: string;
  birthDate: Date;
}

export interface UpdateUser {
  name: string;
  phone: string;
  updatedAt: Date;
}

export interface Login {
  email: string;
  password: string;
}
