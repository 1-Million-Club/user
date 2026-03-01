import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FieldGroup } from '@/components/ui/field';
import { FormField } from '@/components/ui/form-field';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be at most 100 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character'),
});

type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

function ChangePasswordModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  });

  function onSubmit(data: ChangePasswordValues) {
    console.log('Password changed:', data);
    form.reset();
    setIsOpen(false);
  }

  function handleCancel() {
    form.reset();
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-0 gap-0 rounded-2xl overflow-hidden">
        <DialogHeader className="px-5 pt-5 pb-4 border-b border-[#E5E7EB]">
          <DialogTitle className="text-[#0E021A] text-base font-bold">
            Change password
          </DialogTitle>
          <DialogDescription className="text-sm sr-only text-quarternary font-medium">
            Update your password to secure account. Please choose a strong
            password of at least 8 characters.
          </DialogDescription>
        </DialogHeader>

        <p className="text-sm px-5 pt-5 text-quarternary font-medium">
          Update your password to secure account. Please choose a strong
          password of at least 8 characters.
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="px-5 pt-5 pb-5">
          <FieldGroup>
            <FormField
              name="currentPassword"
              control={form.control}
              label="Current password"
              type="password"
              placeholder="Enter password"
            />
            <FormField
              name="newPassword"
              control={form.control}
              label="New password"
              type="password"
              placeholder="Enter password"
            />

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={handleCancel}
                className="text-sm font-medium text-[#0A0A0A] bg-[#F7F7F7] hover:bg-[#F0F0F0]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
              >
                Update password
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function SecurityTab() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-bold text-[#0A0A0A] text-xl">Security</h2>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-[#0A0A0A]">Password</p>

        <div className="flex items-center justify-between border border-[#F0F0F0] rounded-xl px-4 py-3.5">
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-semibold text-[#0A0A0A]">
              Account password
            </p>
            <p className="text-sm text-quarternary font-medium">
              Password keeps your account secure
            </p>
          </div>

          <Button
            variant="outline"
            className="bg-[#F0F2F5] text-sm rounded-full py-2 px-4 font-semibold text-[#0E021A] shrink-0"
            onClick={() => setModalOpen(true)}
          >
            Change password
          </Button>
        </div>
      </div>

      <ChangePasswordModal isOpen={modalOpen} setIsOpen={setModalOpen} />
    </div>
  );
}
