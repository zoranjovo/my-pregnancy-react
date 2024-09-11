import React from 'react';
import styles from './notifications.module.css';
import boxes from '../../../../css/boxes.module.css';

const Notifications = () => {
  return (
    <div className={`${boxes.standard} ${styles.notificationsContainer}`}>
      <h3>Notifications</h3>
      <div className={styles.notificationItem}>
        <p>New consultation request for 17:30-18:00, 11/11</p>
        <button className={styles.closeButton}>✕</button>
      </div>
      <div className={styles.notificationItem}>
        <p>Reminder: you have a consultation at 8:30-9:00 today</p>
        <button className={styles.closeButton}>✕</button>
      </div>
      <button className={styles.clearButton}>Clear</button>
    </div>
  );
};

export default Notifications;
