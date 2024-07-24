'use client'

import { useEffect } from 'react'
import { Crisp } from 'crisp-sdk-web'

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("c8c2282f-add7-4ec3-8c67-cca70e0ffc25");
  }, [])
  return null
}

export default CrispChat