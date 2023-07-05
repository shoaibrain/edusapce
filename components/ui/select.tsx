import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useField, FieldConfig } from 'formik';

interface Props extends FieldConfig {
  label: string;
  options: { value: string; label: string }[]; // Array of options with value and label
}

const SelectField = ({ label, options, ...props }: Props) => {
  const [field, meta] = useField(props as any);
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        {...field}
        {...props}
        error={meta.touched && Boolean(meta.error)}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectField;
