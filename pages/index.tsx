import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const menuItems = [
    { title: 'Users', href: '/users', emoji: '👤', color: '#1890ff' },
    { title: 'Tasks', href: '/tasks', emoji: '✅', color: '#52c41a' },
    { title: 'Orders', href: '/orders', emoji: '📦', color: '#faad14' },
  ]

  const [usersCount, setUsersCount] = useState(0)
  const [tasksCount, setTasksCount] = useState(0)
  const [ordersCount, setOrdersCount] = useState(0)

  const [displayUsers, setDisplayUsers] = useState(0)
  const [displayTasks, setDisplayTasks] = useState(0)
  const [displayOrders, setDisplayOrders] = useState(0)

  const animateCount = (target: number, setter: (val: number) => void) => {
    let current = 0
    const step = Math.ceil(target / 50)

    const animate = () => {
      current += step
      if (current >= target) {
        setter(target)
      } else {
        setter(current)
        requestAnimationFrame(animate)
      }
    }

    animate()
  }
const clearAllData = async () => {
  const confirmClear = confirm('Are you sure you want to CLEAR ALL DATA? This action cannot be undone.')
  if (!confirmClear) return

  await fetch('/api/clear', {
    method: 'POST',
  })

  // оновимо counters
  fetchCounts()
}
  const fetchCounts = async () => {
    const usersRes = await fetch('/api/users')
    const usersData = await usersRes.json()
    setUsersCount(usersData.length)
    animateCount(usersData.length, setDisplayUsers)

    const tasksRes = await fetch('/api/tasks')
    const tasksData = await tasksRes.json()
    setTasksCount(tasksData.length)
    animateCount(tasksData.length, setDisplayTasks)

    const ordersRes = await fetch('/api/orders')
    const ordersData = await ordersRes.json()
    setOrdersCount(ordersData.orders.length)
    animateCount(ordersData.orders.length, setDisplayOrders)
  }

  useEffect(() => {
    fetchCounts()
  }, [])

  return (
    <div style={{
      padding: 40,
      fontFamily: 'Arial, sans-serif',
      background: '#f0f2f5',
      minHeight: '100vh',
    }}>
      <h1 style={{
        fontSize: '40px',
        marginBottom: '20px',
        color: '#222',
        textAlign: 'center',
        letterSpacing: '1px',
      }}>
        🚀 REST API Task Manager Dashboard
      </h1>

      <p style={{
        textAlign: 'center',
        fontSize: '16px',
        color: '#555',
        marginBottom: '30px',
      }}>
        Welcome to the Lab project — manage Users, Tasks, Orders in one place.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '20px',
      }}>
        {menuItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: 'block',
              background: '#fff',
              borderRadius: '12px',
              padding: '24px',
              textAlign: 'center',
              textDecoration: 'none',
              color: '#333',
              fontWeight: 'bold',
              boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseOver={e => {
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-5px)'
              ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)'
            }}
            onMouseOut={e => {
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'
              ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 8px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{
              fontSize: '48px',
              marginBottom: '12px',
            }}>
              {item.emoji}
            </div>
            <div style={{
              fontSize: '20px',
              color: item.color,
            }}>
              {item.title}
            </div>
          </Link>
        ))}
      </div>
<div style={{
  marginTop: '30px',
  textAlign: 'center',
}}>
  <button
    onClick={clearAllData}
    style={{
      padding: '12px 24px',
      background: '#ff4d4f',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
    }}
  >
    🗑️ Clear All Data
  </button>
</div>

      <div style={{
        marginTop: '50px',
        padding: '20px',
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
        textAlign: 'center',
        fontSize: '18px',
      }}>
        <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>📊 Current Stats:</div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          fontSize: '22px',
        }}>
          <div>👤 Users: <strong style={{ color: '#1890ff' }}>{displayUsers}</strong></div>
          <div>✅ Tasks: <strong style={{ color: '#52c41a' }}>{displayTasks}</strong></div>
          <div>📦 Orders: <strong style={{ color: '#faad14' }}>{displayOrders}</strong></div>
        </div>
      </div>
    </div>
  )
}
