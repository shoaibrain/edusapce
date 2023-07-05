"use client";

import TextField from '@mui/material/TextField';
import { useField, FieldConfig } from "formik"


interface Props extends FieldConfig{
    label: string
}

const InputField = ({label, ...props}: Props) => {
    const [field, meta] = useField(props as any) 
    return (
        <TextField 
          fullWidth
          label = {label}
          {...field}
          {...props}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error}
        />
    )
}

export default InputField