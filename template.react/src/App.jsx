import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import UA from 'ua-device'
import { Helmet } from 'react-helmet-async'
import { setMobile } from '@/dada/stores/mob'
import { Loading } from '@/components/loading'

const Index = lazy(() => import('@/pages'))

// App 入口
export default () => {
    const ua = new UA(window.navigator.userAgent)
    if (ua.device.type === 'mobile') setMobile()
    return (
        <>
            <Helmet>
                <title>dada app</title>
            </Helmet>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="*" element={<Index />} />
                </Routes>
            </Suspense>
        </>
    )
}
