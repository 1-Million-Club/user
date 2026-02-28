import { zodResolver } from '@hookform/resolvers/zod';
import type React from 'react';
import type { SetStateAction } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { FieldGroup } from '../ui/field';
import { FormField } from '../ui/form-field';

const checkInSchema = z.object({
  investmentAmount: z
    .string()
    .min(1, 'Investment amount is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Please enter a valid amount greater than 0',
    }),
  image: z
    .instanceof(FileList)
    .optional()
    .refine(
      (files) =>
        !files || files.length === 0 || files[0].size <= 2 * 1024 * 1024,
      { message: 'File must be under 2MB' },
    ),
  note: z.string().optional(),
});

type CheckInFormValues = z.infer<typeof checkInSchema>;

function CheckInSummary() {
  return (
    <div className="bg-[#FAFAFA] border border-[#F0F0F0] text-[#404040] text-sm font-medium rounded-lg p-4 flex flex-col gap-1">
      <p>March 2026 Check-In</p>
      <p>Due March 31</p>
      <div className="flex items-center gap-1.5">
        <span>Monthly</span>
        <span className="w-1 h-1 rounded-full bg-[#A3A3A3] inline-block" />
        <span>Treasury Bill</span>
      </div>
    </div>
  );
}

export default function CheckInModal({
  isOpen,
  setIsOpen,
  onSuccess,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  onSuccess: () => void;
}) {
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<CheckInFormValues>({
    resolver: zodResolver(checkInSchema),
    defaultValues: {
      investmentAmount: '',
      note: '',
    },
  });

  const imageFile = form.watch('image');
  const fileName = imageFile && imageFile.length > 0 ? imageFile[0].name : null;

  function onSubmit(data: CheckInFormValues) {
    console.log('Check-in submitted:', data);
    setIsSuccess(true);
    onSuccess();
  }

  function handleClose() {
    form.reset();
    setIsSuccess(false);
    setIsOpen(false);
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      {isSuccess ? (
        <DialogContent
          className="px-4 py-6 flex flex-col items-center gap-6 rounded-2xl overflow-hidden"
          showCloseButton={false}
        >
          <img src="/success.png" alt="success_icon" />

          <div className="text-center space-y-2">
            <div>
              <h5 className="font-bold text-[#0E021A]">
                March 2026 Completed ✅
              </h5>
              <p className="text-[#404040] font-medium">
                You're building a consistent investment habit.
              </p>
            </div>
            <div className="text-[#404040] font-medium text-sm">
              <p>Amount recorded: GHS 1,500</p>
              <p>Consistency: 75%</p>
              <p>Momentum: Strong</p>
            </div>
          </div>

          <Button
            onClick={handleClose}
            className="text-[#667185] bg-transparent hover:bg-transparent"
          >
            Return to dashboard
          </Button>
        </DialogContent>
      ) : (
        <DialogContent className="p-0 gap-0 rounded-2xl overflow-hidden">
          <DialogHeader className="px-5 pt-5 pb-4 border-b border-[#E5E7EB]">
            <DialogTitle className="text-[#0E021A] text-base font-bold">
              Check-in
            </DialogTitle>
            <DialogDescription className="sr-only">
              Check in form
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="px-5 pt-5 pb-5"
          >
            <FieldGroup>
              <CheckInSummary />

              <FormField
                name="investmentAmount"
                control={form.control}
                label="Investment amount"
                type="number"
                placeholder="0.00"
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#0A0A0A]">
                  Upload image{' '}
                  <span className="text-[#9CA3AF] font-normal">(optional)</span>
                </label>
                <label
                  className={`flex items-center border rounded-lg overflow-hidden cursor-pointer bg-white hover:bg-gray-50 transition-colors ${
                    form.formState.errors.image
                      ? 'border-red-400'
                      : 'border-[#D4D4D4]'
                  }`}
                >
                  <span className="px-3 py-2.5 text-sm font-medium text-[#0A0A0A] border-r border-[#D4D4D4] bg-[#F9FAFB] whitespace-nowrap select-none">
                    Choose file
                  </span>
                  <span className="px-3 py-2.5 text-sm text-[#9CA3AF] truncate">
                    {fileName ?? 'Select file (img, pdf – max 2MB)'}
                  </span>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="sr-only"
                    {...form.register('image')}
                  />
                </label>
                {form.formState.errors.image && (
                  <p className="text-xs text-red-500">
                    {form.formState.errors.image.message as string}
                  </p>
                )}
              </div>

              <FormField
                name="note"
                control={form.control}
                label="Note (optional)"
                inputType="textarea"
                placeholder="Enter note here..."
                rows={4}
              />

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleClose}
                  className="text-sm font-medium text-[#0A0A0A] bg-[#F7F7F7] hover:bg-[#F7F7F7]"
                >
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </FieldGroup>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
}
