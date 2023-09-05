export function GuardianCard({parent}) {
    console.log(parent)
    return (
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <div className="h-40 w-40 shrink-0 items-start">
          <div>
            <h3>{`${parent.firstName} ${parent.lastName}`}</h3>
            <p>{parent.guardianType}</p>
            <p>{parent.phone}</p>

          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          <div>
            <dt className="text-sm font-medium leading-6 text-gray-900"> Email</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{parent.email}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{parent.address}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium leading-6 text-gray-900">Phones/contact</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{parent.phone}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium leading-6 text-gray-900">Occupation</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{parent.profession}</dd>
          </div>
        </div>

    </div>
    )
  }