import { useState } from 'react'
import { sendInvite } from '../lib/services/invite'
import { Sheet, Button } from './ui'

interface InviteCollaboratorsModalProps {
  isOpen: boolean
  onClose: () => void
  tripId: string
  onInvited?: () => void
}

const InviteCollaboratorsModal: React.FC<InviteCollaboratorsModalProps> = ({
  isOpen,
  onClose,
  tripId,
  onInvited,
}) => {
  const [email, setEmail] = useState('')
  const [permission, setPermission] = useState('view')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await sendInvite(tripId, email, permission)
    setEmail('')
    setPermission('view')
    onInvited?.()
    onClose()
  }

  return (
    <Sheet open={isOpen} className="p-4 space-y-4 fade-in">
      <h2 className="text-lg font-display text-gold">Invite Collaborators</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full border border-border p-2 rounded focus:outline-none focus:ring-2 focus:ring-gold"
        />
        <select
          value={permission}
          onChange={(e) => setPermission(e.target.value)}
          className="w-full border border-border p-2 rounded focus:outline-none focus:ring-2 focus:ring-gold"
        >
          <option value="view">View</option>
          <option value="edit">Edit</option>
        </select>
        <div className="flex gap-2 justify-end">
          <Button type="button" onClick={onClose} variant="outline" className="px-2 py-1">
            Cancel
          </Button>
          <Button type="submit" className="px-2 py-1">

            Send Invite
          </Button>
        </div>
      </form>
    </Sheet>
  )
}

export default InviteCollaboratorsModal
