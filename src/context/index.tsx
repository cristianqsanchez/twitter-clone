import React, { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react'

type AuthContext = {
  isLogged: boolean,
  sessionID: string | undefined,
  setIsLogged: Dispatch<SetStateAction<boolean>>
  setSessionID: Dispatch<SetStateAction<string | undefined>>
}

export const FirebaseAuthContext = createContext<AuthContext>({
  isLogged: false,
  sessionID: undefined,
  setIsLogged: () => {},
  setSessionID: () => {}
})

export function FirebaseAuthProvider ({ children }: { children: React.JSX.Element }) {
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const [sessionID, setSessionID] = useState<string | undefined>(undefined)

  useEffect(() => {
    localStorage.setItem('sessionID', JSON.stringify(sessionID))
  }, [sessionID])

  return (
    <FirebaseAuthContext.Provider value={{ isLogged, sessionID, setIsLogged, setSessionID }}>
      {children}
    </FirebaseAuthContext.Provider>
  )
}
