"use client"

import * as yup from 'yup';
import InputField from "@/components/ui/input-field";
import MultiStepForm, { FormStep } from "@/components/multi-step-form";


const studentInfoValidationSchema =  yup.object().shape({
  firstName: yup.string().required('First name is required'),
  middleName: yup.string().optional(),
  lastName: yup.string().required('Last name is required'),
  birthDate: yup.date().required('Birth date is required'),
  gender: yup.string().required("Gender is required"),
  phone: yup.string().optional(),
  email: yup.string().email('Enter a valid email').optional(),
  address: yup.string().required('Address is required'),
  
})
const parentInfoValidationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  middleName: yup.string().optional(),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Enter a valid email').optional(),
  phone: yup.string().required('Phone number is required'),
  address: yup.string().required('Address is required'),
})

const enrollmentValidationSchema = yup.object().shape({
  gradeLevel: yup.string().optional(),
  section: yup.string().optional(),
  schoolYear: yup.string().optional(),
  semester: yup.string().optional(),
})

const formValues = {
  firstName: "",
  middleName: "",
  lastName: "",
  birthDate: "",
  gender: "",
  phone: "",
  address: "",
  email: "",
  parentInfo: {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  },
  enrollment: {
    gradeLevel: "",
    section: "",
    schoolYear: "",
    semester: "",
  }
}

export default function AdmissionPage() {
  return (
    <div className="space-y-12">
         <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Student Information</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail</p>
                <div>
                   <MultiStepForm
                        initialValues={formValues}
                        onSubmit={(values) => {
                            alert(JSON.stringify(values, null, 2));
                            }}
                    > 
                      <FormStep stepName = "Student Information" 
                                onSubmit={() => console.log("step 1 submitted")}
                                validationSchema={studentInfoValidationSchema}
                          >
                          <InputField name = "firstName" label = "First Name"/>
                          <InputField name = "middleName" label = "Middle Name"/>
                          <InputField name = "lastName" label = "Last Name"/>
                          <InputField name = "birthDate" label = "Birth Date"/>
                          <InputField name='gender' label='Gender' />
                          <InputField name = "phone" label = "Phone"/>
                          <InputField name = "address" label = "Address"/>
                          <InputField name = "email" label = "Email"/>
                      </FormStep>
                      <FormStep stepName="Guardian Information"
                                onSubmit={() => console.log("step 2 submitted")}
                                validationSchema={parentInfoValidationSchema}
                          >
                          <InputField name = "parentInfo.firstName" label = "First Name" />
                          <InputField name = "parentInfo.middleName" label = "Middle Name"/>
                          <InputField name = "parentInfo.lastName" label = "Last Name"/>
                          <InputField name = "parentInfo.email" label = "Email"/>
                          <InputField name = "parentInfo.phone" label = "Phone"/>
                          <InputField name = "parentInfo.address" label = "Address"/>
                          
                        </FormStep>
                        <FormStep stepName="Enrollment Information"
                                onSubmit={() => console.log("step 3 submitted")}
                                validationSchema={enrollmentValidationSchema}
                          >
                          <InputField name = "enrollment.gradeLevel" label = "Current Grade" />
                          <InputField name = "enrollment.section" label = "Section"/>
                          <InputField name = "enrollment.schoolYear" label = "School Year"/>
                          <InputField name = "enrollment.semester" label = "Semester"/>

                        </FormStep>  
                    </MultiStepForm>

                </div>
         </div>
    </div>
  )
}
