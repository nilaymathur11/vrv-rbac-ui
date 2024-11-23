"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addUser } from "@/redux/slices/usersSlice";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import { NewUser } from "@/types/index";

export function AddUserDialog() {
    const dispatch = useDispatch();
    const roles = useSelector((state: RootState) => state.roles);

    const [newUser, setNewUser] = useState<NewUser>({
        name: "",
        email: "",
        role: "",
        status: "Active",
    });

    const [isOpen, setIsOpen] = useState(false);
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        role: "",
    });

    const validateForm = () => {
        const newErrors = {
            name: newUser.name ? "" : "Name is required",
            email: newUser.email ? "" : "Email is required",
            role: newUser.role ? "" : "Role is required",
        };
        setErrors(newErrors);

        // Return true if there are no errors
        return !Object.values(newErrors).some((error) => error !== "");
    };

    const handleAddUser = () => {
        if (validateForm()) {
            dispatch(addUser({ ...newUser, id: Date.now() }));
            setNewUser({ name: "", email: "", role: "", status: "Active" });
            setErrors({ name: "", email: "", role: "" });
            setIsOpen(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add New User
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 grid-cols-2 py-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={newUser.name}
                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                            placeholder="Enter name"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            placeholder="Enter Email"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="role">Role</Label>
                        <Select onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                            <SelectTrigger className="col-span-3">
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
                        {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                    </div>
                </div>
                <Button onClick={handleAddUser}>Add User</Button>
            </DialogContent>
        </Dialog>
    );
}