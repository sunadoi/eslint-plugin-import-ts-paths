import { useEffect, useState } from "react"

export const useHelloWorld = () => {
  const [state, setState] = useState("hello")

  useEffect(() => {
    setState("world")
  }, [])

  return state
}
