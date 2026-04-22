'use client'

import { useState, useRef }    from 'react'
import { useRouter }           from 'next/navigation'
import { CheckCircle2 }        from 'lucide-react'
import { uploadAvatar }        from '@/lib/uploadAvatar'
import Button                  from '@/components/atomic/Button'
import Input                   from '@/components/atomic/Input'
import Textarea                from '@/components/atomic/Textarea'
import Avatar                  from '@/components/atomic/Avatar'
import FormField               from '@/components/molecular/Formfield'
import AuthNavBar              from '@/components/sectional/AuthSections/AuthNavBar'

const ROLES = [
  { value: 'Creator',       emoji: '🎨', label: 'Creator'       },
  { value: 'Developer',     emoji: '💻', label: 'Developer'     },
  { value: 'Business',      emoji: '🏢', label: 'Business'      },
  { value: 'Artist',        emoji: '🎵', label: 'Artist'        },
  { value: 'Photographer',  emoji: '📸', label: 'Photographer'  },
] as const

type RoleOption = (typeof ROLES)[number]['value']

export default function ProfileOnboardingPage() {
  const router = useRouter()
  
  // Form fields
  const [name, setName]           = useState('')
  const [bio, setBio]             = useState('')
  const [role, setRole]           = useState<RoleOption>('Creator')

  // Avatar
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>(undefined)
  const [uploading, setUploading] = useState(false)

  // Submission
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')

  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const newUrl = await uploadAvatar(file)
      setAvatarSrc(newUrl)
    } catch (err) {
      console.error('[Avatar] Upload failed:', err)
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/profile', {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ 
          name, 
          bio, 
          role, 
          avatarUrl: avatarSrc, 
          links: [] 
        }),
      })
      if (!res.ok) throw new Error('Failed to save profile')
      router.push('/dashboard')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSkip = async () => {
    setLoading(true)
    try {
      await fetch('/api/profile', {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ 
          name: '', 
          bio: '', 
          role,
          avatarUrl: avatarSrc, 
          links: [] 
        }),
      })
    } catch { /* silent — don't block navigation */ }
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-brand-50/30 to-slate-100 dark:from-slate-950 dark:via-brand-950/20 dark:to-slate-900">
      <AuthNavBar mode="onboarding" step={2} totalSteps={2} />

      <main className="max-w-lg mx-auto px-6 py-12">
        <div className="flex flex-col gap-2 mb-8 text-center">
          <p className="text-xs font-display font-semibold uppercase tracking-widest text-brand-600">
            Step 2 of 2
          </p>
          <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white">
            Set up your profile
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-body">
            You can always change this later from your dashboard.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/60 dark:shadow-none border border-slate-100 dark:border-slate-800 px-8 py-10">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              aria-hidden="true"
            />
            <Avatar
              src={avatarSrc}
              name={name || 'You'}
              size="2xl"
              editable
              onEdit={() => fileInputRef.current?.click()}
            />
            <p className="text-sm font-body text-slate-400">
              {uploading ? 'Uploading...' : 'Click to upload a photo'}
            </p>
          </div>

          <div className="space-y-6">
            <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
              <FormField 
                label="Display Name" 
                htmlFor="display-name"
              >
                <Input
                  id="display-name"
                  placeholder="e.g. Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value.slice(0, 60))}
                  maxLength={60}
                />
              </FormField>
            </div>

            <FormField 
              label="Bio" 
              htmlFor="bio"
            >
              <Textarea
                id="bio"
                placeholder="Tell the world about yourself..."
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value.slice(0, 160))}
                maxLength={160}
                currentLength={bio.length}
              />
            </FormField>

            {/* Role Picker Section */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
              <label className="text-xs font-display font-semibold uppercase tracking-widest text-slate-500 mb-4 block">
                I am a...
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ROLES.map(({ value, emoji, label }) => {
                  const selected = role === value
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRole(value)}
                      className={[
                        'flex flex-col items-center gap-2 p-4 rounded-2xl border-2 relative',
                        'transition-all duration-150 cursor-pointer',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600',
                        selected
                          ? 'border-brand-600 bg-brand-50 dark:bg-brand-900/20'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900',
                        'hover:border-brand-300',
                      ].join(' ')}
                      aria-pressed={selected}
                      aria-label={`Select role: ${label}`}
                    >
                      <span className="text-2xl">{emoji}</span>
                      <span className={[
                        'text-sm font-display font-semibold',
                        selected
                          ? 'text-brand-700 dark:text-brand-300'
                          : 'text-slate-700 dark:text-slate-300',
                      ].join(' ')}>
                        {label}
                      </span>
                      {selected && (
                        <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400 absolute top-2 right-2" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="pt-4 space-y-4">
              {error && (
                <p className="text-xs font-body text-red-500 text-center" role="alert">
                  {error}
                </p>
              )}
              
              <Button
                variant="primary"
                size="xl"
                fullWidth
                loading={loading}
                onClick={handleSubmit}
              >
                Continue to Dashboard →
              </Button>

              <button
                type="button"
                onClick={handleSkip}
                className="w-full text-center text-sm font-display font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
              >
                Skip for now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
