import { useState, useEffect } from 'react';
import { getNotifications, clearNotification, clearAllNotifications } from '../../../../util/apireq';
import React from 'react';
import styles from './notifications.module.css';
import boxes from '../../../../css/boxes.module.css';
import { serverErrorNotif, customWarningNotif, customSuccessNotif } from '../../../../global-components/notify';
import { Link } from 'react-router-dom';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const response = await getNotifications();
    if(response.message === "Network Error"){ return serverErrorNotif(); }
    if(response.status === 200){
      return setNotifications(response.data);
    } else {
      return customWarningNotif("Server Error");
    }
  }

  useEffect(() => {
    fetchNotifications();
  }, [])

  const clearAllNotificationsBtn = async () => {
    const response = await clearAllNotifications();
    if(response.message === "Network Error"){ return serverErrorNotif(); }
    if(response.status === 200){
      customSuccessNotif("Cleared All Notifications");
      fetchNotifications();
      return;
    } else {
      return customWarningNotif("Server Error");
    }
  }
  const clearNotificationBtn = async (id) => {
    const response = await clearNotification(id);
    if(response.message === "Network Error"){ return serverErrorNotif(); }
    if(response.status === 200){
      customSuccessNotif("Cleared Notification");
      fetchNotifications();
      return;
    } else {
      return customWarningNotif("Server Error");
    }
  }
  return (
    <div className={`${boxes.standard} ${styles.notificationsContainer}`}>
      <h3>Notifications</h3>
      {notifications ? (
        notifications.length > 0 ? (
          <div>
            <div className={styles.notificationsScroller}>
              {notifications.map((notification, index) => (
                <div className={styles.notificationItem} key={index}>
                  <Link to={`${notification.link}`}>
                    <p>{notification.notificationText}</p>
                  </Link>
                  <button className={styles.closeButton} onClick={() => clearNotificationBtn(notification._id)}>✕</button>
                </div>
              ))}
            </div>
            <button className={styles.clearButton} onClick={clearAllNotificationsBtn}>Clear</button>
          </div>
        ) : (
          <div className={`flex items-center justify-center`} style={{marginTop: "50px"}}>
            <h1>No Notifications</h1>
          </div>
        )
      ) : (
        <div className={`flex items-center justify-center`} style={{marginTop: "50px"}}><l-dot-wave size="47" speed="1"  color="#f06292"  data-testid="loading-indicator"/></div>
      )}
      
    </div>
  );
};

export default Notifications;


{/* <div className={styles.notificationItem}>
  <p>New consultation request for 17:30-18:00, 11/11</p>
  <button className={styles.closeButton}>✕</button>
</div> */}