import React from 'react'
import TextField from '@mui/material/TextField';
import { FieldConfig,useField, FieldHookConfig } from 'formik';

interface Props extends FieldConfig{
    label: string;
}

const InputField = ({label, ...props}: Props) => {

    const [field, meta] = useField(props);

    return (
        <TextField 
            label = {label} 
            {...field}
            {...props}
            error = {meta.touched && Boolean(meta.error)}
            helperText = {meta.touched && meta.error}

        />
    )
}

export default InputField