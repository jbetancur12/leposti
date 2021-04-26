import styles from '../styles/New.module.css';

const Section = (props) => (
    <div className={styles.section}>
      <h2 className={styles.title}>
        <span className={styles.fw300}>{props?.title}</span>{' '}
        <span className={styles.fw600}>{props?.titleW}</span>
      </h2>
      <div>{props.children}</div>
    </div>
  );

export default Section;
