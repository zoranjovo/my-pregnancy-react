import { useState } from 'react';
import styles from '../forums/forumhome.module.css';
import buttons from '../../css/buttons.module.css';
import boxes from '../../css/boxes.module.css';
import { serverErrorNotif, customWarningNotif, customSuccessNotif } from '../../global-components/notify';
import { createForumPost } from '../../util/apireq';

function mapCategoryName(category) {
  const categoryMap = {
    general: "General Discussion",
    info: "Information Sharing",
    support: "Support Groups",
  };
  return categoryMap[category] || "Unknown Category";
}

function NewPostPane({visible, setVisible, id}){

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const sendPost = async () => {
    if(title.length < 3 || title.length > 300){ return customWarningNotif("Invalid Title Length"); }
    if(content.length < 3 || content.length > 3000){ return customWarningNotif("Invalid Content Length"); }

    const response = await createForumPost(id, title, content);
    if(response.message === "Network Error"){ return serverErrorNotif(); }
    if(response.status === 200){
      setVisible(false);
      customSuccessNotif("Posted! Refresh the page and sort by new to view");
      setTitle("");
      setContent("");
      return;
    } else {
      customWarningNotif("Server Error");
    }
  }

  return (
    <div
      className={`${boxes.standard} ${styles.newPostPane} ${
        visible ? styles.newPostPaneOpen : styles.newPostPaneClose
      }`}
    >
      <h1>Create Forum Post - {mapCategoryName(id)}</h1>
      <div>
        <input
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <textarea
          placeholder='Content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div style={{display: 'flex', gap: '10px'}}>
        <button className={buttons.stylisedBtn} onClick={sendPost}>Post</button>
        <button className={buttons.stylisedBtn} onClick={() => setVisible(false)}>Cancel</button>
      </div>
      
    </div>
  );
}

export default NewPostPane;

