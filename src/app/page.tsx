"use client"
import { useCallback, useState } from "react"

export default function Page() {
  const apiKey = new URLSearchParams(window.location.search).get('apiKey');
  const [response, setResponse] = useState(null)

  const fetchPosts = useCallback(async () => {
    const res = await fetch(
      `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-009?Authorization=${apiKey}&ElementName=3%E5%B0%8F%E6%99%82%E9%99%8D%E9%9B%A8%E6%A9%9F%E7%8E%87,%E6%BA%AB%E5%BA%A6,%E9%A2%A8%E9%80%9F,%E7%9B%B8%E5%B0%8D%E6%BF%95%E5%BA%A6,%E9%AB%94%E6%84%9F%E6%BA%AB%E5%BA%A6`, 
    )
    const data = await res.json()
    setResponse(data)
  }, [apiKey]);

  return (
    <>
      <button onClick={fetchPosts}>Fetch</button>
      <div>{apiKey}</div>
      <div>{JSON.stringify(response)}</div>
    </>
  )
}
