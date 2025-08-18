"use client"

import * as React from "react"
import {Provider} from "jotai"
import { ConvexReactClient } from "convex/react"
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { useAuth } from '@clerk/nextjs'

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error('Thiếu Next_Public_Convex_url trong tệp .ENV của bạn')
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL || "");

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      <Provider>
        {children}
      </Provider>
    </ConvexProviderWithClerk>
  )
}
