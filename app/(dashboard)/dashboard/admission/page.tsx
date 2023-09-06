"use client"
import {  FormikValues } from "formik"
import * as yup from 'yup';
import InputField from "@/components/ui/input-field"
import MultiStepFormAdmission, { FormStep } from "@/components/multi-step-form-admission"

import { Label } from "@/components/ui/label"
import axios from "axios";
import { toast } from "@/components/ui/use-toast"
import {  date } from "zod";

//TODO : do this elegantly?

const admissionForm = {
  studentDetails:{
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    birthDate: date(),
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
    address: "", // home address
    email: "",
    profession: "", // business, job, agriculture, other
    annualIncome: "", // used to determine the fee discount, scholarship etc
    guardianType: "", // father, mother, uncle, aunt, brother, sister, grand father, grand mother, other
    businessAddress: "", // if guardian is a business owner
  },
  enrollmentDetails: {
    admissionType: "",
    previousSchool: "",
  }
}

//student registration form
const handleAdmission = async (values: FormikValues) => {
  const student: JSON = values.studentDetails;
  const guardian: JSON = values.guardianDetails;
  const enrollmentDetails: JSON = values.enrollmentDetails;

  let studentId: string;
  let guardianId: string;

  try {
    // Create the student
    const studentResponse = await axios.post('/api/students', student);

    studentId = studentResponse.data.id;

    // Create the guardian
    const guardianResponse = await axios.post('/api/guardians', guardian);
    guardianId = guardianResponse.data.id;

    // Establish the relationship between student and guardian
    await axios.patch(`/api/students/${studentId}`, {
      guardians: [guardianId],
    });
    await axios.patch(`/api/guardians/${guardianId}`, {
      students: [studentId],
    });

    // Create the enrollment
    const enrollmentResponse  = await axios.post(`/api/enrollments/${studentId}`, enrollmentDetails);
    console.log(enrollmentResponse.status)

  } catch (error) {
    console.error(error);
    const errorMessage = error.message || 'Error during registration';
    toast({
      title: 'Error',
      description: errorMessage,
    });
  } finally {
    toast({
      title: 'Success',
      description: 'Student registered successfully',
    });
  }
}

export default function AdmissionPage() {
  
  return (
    <div className="space-y-12">
         <div className="border-b border-gray-900/10 pb-10">
            <MultiStepFormAdmission
              initialValues={admissionForm}
              onSubmit = {(values)=> handleAdmission(values)}
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
                      {/* <SelectField
                          name="studentDetails.gender"
                          label="select student gender"
                          options={[
                            { value: 'male', label: 'Male' },
                            { value: 'female', label: 'Female' },
                            { value: 'other', label: 'Other' },
                          ]}
                        /> */}
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
                    <div className="col-span-3">
                      <div className="mt-2">
                      <InputField name="studentDetails.address" label="Address"  />
                      </div>
                    </div>

                  </div>
                </FormStep>

                <FormStep
                    stepName="Guardian Details"
                    onSubmit= {(values)=> {
                      console.log("Guardian details submitted")
                      console.log(values)
                    }}
                    validationSchema={ yup.object({
                      guardianDetails: yup.object({
                        firstName: yup.string().required('first name is required'),
                        lastName: yup.string().required('last name is required'),
                        phone: yup.string().required('phone number is required'),
                        address: yup.string().required('address is required'),
                        email: yup.string().email().optional(),
                        profession: yup.string().required('profession is required'),
                        annualIncome: yup.string().required('annual income is required'),
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
                    <div className="sm:col-span-2">
                      <InputField name="guardianDetails.email" label="Email"  />
                    </div>
                    <div className="sm:col-span-2">
                      <InputField name="guardianDetails.profession" label="Profession"  />
                    </div>

                    <div className="sm:col-span-2">
                      <InputField name="guardianDetails.annualIncome" label="Annual Income"  />
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
                      console.log("Enrollment Details submitted")
                      console.log(values)
                    }}
                    validationSchema={ yup.object({
                      enrollmentDetails: yup.object({
                        admissionType: yup.string().required('admission type is required'),
                        prevSchool: yup.string().optional(),
                      })
                    })
                    }
                >
                <p className="mt-1 text-sm leading-6 text-gray-600">Student Enrollment Details</p>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-2 ">
                      {/* <SelectField
                          name="enrollmentDetails.admissionType"
                          label=""
                          options={[
                            { value: 'Regular', label: 'Regular' },
                            { value: 'Transfer', label: 'Transfer' },
                          ]}
                        /> */}
                    </div>
                    <div className="sm:col-span-2">
                      <InputField name="enrollmentDetails.previousSchool" label="Previous School" type="text" />
                    </div>
                  </div>
                </FormStep>
            
            </MultiStepFormAdmission>     
         </div>
    </div>
  )
}
