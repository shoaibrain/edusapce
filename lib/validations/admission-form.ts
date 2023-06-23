import * as yup from 'yup'

export const studentInfoValidationSchema = yup.object({
    firstName: yup.string().required('First name is required'),
    middleName: yup.string(),
    lastName: yup.string().required('Last name is required'),
    birthDate: yup.date().required('Birth date is required'),
    gender: yup.string().required('Gender is required'),
    phone: yup.string(),
    email: yup.string().email('Enter a valid email'),
    nationality: yup.string().required("nationality is required"),
    nagriktaNo: yup.string()
  })