import React from 'react'
import { useEffect } from 'react';
import { useAuth } from '../../store/auth';
const LogOut = () => {
    const { logoutUser } = useAuth();
    useEffect(() => {
        logoutUser();
    }, [])
  return (
    <div>
      Logout
    </div>
  )
}

export default LogOut
