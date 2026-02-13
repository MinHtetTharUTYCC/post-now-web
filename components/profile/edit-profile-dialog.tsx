'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useUpdateProfile } from '@/hooks/queries/use-user';
import type { UserDto } from '@/src/generated/api';
import { toast } from 'sonner';

interface EditProfileDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: UserDto;
}

export function EditProfileDialog({ open, onOpenChange, user }: EditProfileDialogProps) {
    const [formData, setFormData] = useState({
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        bio: user.bio || '',
    });

    const updateProfileMutation = useUpdateProfile();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateProfileMutation.mutateAsync(formData);
            toast.success('Profile updated successfully!');
            onOpenChange(false);
        } catch (error) {
            toast.error('Failed to update profile');
            console.error(error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-125 bg-black border-gray-700 text-white">
                <DialogHeader>
                    <DialogTitle className="text-white">Edit Profile</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Make changes to your profile here.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 py-4">
                        {/* First Name */}
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-white">
                                First Name
                            </Label>
                            <Input
                                id="firstName"
                                value={formData.firstName}
                                onChange={(e) =>
                                    setFormData({ ...formData, firstName: e.target.value })
                                }
                                className="bg-gray-900 border-gray-700 text-white rounded-none"
                            />
                        </div>

                        {/* Last Name */}
                        <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-white">
                                Last Name
                            </Label>
                            <Input
                                id="lastName"
                                value={formData.lastName}
                                onChange={(e) =>
                                    setFormData({ ...formData, lastName: e.target.value })
                                }
                                className="bg-gray-900 border-gray-700 text-white rounded-none"
                            />
                        </div>

                        {/* Bio */}
                        <div className="space-y-2">
                            <Label htmlFor="bio" className="text-white">
                                Bio
                            </Label>
                            <Textarea
                                id="bio"
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                placeholder="Tell us about yourself..."
                                className="resize-none bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 rounded-none"
                                rows={4}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <button
                            type="button"
                            className="px-4 py-2 border border-gray-700 hover:bg-gray-800 font-semibold transition"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={updateProfileMutation.isPending}
                            className="px-4 py-2 bg-white text-black font-semibold hover:bg-gray-200 transition disabled:opacity-50"
                        >
                            {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
