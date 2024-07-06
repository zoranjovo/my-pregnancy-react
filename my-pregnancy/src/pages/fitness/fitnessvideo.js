import styles from './fitnesshome.module.css';

function FitnessVideo(video){
    return (
        <div className={styles.video}>
            <iframe 
                className={styles.embed}
                src={`https://www.youtube-nocookie.com/embed/${video.url}`}
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" >
            </iframe>
            <h1 className={styles.title}>{video.name}</h1>
            <h2 className={styles.desc}>{video.desc}</h2>
            <h3 className={styles.time}>{video.time}</h3>
        </div>
    );
}

export default FitnessVideo;