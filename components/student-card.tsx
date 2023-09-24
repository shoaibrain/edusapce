import Image from 'next/image'

export function StudentCard({student}) {
    console.log(student)
    return (
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <div className="h-100 w-100 shrink-0 items-start">
            <Image
              className="h-40 w-40"
              src="/public/user.jpeg"
              alt="student Image"
              width={80}
              height={80}
            />
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            <div>
              <dt className="text-sm font-medium leading-6 text-gray-900">First Name</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{student.firstName}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium leading-6 text-gray-900">Middle Name</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{student.middleName}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium leading-6 text-gray-900">Last Name</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{student.lastName}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{student.address}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium leading-6 text-gray-900">Gender</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{student.gender}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium leading-6 text-gray-900">Birth Date</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{student.birthDate}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium leading-6 text-gray-900">Current Class</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{student.currentGrade}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium leading-6 text-gray-900">nationality</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{student.nationality}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium leading-6 text-gray-900">email</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{student.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium leading-6 text-gray-900">phone</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{student.phone}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium leading-6 text-gray-900">Enrollment Status</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{student.enrollmentStatus}</dd>
            </div>
          </div>
    </div>
    )
  }
