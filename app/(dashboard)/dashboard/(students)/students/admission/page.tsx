"use client"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Formik, FormikValues, useField } from "formik"
import * as yup from 'yup';
import InputField from "@/components/ui/input-field"
import MultiStepFormAdmission, { FormStep } from "@/components/multi-step-form-admission"
import SelectField from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import axios from "axios";
import { toast } from "@/components/ui/use-toast"

const admissionForm = {
  studentDetails:{
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    currentGrade: "",
    nationality: "",
    nagriktaNumber: "",
    phone: "",
    email: "",
    address: "",
  },
  guardianDetails: {
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    guardianType: "",
    businessAddress: "",
  },
  enrollmentDetails: {
    admissionType: "",
    enrollmentDate: "",
    enrollmentGrade: "",
    additionalInfo: "",

    prevSchoolName: "",
    prevSchoolAddress: "",
    prevSchoolPhone: "",

  }
}

//student registration form
const handleRegister = async (values: FormikValues) => {
  const student: JSON = values.studentDetails;
  const guardian: JSON = values.guardianDetails;
  const previousSchool: JSON = values.previousSchoolDetails;

  let studentId: string;
  let guardianId: string;

  try {
    const response = await axios.post('/api/students', studentDetails);
    const studentId = response.data.id;

    const guardianResponse = await axios.post('/api/guardians', guardianDetails);

    toast({
      title: 'Student Registered successfully',
      variant: 'default',
    });

    // Create the guardian
    const guardianResponse = await axios.post('/api/guardians', guardian);
    console.log(guardianResponse);
    guardianId = guardianResponse.data.id;
    toast({
      title: 'Guardian Registered successfully',
      variant: 'default',
    });

    // Establish the relationship between student and guardian
    await axios.post('/api/students/' + studentId + '/guardians', {
      guardianId: guardianId,
    });
    toast({
      title: 'Relationship Established successfully',
      variant: 'default',
    });

  } catch (error) {
    console.error(error);
    toast({
      title: 'Error during registration',
      variant: 'destructive',
    });
  }
}

export default function AdmissionPage() {
  
  return (
    <div className="space-y-12">
         <div className="border-b border-gray-900/10 pb-12">
            <MultiStepFormAdmission
              initialValues={admissionForm}
              onSubmit = {(values)=> handleRegister(values)}
              >
                <FormStep 
                    stepName="Student Details" 
                    onSubmit= {(values)=> {
                      console.log("step 1 submitted")
                      console.log(values)
                    }}
                    validationSchema={ yup.object({
                      studentDetails: yup.object({
                        firstName: yup.string().required('first name is required'),
                        middleName: yup.string().optional(),
                        lastName: yup.string().required('last name is required'),
                        gender: yup.string().required('student gender required'),
                        birthDate: yup.date().required('date of birth is required'),
                        currentGrade: yup.string().optional(),
                        nationality: yup.string().required('student nationality is required'),
                        nagriktaNumber: yup.string().optional(),
                        phone: yup.string().optional(),
                        email: yup.string().email().optional(),
                        address: yup.string().required('address is required'),
                      })
                    })}
                >
                  <p className="mt-1 text-sm leading-6 text-gray-600">Provide student details</p>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-2 sm:col-start-1">
                      <InputField name="studentDetails.firstName" label="First Name"/>
                    </div>
                    <div className="sm:col-span-2">
                      <InputField name="studentDetails.middleName" label="Middle Name"/>
                    </div>
                    <div className="sm:col-span-2">
                      <InputField name="studentDetails.lastName" label="Last Name"/>
                    </div>

                    <div className="sm:col-span-3">
                    <Label>Gender</Label>
                    <SelectField
                        name="studentDetails.gender"
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
                      <InputField name="studentDetails.birthDate" label="" type="date" />
                    </div>

                    <div className="sm:col-span-3">
                      <InputField name="studentDetails.nationality" label="Nationality" />
                    </div>

                    <div className="sm:col-span-3">
                      <InputField name="studentDetails.nagriktaNumber" label="Nagrikta no"  />
                    </div>

                    <div className="sm:col-span-3">
                      <InputField name="studentDetails.phone" label="Phone No"  />
                    </div>

                    <div className="sm:col-span-3">
                      <InputField name="studentDetails.email" label="Email"  />
                    </div>
                    <div className="col-span-full">
                      <div className="mt-2">
                      <InputField name="studentDetails.address" label="Address"  />
                      </div>
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
                        phone: yup.string().required('phone number is required'),
                        address: yup.string().required('address is required'),
                        guardianType: yup.string().required('guardian type is required'),
                        businessAddress: yup.string().optional(),
                      })
                    })
                    }
                >
                  <p className="mt-1 text-sm leading-6 text-gray-600">Provide Guardian details</p>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <InputField name="guardianDetails.firstName" label="First Name"/>
                    </div>
                    <div className="sm:col-span-3">
                      <InputField name="guardianDetails.lastName" label="Last Name"/>
                    </div>

                    <div className="sm:col-span-3">
                      <InputField name="guardianDetails.phone" label="Phone No"  />
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
                    stepName="Enrollment Details"
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
                <p className="mt-1 text-sm leading-6 text-gray-600">Student Enrollment Details</p>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3 ">
                    <SelectField
                        name="enrollmentDetails.admissionType"
                        label=""
                        options={[
                          { value: 'Regular', label: 'Regular' },
                          { value: 'Transfer', label: 'Transfer' },
                        ]}
                      />
                    </div>

                        <div className="sm:col-span-3">
                          <InputField
                            type="text"
                            name="enrollmentDetails.prevSchoolName"
                            label="Previous School Name"
                          />
                          <InputField
                            type="text"
                            name="enrollmentDetails.prevSchoolAddress"
                            label="Previous School Address"
                          />
                        </div>
                      
                    <div className="sm:col-span-3">
                      <InputField name="enrollmentDetails.enrollmentDate" label="Academic Year"  />
                    </div>

                  </div>
                </FormStep>
            
            </MultiStepFormAdmission>     
         </div>
    </div>
  )
}