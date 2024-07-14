import styles from './YouTubeEmbed.module.css';

const YouTubeEmbed = ({ embedId }) => (
  <div className={styles.videoResponsive}>
    <iframe
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Qiwei Mao's YouTube"
    />
  </div>
);

export default YouTubeEmbed;
