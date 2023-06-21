import React from 'react'
import { Button } from "@/components/ui/button";
import { FormikValues } from 'formik';

interface Props {
    hasPrevious?: boolean;
    isLastStep: boolean;
    onBackClick: (values: FormikValues) => void;

}

const FormNavigation = (props: Props) => {
  return (
    <div className="mt-4">
        {props.hasPrevious  && (
            <Button type='button' onClick={props.onBackClick} className="m-2">Back</Button>
        ) }

        <Button type='submit'>
            {props.isLastStep ? 'Submit' : 'Next'}
        </Button>
    </div>
  )
}

export default FormNavigation