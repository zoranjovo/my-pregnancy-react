import { useState } from 'react';
import styles from './recommended.module.css';

function Recommended() {
  const [videos, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState({ name: '', url: '', desc: '' });

  const handleAddVideo = () => {
    if (newVideo.name && newVideo.url) {
      setVideos([...videos, newVideo]);
      setNewVideo({ name: '', url: '', desc: '' });
    }
  };

  const handleDeleteVideo = (index) => {
    const updatedVideos = videos.filter((_, i) => i !== index);
    setVideos(updatedVideos);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVideo({ ...newVideo, [name]: value });
  };

  return (
    <div className={styles.recommendedDiv}>
      <div className={styles.videosHeader}>
        <h1>Recommended videos by you</h1>
      </div>

      <div className={styles.formContainer}>
        <div className={styles.addVideoForm}>
          <input 
            type="text" 
            name="name" 
            placeholder="Video Title" 
            value={newVideo.name} 
            onChange={handleInputChange} 
            className={styles.inputField}
          />
          <input 
            type="text" 
            name="url" 
            placeholder="YouTube Video ID" 
            value={newVideo.url} 
            onChange={handleInputChange} 
            className={styles.inputField}
          />
          <textarea 
            name="desc" 
            placeholder="Video Description" 
            value={newVideo.desc} 
            onChange={handleInputChange} 
            className={styles.textareaField}
          />
          <button onClick={handleAddVideo} className={styles.addButton}>
            Add Video
          </button>
        </div>
      </div>

      <div className={styles.videosList}>
        {videos.length > 0 ? (
          videos.map((video, index) => (
            <div key={index} className={styles.videoItem}>
              <div>
                <h3>{video.name}</h3>
                <p>{video.desc}</p>
                <iframe 
                  width="300" 
                  height="169" 
                  src={`https://www.youtube.com/embed/${video.url}`} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  title={video.name}
                ></iframe>
              </div>
              <button 
                onClick={() => handleDeleteVideo(index)} 
                className={styles.deleteButton}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No videos added yet!</p>
        )}
      </div>
    </div>
  );
}

export default Recommended;
