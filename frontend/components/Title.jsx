import styles from '../styles/New.module.css';

const Title = (props) => (
  <h2 className={styles.title}>
    <span className={styles.fw300}>{props?.title}</span>{' '}
    <span className={styles.fw600}>{props?.titleW}</span>
  </h2>
);

export default Title;
