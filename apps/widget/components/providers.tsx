"use client"

import * as React from "react"
import {Provider} from "jotai"
import { ConvexProvider, ConvexReactClient } from "convex/react"

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error('Thiếu Next_Public_Convex_url trong tệp .ENV của bạn')
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL || "");

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProvider client={convex}>
      <Provider>
        {children}
      </Provider>
    </ConvexProvider>
  )
}
