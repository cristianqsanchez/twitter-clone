import { useState, useEffect } from 'react'

const SESSION_ID_KEY = 'sessionID'

export default function useSessionID () {
  const [sessionID, setsessionID] = useState<string | null>(null)

  useEffect(() => {
    const storedsessionID = localStorage.getItem(SESSION_ID_KEY)
    if (storedsessionID) {
      setsessionID(storedsessionID)
    }
  }, [])

  const setsessionIDAndStore = ({ sessionID }: { sessionID: string }) => {
    setsessionID(sessionID)
    localStorage.setItem(SESSION_ID_KEY, sessionID)
  }

  const clearsessionID = () => {
    setsessionID(null)
    localStorage.removeItem(SESSION_ID_KEY)
  }

  return {
    sessionID,
    setsessionID: setsessionIDAndStore,
    clearsessionID
  }
}
