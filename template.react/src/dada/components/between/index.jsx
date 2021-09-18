import React from 'react'
import { styled } from '@linaria/react'
import { observer } from 'mobx-react-lite'

// Between 左右对齐
export const Between = observer(({ children, ...other }) => {
  const items = []
  if (children === undefined) return null
  children.forEach((child) => {
    if (child !== false) items.push(child)
  })

  return (
    <Wrap items={items} {...other}>
      {children}
    </Wrap>
  )
})

const Wrap = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.items.length > 1 ? 'space-between' : 'center'};
  align-items: center;
  width: 100%;
  height: auto;
`
