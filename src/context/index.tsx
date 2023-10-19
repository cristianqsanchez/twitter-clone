import React, { Dispatch, SetStateAction, createContext, useState } from 'react'

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

  return (
    <FirebaseAuthContext.Provider value={{ isLogged, sessionID, setIsLogged, setSessionID }}>
      {children}
    </FirebaseAuthContext.Provider>
  )
}
