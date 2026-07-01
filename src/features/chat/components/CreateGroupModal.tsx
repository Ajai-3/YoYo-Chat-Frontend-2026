import React, { useState, useEffect } from 'react'
import { X, ArrowLeft } from 'lucide-react'
import { mockUsers } from '../data/mockData'
import type { User } from '../data/mockData'
import { GroupDetailsForm } from './GroupDetailsForm'
import { GroupMembersForm } from './GroupMembersForm'

interface CreateGroupModalProps {
  onClose: () => void
  onCreateGroup?: (group: {
    name: string
    bio: string
    imageUrl: string
    members: User[]
    isPrivate: boolean
  }) => void
}

export const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ onClose, onCreateGroup }) => {
  const [step, setStep] = useState<'details' | 'members'>('details')

  // Details step state
  const [groupName, setGroupName]     = useState('')
  const [bio, setBio]                 = useState('')
  const [imagePreview, setImagePreview] = useState<string>('')
  const [isPrivate, setIsPrivate]     = useState(false)

  // Members step state
  const [memberSearch, setMemberSearch] = useState('')
  const [selectedMembers, setSelectedMembers] = useState<User[]>([])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const filteredUsers = mockUsers.filter((u) =>
    u.display_name.toLowerCase().includes(memberSearch.toLowerCase()) ||
    u.username.toLowerCase().includes(memberSearch.toLowerCase())
  )

  const toggleMember = (user: User) => {
    setSelectedMembers((prev) =>
      prev.find((m) => m.id === user.id)
        ? prev.filter((m) => m.id !== user.id)
        : [...prev, user]
    )
  }

  const isSelected = (user: User) => selectedMembers.some((m) => m.id === user.id)

  const handleCreate = () => {
    if (!groupName.trim()) return
    onCreateGroup?.({
      name: groupName.trim(),
      bio,
      imageUrl: imagePreview,
      members: selectedMembers,
      isPrivate,
    })
    onClose()
  }

  const canProceed = groupName.trim().length > 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-card rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col h-[680px] max-h-[90vh]">
        {/* Header */}
        <div className="h-14 px-5 flex items-center justify-between border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2">
            {step === 'members' && (
              <button
                onClick={() => setStep('details')}
                className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-accent/20 text-muted-foreground hover:text-foreground transition-colors mr-1"
              >
                <ArrowLeft className="size-4" />
              </button>
            )}
            <h2 className="text-base font-semibold text-foreground">
              {step === 'details' ? 'New Group' : 'Add Members'}
            </h2>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className={`h-2 w-2 rounded-full transition-colors ${step === 'details' ? 'bg-brand' : 'bg-brand/40'}`} />
              <div className={`h-2 w-2 rounded-full transition-colors ${step === 'members' ? 'bg-brand' : 'bg-muted-foreground/30'}`} />
            </div>
            <button
              onClick={onClose}
              className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-accent/20 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {step === 'details' ? (
          <GroupDetailsForm
            groupName={groupName}
            setGroupName={setGroupName}
            bio={bio}
            setBio={setBio}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            isPrivate={isPrivate}
            setIsPrivate={setIsPrivate}
            onNext={() => setStep('members')}
            canProceed={canProceed}
          />
        ) : (
          <GroupMembersForm
            selectedMembers={selectedMembers}
            toggleMember={toggleMember}
            memberSearch={memberSearch}
            setMemberSearch={setMemberSearch}
            filteredUsers={filteredUsers}
            isSelected={isSelected}
            onCreate={handleCreate}
          />
        )}
      </div>
    </div>
  )
}
