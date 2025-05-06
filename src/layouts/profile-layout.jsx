import React from 'react'

export default function ProfileLayout({children}) {
  return (
    <div className="bg-neutral-500">
        <div className="max-w-screen-sm m-auto min-h-screen" style={{background: '#F4F1DE'}}>
            {children}
        </div>
    </div>
  )
}
