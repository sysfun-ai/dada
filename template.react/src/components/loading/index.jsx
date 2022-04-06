import React from 'react'
import { styled } from '@linaria/react'

// Loading 加载中
export const Loading = () => {
  return <Page>Loading...</Page>
}

const Page = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
