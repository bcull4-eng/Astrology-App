'use client'

import { Users, Star, FileText, Globe } from 'lucide-react'
import { stats } from './testimonials-data'

interface StatsBarProps {
  variant?: 'full' | 'compact' | 'minimal'
  className?: string
}

export function StatsBar({ variant = 'full', className = '' }: StatsBarProps) {
  const statItems = [
    {
      icon: Users,
      value: stats.totalUsers,
      label: 'Happy Users',
    },
    {
      icon: Star,
      value: stats.averageRating.toString(),
      label: 'Average Rating',
    },
    {
      icon: FileText,
      value: stats.reportsGenerated,
      label: 'Reports Generated',
    },
    {
      icon: Globe,
      value: stats.countriesServed,
      label: 'Countries',
    },
  ]

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center justify-center gap-6 text-sm ${className}`}>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <span className="text-white font-medium">{stats.averageRating}</span>
        </div>
        <span className="text-slate-500">|</span>
        <span className="text-slate-400">{stats.totalUsers} users</span>
        <span className="text-slate-500">|</span>
        <span className="text-slate-400">{stats.totalReviews} reviews</span>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-8 ${className}`}>
        {statItems.slice(0, 3).map((stat) => (
          <div key={stat.label} className="flex items-center gap-3">
            <stat.icon className="w-5 h-5 text-indigo-400" />
            <div>
              <div className="text-white font-semibold">{stat.value}</div>
              <div className="text-slate-500 text-xs">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Full variant
  return (
    <div className={`bg-slate-800/50 border border-slate-700 rounded-2xl p-6 md:p-8 ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {statItems.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <stat.icon className="w-6 h-6 text-indigo-400" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-slate-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
