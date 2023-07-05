"use client"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Formik } from "formik"
import * as yup from 'yup';
import InputField from "@/components/ui/input-field"
import MultiStepFormAdmission, { FormStep } from "@/components/multi-step-form-admission"
import SelectField from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const studentDetailsValidationSchema = yup.object({
  firstName: yup.string().required('first name is required'),
  middleName: yup.string().optional(),
  lastName: yup.string().required('last name is required'),
  gender: yup.string().required('student gender required'),
  dob: yup.date().required('date of birth is required'),
  currentGrade: yup.string().optional(),
  nationality: yup.string().required('student nationality is required'),
  nagriktaNumber: yup.string().optional(),
  phoneNumber: yup.string().optional(),
  email: yup.string().email().optional()
})

const admissionForm = {
  firstName: "",
  middleName: "",
  lastName: "",
  gender: "",
  dob: "",
  currentGrade: "",
  nationality: "",
  nagriktaNumber: "",
  phoneNumber: "",
  email: "",
  guardianDetails: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    guardianType: "",
    businessAddress: "",
  },
  previousSchoolDetails: {
    schoolName: "",
    schoolAddress: "",
  }
}

export default function AdmissionPage() {
  return (
    <div className="space-y-12">
         <div className="border-b border-gray-900/10 pb-12">
            <MultiStepFormAdmission
              initialValues={admissionForm}
              onSubmit = {values => {
                console.log("final form submitted")
                alert(JSON.stringify(values, null, 2));
              }}
              >
                <FormStep 
                    stepName="Student Details" 
                    onSubmit= {(values)=> {
                      console.log("step 1 submitted")
                      console.log(values)
                    }}
                    validationSchema={studentDetailsValidationSchema}
                >
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-2 sm:col-start-1">
                      <InputField name="firstName" label="First Name"/>
                    </div>
                    <div className="sm:col-span-2">
                      <InputField name="middleName" label="Middle Name"/>
                    </div>
                    <div className="sm:col-span-2">
                      <InputField name="lastName" label="Last Name"/>
                    </div>

                    <div className="sm:col-span-3">
                    <Label>Gender</Label>
                    <SelectField
                        name="gender"
                        label=""
                        options={[
                          { value: 'male', label: 'Male' },
                          { value: 'female', label: 'Female' },
                          { value: 'other', label: 'Other' },
                        ]}
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <Label>Birth Date</Label>
                      <InputField name="dob" label="" type="date" />
                    </div>

                    <div className="sm:col-span-3">
                      <InputField name="nationality" label="Nationality" />
                    </div>

                    <div className="sm:col-span-3">
                      <InputField name="nagriktaNumber" label="Nagrikta no"  />
                    </div>

                    <div className="sm:col-span-3">
                      <InputField name="phoneNumber" label="Phone No"  />
                    </div>

                    <div className="sm:col-span-3">
                      <InputField name="email" label="Email"  />
                    </div>
                  </div>
                </FormStep>
                <FormStep
                    stepName="Guardian Details"
                    onSubmit= {(values)=> {
                      console.log("step 2 submitted")
                      console.log(values)
                    }}
                    validationSchema={ yup.object({
                      guardianDetails: yup.object({
                        firstName: yup.string().required('first name is required'),
                        lastName: yup.string().required('last name is required'),
                        phoneNumber: yup.string().required('phone number is required'),
                        address: yup.string().required('address is required'),
                        guardianType: yup.string().required('guardian type is required'),
                        businessAddress: yup.string().optional(),
                      })
                    })
                    }
                >
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <InputField name="guardianDetails.firstName" label="First Name"/>
                    </div>
                    <div className="sm:col-span-3">
                      <InputField name="guardianDetails.lastName" label="Last Name"/>
                    </div>

                    <div className="sm:col-span-3">
                      <InputField name="guardianDetails.phoneNumber" label="Phone No"  />
                    </div>

                    <div className="sm:col-span-3">
                      <InputField name="guardianDetails.address" label="Address"  />
                    </div>

                    <div className="sm:col-span-3">
                      <InputField name="guardianDetails.guardianType" label="Guardian Type"  />
                    </div>

                    <div className="sm:col-span-3">
                      <InputField name="guardianDetails.businessAddress" label="Business Address"  />
                    </div>


                  </div>
                </FormStep>

                <FormStep
                    stepName="Academic Details"
                    onSubmit= {(values)=> {
                      console.log("step 2 submitted")
                      console.log(values)
                    }}
                    validationSchema={ yup.object({
                      previousSchoolDetails: yup.object({
                        schoolName: yup.string().optional(),
                        schoolAddress: yup.string().optional(),
                      })
                    })
                    }
                >
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                   <div className="sm:col-span-3">
                      <InputField name="previousSchoolDetails.schoolName" label="Previous School"  />
                    </div>
                    <div className="sm:col-span-3">
                      <InputField name="previousSchoolDetails.schoolAddress" label="Previous School Address"  />
                    </div>
                  </div>
                </FormStep>
            
            </MultiStepFormAdmission>     
         </div>
    </div>
  )
}
