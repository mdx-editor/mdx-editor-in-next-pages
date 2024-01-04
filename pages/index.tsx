import React from 'react'
import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'

const Editor = dynamic(() => import('../components/Editor'), { ssr: false })

export default function Home() {
  return (
    <>
      <Editor />
    </>
  )
}
