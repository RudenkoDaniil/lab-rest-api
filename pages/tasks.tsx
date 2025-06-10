import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [users, setUsers] = useState([])

  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('new')
  const [userId, setUserId] = useState('')

  // Filters
  const [filterUserId, setFilterUserId] = useState('')
  const [filterDateFrom, setFilterDateFrom] = useState('')
  const [filterDateTo, setFilterDateTo] = useState('')
  const [filterDone, setFilterDone] = useState(false)

  const fetchTasks = async () => {
    const params = new URLSearchParams()

    if (filterUserId) params.append('userId', filterUserId)
    if (filterDateFrom) params.append('dateFrom', filterDateFrom)
    if (filterDateTo) params.append('dateTo', filterDateTo)
    if (filterDone) params.append('status', 'done')

    const res = await fetch(`/api/tasks?${params.toString()}`)
    const data = await res.json()
    setTasks(data)
  }

  const fetchUsers = async () => {
    const res = await fetch('/api/users')
    const data = await res.json()
    setUsers(data)
  }

  const createTask = async () => {
    if (!title.trim()) {
      alert('Please enter Task title')
      return
    }
    if (!userId) {
      alert('Please select User')
      return
    }

    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, status, userId: Number(userId) }),
    })

    setTitle('')
    setStatus('new')
    setUserId('')
    fetchTasks()
  }

  const toggleDone = async (task: any) => {
    const newStatus = task.status === 'done' ? 'new' : 'done'

    await fetch('/api/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: task.id, status: newStatus }),
    })

    fetchTasks()
  }

  useEffect(() => {
    fetchTasks()
    fetchUsers()
  }, [])

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333' }}>✅ Tasks</h1>

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
        <h3>Create New Task</h3>
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ display: 'block', marginBottom: 8, padding: 8, width: '100%' }}
        />
        <select
          value={userId}
          onChange={e => setUserId(e.target.value)}
          style={{ display: 'block', marginBottom: 8, padding: 8, width: '100%' }}
        >
          <option value="">Select User</option>
          {users.map((u: any) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
        <button
          onClick={createTask}
          style={{
            padding: '10px 20px',
            background: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          Add Task
        </button>
      </div>

      <hr />

      <h3>Filters</h3>
      <select
        value={filterUserId}
        onChange={e => setFilterUserId(e.target.value)}
        style={{ marginRight: 8, padding: 8 }}
      >
        <option value="">All Users</option>
        {users.map((u: any) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={filterDateFrom}
        onChange={e => setFilterDateFrom(e.target.value)}
        style={{ marginRight: 8, padding: 8 }}
      />
      <input
        type="date"
        value={filterDateTo}
        onChange={e => setFilterDateTo(e.target.value)}
        style={{ marginRight: 8, padding: 8 }}
      />
      <label style={{ marginRight: 8 }}>
        <input
          type="checkbox"
          checked={filterDone}
          onChange={e => setFilterDone(e.target.checked)}
        /> Done
      </label>
      <button
        onClick={fetchTasks}
        style={{
          padding: '6px 12px',
          background: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
        }}
      >
        Apply Filters
      </button>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: 20 }}>
        {tasks.map((t: any) => (
          <li key={t.id} style={{
            background: '#fff',
            marginBottom: 10,
            padding: 15,
            borderRadius: 8,
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <div><strong>{t.title}</strong> — User: {t.user?.name}</div>
              <div>Status: {t.status}</div>
              <div>Created: {new Date(t.createdAt).toLocaleDateString()}</div>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={t.status === 'done'}
                  onChange={() => toggleDone(t)}
                /> Done
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
