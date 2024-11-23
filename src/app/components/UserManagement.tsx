"use client"

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { User } from "@/types/index";
import { AddUserDialog } from "./AddUserDialog";
import { EditUserDialog } from "./EditUserDialog";

export function UserManagement() {
  const users = useSelector((state: RootState) => state.users);

  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleEditUser = (user: User) => setEditingUser(user);
  const handleCloseEditDialog = () => setEditingUser(null);

  return (
    <div className="w-full p-0">
      <div className="flex justify-between items-center">
        <div className="mb-10">
          <div className="font-bold text-3xl">User Management</div>
          <div className="text-muted-foreground text-sm mt-1">
            Add, edit, or remove users from your system.
          </div>
        </div>
        <AddUserDialog />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" className="" onClick={() => handleEditUser(user)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editingUser && <EditUserDialog user={editingUser} onClose={handleCloseEditDialog} />}
    </div>
  );
}