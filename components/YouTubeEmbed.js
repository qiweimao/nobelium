// components/YouTubeEmbed.js
import styles from './YouTubeEmbed.module.css';

const YouTubeEmbed = ({ embedId }) => (
  <div className={styles.videoResponsive}>
    <iframe
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded YouTube"
    />
  </div>
);

export default YouTubeEmbed;
