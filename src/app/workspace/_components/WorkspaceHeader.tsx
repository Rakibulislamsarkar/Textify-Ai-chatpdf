import { UserButton } from '@clerk/nextjs'
import React from 'react'

type Props = {}

const WorkspaceHeader = (props: Props) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <img src="/favicon.png" alt="logo" className="w-8 h-8" />
        <UserButton />
    </div>
  )
}

export default WorkspaceHeader