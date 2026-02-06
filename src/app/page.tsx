import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const user = await getUser()

  // Logged in users go to dashboard
  if (user) {
    redirect('/dashboard')
  }

  // New visitors start onboarding
  redirect('/onboarding')
}
