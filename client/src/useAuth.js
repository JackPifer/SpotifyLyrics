/*import axios from 'axios';
import {useState, useEffect} from 'react'


export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setrefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();
  

    useEffect(() => {
        axios
        .post('http://localhost:3001/login', {
            code,
        })
        .then(res => {
            setAccessToken(res.data.accessToken)
            setrefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)
            window.history.pushState({}, null, '/')
        })
        .catch(() =>{
            window.location = '/'
        })
    }, [code])

    useEffect(() => {
        if (!refreshToken || !expiresIn) return
        const interval = setInterval(() => {
            axios
            .post('http://localhost:3001/refresh', {
                refreshToken,
            })
            .then(res => {
                setAccessToken(res.data.accessToken)
                setExpiresIn(res.data.expiresIn)
            })
            .catch(() =>{
                window.location = '/'
            })
        }, (expiresIn-60)*1000)

        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])

    return accessToken 
}*/
import { useState, useEffect } from "react"
import axios from "axios"

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()

  useEffect(() => {
    axios
      //.post("https://www.pifelife.com/login", {
      .post("https://vast-wave-23279-df071e0e2194.herokuapp.com/login", {
        code,
      })
      .then(res => {
        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)
        window.history.pushState({}, null, "/")
      })
      .catch(() => {
        window.location = "/"
      })
  }, [code])

  useEffect(() => {
    if (!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
      axios
        //.post("https://www.pifelife.com/refresh", {
        .post("https://vast-wave-23279-df071e0e2194.herokuapp.com/refresh", {
          refreshToken,
        })
        .then(res => {
          setAccessToken(res.data.accessToken)
          setExpiresIn(res.data.expiresIn)
        })
        .catch(() => {
          window.location = "/"
        })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn])

  return accessToken
}