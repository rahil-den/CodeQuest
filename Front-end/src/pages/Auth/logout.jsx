import React from 'react'
import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
// import { useAuth } from '../../store/auth';
const LogOut = () => {
    const { logout } = useAuth();
    useEffect(() => {
      logout();
    }, [])
  return (
    <div>
        Logout
    </div>
  )
}

export default LogOut
