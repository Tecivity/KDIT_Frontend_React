import React, { useState, useEffect } from 'react'
import firebase from '../firebase'
import './styles.css'

export default function FileUpload({ url, setUrl }) {
    const storage = firebase.storage()

    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)
    const [path, setPath] = useState('')

    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
            setPath(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handleUpload = e => {
        e.preventDefault()
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progress)
            },
            error => {
                console.log(error)
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url)
                        setUrl(url)
                    })
            }
        )
    }

    return (
        <div>
            <progress value={progress} max="100" />
            <br />
            <input type="file" onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button>
            {/* <h3>Preview image</h3>
            {image ? <img src={path} alt="firebase-image" width="400px" /> : <></>}
            <h3>Uploaded image</h3>
            <img src={url || "http://via.placeholder.com/400"} alt="firebase-image" width="400px" /> */}
            {(url !== "") ? (<a href={url}> ✔</a>) : (<h3>upload something</h3>)}
        </div>
    )
}

