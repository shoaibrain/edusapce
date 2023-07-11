"use client";

import { Form, Formik, FormikConfig, FormikHelpers, FormikValues } from "formik";
import React, {useState} from "react";
import FormNavigation from "./form-navigation";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

interface Props extends FormikConfig<FormikValues>{
    children: React.ReactNode;
}

const MultiStepFormAdmission = ({
    children,
    initialValues,
    onSubmit,

}: Props) => {
    const [stepNumber, setStepNumber] = useState(0)
    const steps = React.Children.toArray(children) as React.ReactElement[]

    const [snapshot, setSnapshot] = useState(initialValues)

    const step = steps[stepNumber]
    const totalSteps = steps.length
    const isLastStep = stepNumber === totalSteps - 1


    const next = (values: FormikValues) => {
        setSnapshot(values);
        setStepNumber(stepNumber + 1)
        
    }
    const previous = (values: FormikValues) => {
        setSnapshot(values);
        setStepNumber(stepNumber - 1)
    }

    const handleSubmit = async (values: FormikValues, actions: FormikHelpers<FormikValues>) => {
        if (step.props.onSubmit) { 
            await step.props.onSubmit(values)
        }
        if (isLastStep) {
            return onSubmit(values, actions)
        } else {
            actions.setTouched({})
            next(values)
        }
    }
    return (
        <div className=" border border-red-500 p-3">
            <p className="text-center text-lg font-semibold leading-loose">Student Admission Form</p>
            <Formik
                initialValues={snapshot}
                onSubmit={handleSubmit}
                validationSchema={step.props.validationSchema}
              >
              { (formik) => (
                    <Form className="border border-green-500 p-3">
                    <Stepper activeStep={stepNumber}>
                        {steps.map(currentStep => {
                            const label = currentStep.props.stepName;
                            return <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        })}
                    </Stepper>
                        {step}
                        <FormNavigation isLastStep={isLastStep} hasPrevious={stepNumber > 0} onBackClick={() => previous(formik.values)} />
                    </Form>)
              }
            </Formik>     
        </div>
    )
}

export default MultiStepFormAdmission

export const FormStep = ({stepName="", children}: any) => children