import { useState } from 'react'
import { sendInvite } from '../api'

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

  if (!isOpen) return null

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Invite Collaborators</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <select
            value={permission}
            onChange={(e) => setPermission(e.target.value)}
          >
            <option value="view">View</option>
            <option value="edit">Edit</option>
          </select>
          <button type="submit">Send Invite</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}

export default InviteCollaboratorsModal
