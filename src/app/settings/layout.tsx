import Link from 'next/link'
import { requireUser } from '@/lib/auth'

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireUser()

  return (
    <>
      {children}
    </>
  )
}
