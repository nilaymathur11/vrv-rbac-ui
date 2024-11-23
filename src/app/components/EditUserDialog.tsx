"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateUser } from "@/redux/slices/usersSlice";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { User } from "@/types/index";

interface EditUserDialogProps {
    user: User | null;
    onClose: () => void;
}

export function EditUserDialog({ user, onClose }: EditUserDialogProps) {
    const dispatch = useDispatch();
    const roles = useSelector((state: RootState) => state.roles);

    const [editingUser, setEditingUser] = useState<User | null>(user);
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        role: "",
        status: "",
    });

    const validateForm = () => {
        if (!editingUser) return false;

        const newErrors = {
            name: editingUser.name ? "" : "Name is required",
            email: editingUser.email ? "" : "Email is required",
            role: editingUser.role ? "" : "Role is required",
            status: editingUser.status ? "" : "Status is required",
        };
        setErrors(newErrors);

        // Return true if there are no errors
        return !Object.values(newErrors).some((error) => error !== "");
    };

    const handleUpdateUser = () => {
        if (validateForm() && editingUser) {
            dispatch(updateUser(editingUser));
            setErrors({ name: "", email: "", role: "", status: "" }); // Clear errors after successful submission
            onClose();
        }
    };

    return (
        <Dialog open={!!editingUser} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>
                {editingUser && (
                    <div className="grid gap-8 grid-cols-2 py-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="edit-name">Name</Label>
                            <Input
                                id="edit-name"
                                value={editingUser.name}
                                onChange={(e) =>
                                    setEditingUser({ ...editingUser, name: e.target.value })
                                }
                                placeholder="Enter name"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="edit-email">Email</Label>
                            <Input
                                id="edit-email"
                                value={editingUser.email}
                                onChange={(e) =>
                                    setEditingUser({ ...editingUser, email: e.target.value })
                                }
                                placeholder="Enter Email"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="edit-role">Role</Label>
                            <Select
                                onValueChange={(value) =>
                                    setEditingUser({ ...editingUser, role: value })
                                }
                                defaultValue={editingUser.role}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.map((role) => (
                                        <SelectItem key={role.id} value={role.name}>
                                            {role.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.role && (
                                <p className="text-red-500 text-sm">{errors.role}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="edit-status">Status</Label>
                            <Select
                                onValueChange={(value) =>
                                    setEditingUser({
                                        ...editingUser,
                                        status: value as "Active" | "Inactive",
                                    })
                                }
                                defaultValue={editingUser.status}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={"Active"}>Active</SelectItem>
                                    <SelectItem value={"Inactive"}>Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.status && (
                                <p className="text-red-500 text-sm">{errors.status}</p>
                            )}
                        </div>
                    </div>
                )}
                <Button onClick={handleUpdateUser}>Update User</Button>
            </DialogContent>
        </Dialog>
    );
}