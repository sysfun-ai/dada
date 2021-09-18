import React from 'react'
import { Redirect } from 'react-router-dom'
import { Fancy } from '@/dada/components/fancy'

// Protect 保护路由
export const Protect = ({
  authorized = false,
  redirectTo = '/',
  children,
  ...other
}) => {
  return (
    <Fancy
      {...other}
      render={() => {
        return authorized ? children : <Redirect to={redirectTo} />
      }}
    />
  )
}
