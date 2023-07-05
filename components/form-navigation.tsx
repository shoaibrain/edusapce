import React from 'react'
import { Button } from './ui/button';
import { FormikValues } from 'formik';

interface Props {
    hasPrevious?: boolean;
    onBackClick: (values: FormikValues) => void;
    isLastStep: boolean;

}

const FormNavigation = (props: Props) => {
    return (
        <div className='mt-5 flex space-x-6'>
            {props.hasPrevious && (
                <Button variant="default" type='button' className="mr-4" onClick={props.onBackClick}>Back</Button>
            )}
            <Button type="submit" variant="default"> {
                props.isLastStep ? "Register" : "Save & Continue"
            }</Button>
        </div>
    )
}

export default FormNavigation