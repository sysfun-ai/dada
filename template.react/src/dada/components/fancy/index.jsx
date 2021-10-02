import React, { useEffect, useMemo } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 关闭spinner
nprogress.configure({ showSpinner: false })

// FancyRoute 附带nprogress的路由
export const Fancy = observer(
  ({ exact = false, top = false, from, to, path, children, ...props }) => {
    top && window.scroll({ top: 0, left: 0 })
    useMemo(() => {
      nprogress.start()
    }, [])
    useEffect(() => {
      nprogress.done()
    }, [])

    return from ? (
      <Redirect exact={exact} from={from} to={to} {...props}>
        {children}
      </Redirect>
    ) : (
      <Route exact={exact} path={path} {...props}>
        {children}
      </Route>
    )
  }
)
