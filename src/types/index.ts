// User related types
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
}

export interface AppSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export interface NewUser {
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
}

// Role related types
export interface Role {
  id: number;
  name: string;
  permissions: string[];
}

export interface NewRole {
  name: string;
  permissions: string[];
}

// State related types
export interface RootState {
  users: User[];
  roles: Role[];
}

// Component prop types
export interface LayoutProps {
  children: React.ReactNode;
}

export interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export interface SidebarProps {
  onClose?: () => void;
}

// Form error type
export interface FormErrors {
  [key: string]: string;
}

// Redux action types
export interface AddUserAction {
  type: 'users/addUser';
  payload: User;
}

export interface UpdateUserAction {
  type: 'users/updateUser';
  payload: User;
}

export interface DeleteUserAction {
  type: 'users/deleteUser';
  payload: number;
}

export interface AddRoleAction {
  type: 'roles/addRole';
  payload: Role;
}

export interface UpdateRoleAction {
  type: 'roles/updateRole';
  payload: Role;
}

export interface DeleteRoleAction {
  type: 'roles/deleteRole';
  payload: number;
}

export type UserAction = AddUserAction | UpdateUserAction | DeleteUserAction;
export type RoleAction = AddRoleAction | UpdateRoleAction | DeleteRoleAction;

