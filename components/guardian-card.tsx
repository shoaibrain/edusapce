

export function GuardianCard({parent}) {
    return (
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <div className="h-40 w-40 shrink-0 items-start">
            <div>
              <h3 className="text-sm font-medium">{`${parent.firstName} ${parent.lastName}`}</h3>
              <p className="text-sm font-medium">{parent.guardianType}</p>
              <p className="text-sm font-medium">{parent.phone}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            <div>
              <dt className="text-sm font-medium"> Email</dt>
              <dd className="text-sm font-medium">{parent.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium">Address</dt>
              <dd className="text-sm font-medium">{parent.address}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium">Phones/contact</dt>
              <dd className="text-sm font-medium">{parent.phone}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium">Occupation</dt>
              <dd className="text-sm font-medium">{parent.profession}</dd>
            </div>
          </div>
          {/* TODO: A button as options on GuardianCard  */}
        </div>
    )
  }
