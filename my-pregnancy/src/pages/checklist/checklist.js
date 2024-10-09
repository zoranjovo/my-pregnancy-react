import { useState, useEffect } from 'react';
import buttons from '../../css/buttons.module.css';
import { Link } from 'react-router-dom';
import styles from './checklist.module.css';
import { fetchChecklists, createChecklist, deleteChecklist } from '../../util/apireq'; // Import API functions

function Checklist() {
  const [checklists, setChecklists] = useState([]); // Initially empty, populated from the backend
  const [newItem, setNewItem] = useState(''); // For new item input
  const [isCreating, setIsCreating] = useState(false); // For new list creation modal
  const [newListTitle, setNewListTitle] = useState(''); // New list title
  const [newListItems, setNewListItems] = useState([]); // New list items
  const [checklistIds, setChecklistIds] = useState([]); // Store checklist IDs

  // Fetch checklists from the backend
  const loadChecklists = async () => {
    try {
      const data = await fetchChecklists(); // Fetch from the backend
      setChecklists(data); // Populate checklists
      const ids = data.map((checklist) => checklist._id); // Extract the checklist IDs
      setChecklistIds(ids); // Store checklist IDs
    } catch (error) {
      console.error("Failed to fetch checklists:", error);
    }
  };

  useEffect(() => {
    loadChecklists(); // Load checklists on mount
  }, []);

  // Delete a checklist
  const handleDeleteChecklist = async (index) => {
    try {
      const checklistId = checklistIds[index]; // Get checklist ID using the index

      if (!checklistId) {
        console.error("No checklist ID found at index:", index); // Handle undefined IDs
        return;
      }

      await deleteChecklist(checklistId); // Call the delete API

      setChecklists(checklists.filter((_, idx) => idx !== index)); // Update the list locally
      setChecklistIds(checklistIds.filter((_, idx) => idx !== index)); // Update the checklist IDs list
    } catch (error) {
      console.error("Failed to delete checklist:", error);
    }
  };

  // Open the new list creation form
  const openCreateListModal = () => {
    setIsCreating(true);
    setNewListTitle(''); // Clear the title
    setNewListItems([]); // Clear the items
  };

  // Close the new list creation form
  const closeCreateListModal = () => {
    setIsCreating(false);
  };

  // Handle creating a new list
  const handleCreateList = async () => {
    if (newListTitle.trim() !== '') {
      const newList = {
        heading: newListTitle,
        items: newListItems,
      };

      try {
        await createChecklist(newList); // Create the new checklist
        await loadChecklists(); // Refresh the checklist data
        closeCreateListModal();
      } catch (error) {
        console.error("Failed to create checklist:", error);
      }
    }
  };

  // Handle adding new items to the new list
  const handleAddNewItemToList = () => {
    if (newItem.trim() !== '') {
      setNewListItems([...newListItems, newItem]);
      setNewItem(''); // Clear input after adding
    }
  };

  // Handle editing new list items in the creation modal
  const handleEditNewListItem = (itemIndex, newValue) => {
    setNewListItems(newListItems.map((item, index) =>
      index === itemIndex ? newValue : item
    ));
  };

  return (
    <div className={styles.outerdiv}>
      <h1 className={styles.header}>Checklist</h1>
      <Link to={`/journal`}>
        <button className={`${buttons.stylisedBtn} ${styles.addBtn}`}>Back to Journal</button>
      </Link>
      <button className={`${buttons.stylisedBtn} ${styles.createButton}`} onClick={openCreateListModal}>
        Create New List
      </button>
      <div className={styles.innerdiv}>
        {checklists.map(({ _id, heading, items }, index) => (
          <div key={_id} className={styles.checklistBubble}>
            <div className={styles.headerSection}>
              <h2 className={styles.boardName}>{heading}</h2>
              <div className={styles.addItemSection}>
                <button
                  onClick={() => handleDeleteChecklist(index)}
                >
                  Delete
                </button>
              </div>
            </div>
            <ul className={styles.itemList}>
              {items && items.map((item, itemIndex) => (
                <li key={itemIndex} className={styles.checklistItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Create new list modal */}
      {isCreating && (
        <div className={styles.modalOverlay} onClick={closeCreateListModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeCreateListModal}>&times;</button>
            <h2>Create New List</h2>
            <input
              type="text"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              placeholder="List Title"
            />
            <ul>
              {newListItems.map((item, index) => (
                <li key={index}>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleEditNewListItem(index, e.target.value)}
                  />
                </li>
              ))}
            </ul>
            <div className={styles.addItemSection}>
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Add new item"
              />
              <button onClick={handleAddNewItemToList}>Add Item</button>
            </div>
            <div className={styles.addItemSection}>
              <button onClick={handleCreateList}>
                Create List
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checklist;
