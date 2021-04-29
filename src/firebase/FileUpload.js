import React, { useState, useEffect } from 'react'
import firebase from '../firebase'
import './styles.css'

export default function FileUpload() {
    const storage = firebase.storage()

    const [image, setImage] = useState(null)
    const [url, setUrl] = useState("")
    const [progress, setProgress] = useState(0)

    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleUplode = () => {
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

    console.log("image:", image)

    return (
        <div className="componentBox">
            <h1>StorageTest!</h1>
            <br />
            <progress value={progress} max="100" />
            <br />
            <input type="file" onChange={handleChange} />
            <button onClick={handleUplode}>Uplode</button>
            <br />
            {(url !== "") ? (<a href={url}>Click me</a>) : (<h3>upload something</h3>)}
            <br />
            <img src={url || "http://via.placeholder.com/400"} alt="firebase-image" width="400px" />

        </div>
    )
}

