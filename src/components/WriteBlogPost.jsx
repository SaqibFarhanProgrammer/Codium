"use client"
import { useState } from "react"

export default function UploadPage() {
  const [image, setImage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("file", image)

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit">Upload</button>
    </form>
  )
}
