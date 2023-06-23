
export const admissionForm = {
    "studnetInformation": {
      "firstName": "",
      "middleName": "",
      "lastName": "",
      "birthDate": "",
      "gender": "",
      "phone": "",
      "email": "",
      "nationality": "",
      "nagriktaNo": "",
    },
    "guardianInformation": {
      "firstName": "",
      "lastName": "",
      "phone": "",
      "email": "",
      "address": {
        "Tole/Street": "",
        "wardNo": "",
        "district": "",
        "city": "",
      },
      "businessAddress": "",
      "relation": "",
      "occupation": "",
      "annualIncome": "",
      "nagriktaNo": "",
    },
    "enrollmentDetails": {
      "appliedGrade": "",  //class grade Nursery - 10
      "previousSchool": "", //school name
      "previousGrade": "", // class in which student was studying at previous school
      "previousSchoolAddress": "", 
      "transportationNeeded": Boolean,
      "pickupLocation": "",
      "dropoffLocation": "",
      "hostelNeeded": Boolean,
      "referral": "", // name of person who referred the student
    }
  }