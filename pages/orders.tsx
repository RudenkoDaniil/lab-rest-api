import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])

  const [title, setTitle] = useState('')
  const [customer, setCustomer] = useState('')
  const [status, setStatus] = useState('pending')
  const [userId, setUserId] = useState('')

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const fetchOrders = async () => {
    const res = await fetch(`/api/orders?search=${search}&page=${page}&pageSize=5`)
    const data = await res.json()
    setOrders(data.orders)
    setTotal(data.total)
  }

  const fetchUsers = async () => {
    const res = await fetch('/api/users')
    const data = await res.json()
    setUsers(data)
  }

  const createOrder = async () => {
    if (!title.trim() || !customer.trim()) {
      alert('Please fill Title and Customer')
      return
    }

    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        customer,
        status,
        userId: userId ? Number(userId) : null,
      }),
    })

    setTitle('')
    setCustomer('')
    setStatus('pending')
    setUserId('')
    fetchOrders()
  }

  useEffect(() => {
    fetchOrders()
    fetchUsers()
  }, [search, page])

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333' }}>📦 Orders</h1>

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
        <h3>Create New Order</h3>
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ display: 'block', marginBottom: 8, padding: 8, width: '100%' }}
        />
        <input
          placeholder="Customer"
          value={customer}
          onChange={e => setCustomer(e.target.value)}
          style={{ display: 'block', marginBottom: 8, padding: 8, width: '100%' }}
        />
        <input
          placeholder="Status"
          value={status}
          onChange={e => setStatus(e.target.value)}
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
          onClick={createOrder}
          style={{
            padding: '10px 20px',
            background: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          Add Order + Create Task
        </button>
      </div>

      <hr />

      <input
        placeholder="Search orders"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          display: 'block',
          marginBottom: 15,
          padding: 8,
          width: '100%',
          borderRadius: 4,
          border: '1px solid #ccc',
        }}
      />

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {orders.map((o: any) => (
          <li key={o.id} style={{
            background: '#fff',
            marginBottom: 10,
            padding: 15,
            borderRadius: 8,
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
          }}>
            <div><strong>{o.title}</strong> — {o.customer}</div>
            <div>Status: {o.status}</div>
            <div>Date: {new Date(o.date).toLocaleString()}</div>
            <div>User: {o.user ? `${o.user.name} (${o.user.email})` : 'No user selected'}</div>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 20 }}>
        Page {page} of {Math.ceil(total / 5)}
        <button
          disabled={page <= 1}
          onClick={() => setPage(p => p - 1)}
          style={{ marginLeft: 10, marginRight: 10 }}
        >
          Prev
        </button>
        <button
          disabled={page * 5 >= total}
          onClick={() => setPage(p => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}
