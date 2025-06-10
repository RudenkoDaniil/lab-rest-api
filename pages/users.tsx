import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function UsersPage() {
  const [users, setUsers] = useState([])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('viewer')

  const [filterRole, setFilterRole] = useState('')

  const fetchUsers = async () => {
    const params = new URLSearchParams()
    if (filterRole) params.append('role', filterRole)

    const res = await fetch(`/api/users?${params.toString()}`)
    const data = await res.json()
    setUsers(data)
  }

  const createUser = async () => {
    if (!name.trim() || !email.trim()) {
      alert('Please fill Name and Email')
      return
    }

    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, role }),
    })

    setName('')
    setEmail('')
    setRole('viewer')
    fetchUsers()
  }

  useEffect(() => {
    fetchUsers()
  }, [filterRole])

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333' }}>👤 Users</h1>

      <Link href="/" style={{
        display: 'inline-block',
        marginBottom: 15,
        textDecoration: 'none',
        color: '#0070f3',
        fontWeight: 'bold',
      }}>
        ← Back to Menu
      </Link>

      <div style={{
        background: '#f9f9f9',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
      }}>
        <h3>Create New User</h3>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ display: 'block', marginBottom: 8, padding: 8, width: '100%' }}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ display: 'block', marginBottom: 8, padding: 8, width: '100%' }}
        />
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          style={{ display: 'block', marginBottom: 8, padding: 8, width: '100%' }}
        >
          <option value="viewer">Viewer</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
        <button
          onClick={createUser}
          style={{
            padding: '10px 20px',
            background: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          Add User
        </button>
      </div>

      <hr />

      <h3>Filter by Role</h3>
      <select
        value={filterRole}
        onChange={e => setFilterRole(e.target.value)}
        style={{ marginBottom: 20, padding: 8 }}
      >
        <option value="">All Roles</option>
        <option value="viewer">Viewer</option>
        <option value="editor">Editor</option>
        <option value="admin">Admin</option>
      </select>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
        {users.map((u: any) => (
          <div key={u.id} style={{
            background: '#fff',
            padding: 15,
            borderRadius: 8,
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
          }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{u.name}</div>
            <div style={{ color: '#555' }}>{u.email}</div>
            <div style={{ marginTop: 8 }}>
              Role: <span style={{
                display: 'inline-block',
                padding: '2px 8px',
                borderRadius: 4,
                background: u.role === 'admin' ? '#ff4d4f' :
                            u.role === 'editor' ? '#faad14' : '#1890ff',
                color: '#fff',
                fontSize: '12px',
              }}>{u.role}</span>
            </div>
            <div style={{ marginTop: 8 }}>
              Tasks: {u.tasks.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
