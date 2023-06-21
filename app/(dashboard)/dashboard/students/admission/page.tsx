"use client"
import { Formik } from "formik"
import * as yup from 'yup';
import InputField from "@/components/ui/input-field";
import MultiStepForm, { FormStep } from "@/components/multi-step-form";
import { Button } from "@/components/ui/button";

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
})


export default function AdmissionPage() {
  return (
    <div className="space-y-12">
         <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Student Information</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail</p>
                {/* Multi step form for student Admission */}
                <div>
                   <MultiStepForm
                        initialValues={
                          {
                           name: '',
                           email: '',
                           street: '',
                           country: '', 
                          }
                        }
                        onSubmit={(values) => {
                            alert(JSON.stringify(values, null, 2));
                            }}
                    > 
                      <FormStep stepName = "Person" 
                                onSubmit={() => console.log("step 1 submitted")}
                                validationSchema={validationSchema}
                          >
                          <InputField name = "name" label = "Name"/>
                          <InputField name = "email" label = "Email"/>
                      </FormStep>
                      <FormStep stepName="Address"
                                onSubmit={() => console.log("step 2 submitted")}
                                validationSchema={
                                  yup.object({
                                    street: yup.string().required('Street is required'),
                                    country: yup.string().required('Country is required'),
                                  })
                                }
                      >
                          <InputField name = "street" label = "Street" />
                          <InputField name = "country" label = "Country"/>
                        </FormStep>
                        
                    </MultiStepForm>

                </div>
         </div>
    </div>
  )
}
