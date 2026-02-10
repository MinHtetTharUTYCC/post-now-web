'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    useUpdateProfile,
    useUploadProfileImage,
    useDeleteProfileImage,
} from '@/hooks/queries/use-user';
import type { UserDto } from '@/src/generated/api';
import { Camera, Trash2 } from 'lucide-react';
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
    const uploadImageMutation = useUploadProfileImage();
    const deleteImageMutation = useDeleteProfileImage();

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

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image size should be less than 5MB');
            return;
        }

        try {
            await uploadImageMutation.mutateAsync(file);
            toast.success('Profile image updated successfully!');
        } catch (error) {
            toast.error('Failed to upload image');
            console.error(error);
        }
    };

    const handleDeleteImage = async () => {
        try {
            await deleteImageMutation.mutateAsync();
            toast.success('Profile image removed successfully!');
        } catch (error) {
            toast.error('Failed to remove image');
            console.error(error);
        }
    };

    const getInitials = () => {
        if (user.firstName && user.lastName) {
            return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
        }
        return user.username?.[0]?.toUpperCase() || 'U';
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
                        {/* Profile Image Section */}
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={user.profileImage} alt={user.username} />
                                <AvatarFallback className="text-xl">{getInitials()}</AvatarFallback>
                            </Avatar>
                            <div className="flex gap-2">
                                <button
                                    className="px-4 py-2 border border-gray-700 hover:bg-gray-800 font-semibold transition flex items-center gap-2"
                                    type="button"
                                    disabled={uploadImageMutation.isPending}
                                    onClick={() =>
                                        document.getElementById('profile-image-upload')?.click()
                                    }
                                >
                                    <Camera className="mr-2 h-4 w-4" />
                                    {uploadImageMutation.isPending ? 'Uploading...' : 'Change'}
                                </button>
                                <input
                                    id="profile-image-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                />
                                {user.profileImage && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        disabled={deleteImageMutation.isPending}
                                        onClick={handleDeleteImage}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </div>

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
