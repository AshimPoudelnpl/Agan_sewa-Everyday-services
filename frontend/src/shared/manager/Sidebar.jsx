import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/features/authState'
import { useSignoutMutation } from '../../redux/features/authSlice'
import { toast } from 'react-toastify'

const Sidebar = () => {
  const { role } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [signout] = useSignoutMutation()

  const handleLogout = async () => {
    try {
      const res = await signout().unwrap()
      toast.success(res.message)
      dispatch(logout())
      navigate('/')
    } catch (err) {
      console.log('Logout error:', err)
    }
  }

  const managerLinks = [
    { path: '/manager/dashboard', label: 'Dashboard' },
    { path: '/manager/services', label: 'Services' },
    { path: '/manager/staff', label: 'Staff' },
    { path: '/manager/inquiries', label: 'Inquiries' },
    { path: '/manager/gallery', label: 'Gallery' },
    { path: '/manager/reviews', label: 'Reviews' },
    { path: '/manager/profile', label: 'Profile' }
  ]

  const userLinks = [
    { path: '/user/dashboard', label: 'Dashboard' },
    { path: '/user/inquiries', label: 'My Inquiries' },
    { path: '/user/profile', label: 'Profile' }
  ]

  const links = role === 'manager' ? managerLinks : userLinks
  const bgColor = role === 'manager' ? 'bg-blue-800' : 'bg-green-800'
  const hoverColor = role === 'manager' ? 'hover:bg-blue-700' : 'hover:bg-green-700'

  return (
    <div className={`w-64 min-h-screen ${bgColor} text-white flex flex-col`}>
      <div className="p-4 border-b border-opacity-30">
        <h2 className="text-xl font-bold">Agan Sewa</h2>
        <p className="text-sm opacity-75">{role === 'manager' ? 'Manager Panel' : 'User Panel'}</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`block py-2 px-4 rounded ${hoverColor} transition-colors`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-opacity-30">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar