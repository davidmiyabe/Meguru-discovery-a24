import { useState } from 'react'
import { sendInvite } from '../lib/services/invite'
import { Sheet } from './ui'

interface InviteCollaboratorsModalProps {
  isOpen: boolean
  onClose: () => void
}

const InviteCollaboratorsModal: React.FC<InviteCollaboratorsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [email, setEmail] = useState('')
  const [permission, setPermission] = useState('view')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await sendInvite(email, permission)
    setEmail('')
    setPermission('view')
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
          className="w-full border p-2 rounded"
        />
        <select
          value={permission}
          onChange={(e) => setPermission(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="view">View</option>
          <option value="edit">Edit</option>
        </select>
        <div className="flex gap-2 justify-end">
          <button type="button" onClick={onClose} className="px-2 py-1 rounded bg-night text-gold">
            Cancel
          </button>
          <button type="submit" className="px-2 py-1 rounded bg-gold text-night">
            Send Invite
          </button>
        </div>
      </form>
    </Sheet>
  )
}

export default InviteCollaboratorsModal
