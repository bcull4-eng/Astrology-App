/**
 * Onboarding V2 Layout
 */

export default function OnboardingV2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#1a1a2e] relative overflow-hidden">
      {/* Simple starfield background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20px 30px, white, transparent),
            radial-gradient(1px 1px at 40px 70px, white, transparent),
            radial-gradient(1px 1px at 50px 160px, white, transparent),
            radial-gradient(1px 1px at 90px 40px, white, transparent),
            radial-gradient(1px 1px at 130px 80px, white, transparent),
            radial-gradient(1px 1px at 160px 120px, white, transparent)
          `,
          backgroundSize: '200px 200px',
          opacity: 0.5,
        }}
      />
      <main className="flex flex-col min-h-screen relative z-10">
        {children}
      </main>
    </div>
  )
}
