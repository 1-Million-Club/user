import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form';

type BaseProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
};

type InputFieldProps<T extends FieldValues> = BaseProps<T> & {
  type?: 'text' | 'email' | 'password' | 'number' | 'url' | 'tel';
  inputType?: 'input';
};

type TextareaFieldProps<T extends FieldValues> = BaseProps<T> & {
  inputType: 'textarea';
  rows?: number;
};

type SelectFieldProps<T extends FieldValues> = BaseProps<T> & {
  inputType: 'select';
  options: { label: string; value: string }[];
};

type FormFieldProps<T extends FieldValues> =
  | InputFieldProps<T>
  | TextareaFieldProps<T>
  | SelectFieldProps<T>;

export function FormField<T extends FieldValues>(props: FormFieldProps<T>) {
  const { name, control, label, placeholder, autoComplete, className } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          className={`${className} text-dark-black gap-1`}
        >
          <FieldLabel htmlFor={`field-${name}`}>{label}</FieldLabel>

          {props.inputType === 'textarea' ? (
            <Textarea
              {...field}
              id={`field-${name}`}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              rows={props.rows}
            />
          ) : props.inputType === 'select' ? (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id={`field-${name}`}
                aria-invalid={fieldState.invalid}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {props.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              {...field}
              type={props.type || 'text'}
              id={`field-${name}`}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              autoComplete={autoComplete}
            />
          )}

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
