import "../style/Signup.css";
import { useState, useRef } from "react";
import logo from '../speech-recognition-icon.jpg';
import { useNavigate } from "react-router-dom";
export const Signup = () => {
    const navigate = useNavigate();
    const [isRecording1, setIsRecording1] = useState(false);
    const [audioChunks1, setAudioChunks1] = useState([]);
    const [isRecording2, setIsRecording2] = useState(false);
    const [audioChunks2, setAudioChunks2] = useState([]);
    const [userName, setUserName] = useState("");
    const mediaRecorder = useRef(null);

    const handleStartRecording1 = () => {
        if (!isRecording1) {
            setAudioChunks1([]);
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then((stream) => {
                    mediaRecorder.current = new MediaRecorder(stream);
                    mediaRecorder.current.ondataavailable = (e) => {
                        if (e.data.size > 0) {
                            setAudioChunks1((chunks) => [...chunks, e.data]);
                        }
                    };
                    mediaRecorder.current.start();
                    setIsRecording1(true);
                })
                .catch((error) => {
                    console.error('Error accessing microphone:', error);
                });
        } else {
            mediaRecorder.current.stop();
            setIsRecording1(false);
        }
    };

    const handleStartRecording2 = () => {
        if (!isRecording2) {
            setAudioChunks2([]);
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then((stream) => {
                    mediaRecorder.current = new MediaRecorder(stream);
                    mediaRecorder.current.ondataavailable = (e) => {
                        if (e.data.size > 0) {
                            setAudioChunks2((chunks) => [...chunks, e.data]);
                        }
                    };
                    mediaRecorder.current.start();
                    setIsRecording2(true);
                })
                .catch((error) => {
                    console.error('Error accessing microphone:', error);
                });
        } else {
            mediaRecorder.current.stop();
            setIsRecording2(false);
        }
    };
    const handlesignup = async () => {
        const blob = new Blob(audioChunks1, { type: 'audio/wav' });
        const blob1 = new Blob(audioChunks2, { type: 'audio/wav' });

        // Create a FormData object to send the audio file and username
        const formData = new FormData();
        formData.append('audio1', blob);
        formData.append('audio2', blob1);
        formData.append('userName', userName);

        // Replace 'your-api-endpoint' with the actual URL of your API endpoint
        const result = await fetch('your-api-endpoint', {
            method: 'POST',
            body: JSON.parse(JSON.stringify(formData))
        }).then((response) => {
            if (response.ok) {
                console.log('Audio and username sent successfully.');
                // Handle success as needed
            } else {
                console.error('Failed to send audio and username to the API.');
                // Handle error as needed
            }
        })
            .catch((error) => {
                console.error('Error sending audio and username:', error);
                // Handle error as needed
            });
    };

    return (
        <div class="wrapper">
            <div class="logo">
                <img src={logo} alt="" />
            </div>
            <div class="text-center mt-3 name">
                Signup
            </div>
            <div class="p-3 mt-3">
                <div class="form-field d-flex align-items-center">
                    <span class="far fa-user"></span>
                    <input type="text" name="userName" id="userName" placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div class="record d-flex align-items-center">
                    {audioChunks1.length === 0 ? (
                        <button onClick={handleStartRecording1} className="btn mt-3">
                            {isRecording1 ? 'Stop Recording For data1' : 'Start Recording For data1'}
                        </button>
                    ) : (
                        <div>
                            <audio controls>
                                <source src={URL.createObjectURL(new Blob(audioChunks1, { type: 'audio/wav' }))} type="audio/wav" />
                            </audio>
                            <button onClick={handleStartRecording1} className="rerecord btn mt-3">
                                Re-record data1
                            </button>
                        </div>
                    )}
                </div>
                <div class="record d-flex align-items-center">
                    {audioChunks2.length === 0 ? (
                        <button onClick={handleStartRecording2} className="btn mt-3">
                            {isRecording2 ? 'Stop Recording For data2' : 'Start Recording For data2'}
                        </button>
                    ) : (
                        <div>
                            <audio controls>
                                <source src={URL.createObjectURL(new Blob(audioChunks2, { type: 'audio/wav' }))} type="audio/wav" />
                            </audio>
                            <button onClick={handleStartRecording2} className="rerecord btn mt-3">
                                Re-record data2
                            </button>
                        </div>
                    )}
                </div>
                <button class="btn mt-3" onClick={handlesignup}>Register</button>
            </div>
        </div>
    );
};