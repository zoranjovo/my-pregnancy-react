import { useState } from 'react';
import styles from './checklist.module.css';
import buttons from '../../css/buttons.module.css';

const initialChecklists = [
  { id: 1, heading: 'Hospital Care Items List', items: ['Night Robe', 'Socks', 'Toothbrush'], isEditing: false },
  { id: 2, heading: 'Baby Shopping List 1', items: ['Nappies', 'Talcum Powder', 'Blanket'], isEditing: false },
  { id: 3, heading: 'Baby Shopping List 2', items: ['Nappies', 'Talcum Powder', 'Blanket'], isEditing: false },
  { id: 4, heading: 'Postpartum Care Items List 1', items: ['Nappies', 'Baby Food', 'Toys'], isEditing: false },
  { id: 5, heading: 'Postpartum Care Items List 2', items: ['Nappies', 'Socks', 'Baby Milk Formula'], isEditing: false },
];

function Checklist() {
  const [checklists, setChecklists] = useState(initialChecklists);
  const [expandedChecklist, setExpandedChecklist] = useState(null); // For modal
  const [newItem, setNewItem] = useState(''); // For new item input
  const [isCreating, setIsCreating] = useState(false); // For new list creation modal
  const [newListTitle, setNewListTitle] = useState(''); // New list title
  const [newListItems, setNewListItems] = useState([]); // New list items
  const [newListItemEditingIndex, setNewListItemEditingIndex] = useState(null); // Index of editing item in new list

  // Pop-out the selected checklist
  const toggleExpand = (id) => {
    const checklist = checklists.find((checklist) => checklist.id === id);
    setExpandedChecklist(checklist); // Set the checklist to show in modal
  };

  // Close the modal and save changes
  const closeModal = () => {
    if (expandedChecklist) {
      setChecklists(checklists.map((checklist) =>
        checklist.id === expandedChecklist.id ? expandedChecklist : checklist
      ));
    }
    setExpandedChecklist(null);
    setNewItem(''); // Reset new item input on close
  };

  // Toggle edit mode for the checklist in the modal
  const toggleEditMode = () => {
    if (expandedChecklist) {
      setExpandedChecklist({
        ...expandedChecklist,
        isEditing: !expandedChecklist.isEditing,
      });
    }
  };

  // Handle editing of list items in the modal
  const handleEditItem = (itemIndex, newValue) => {
    if (expandedChecklist) {
      setExpandedChecklist({
        ...expandedChecklist,
        items: expandedChecklist.items.map((item, index) =>
          index === itemIndex ? newValue : item
        ),
      });
    }
  };

  // Handle adding new list items in the modal
  const handleAddItem = () => {
    if (newItem.trim() !== '' && expandedChecklist) {
      setExpandedChecklist({
        ...expandedChecklist,
        items: [...expandedChecklist.items, newItem],
      });
      setNewItem(''); // Clear the input field after adding
    }
  };

  // Handle editing the title of an expanded checklist
  const handleEditTitle = (newTitle) => {
    if (expandedChecklist) {
      setExpandedChecklist({
        ...expandedChecklist,
        heading: newTitle,
      });
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
  const handleCreateList = () => {
    if (newListTitle.trim() !== '') {
      const newList = {
        id: checklists.length + 1, // Incremental ID
        heading: newListTitle,
        items: newListItems,
        isEditing: false,
      };
      setChecklists([...checklists, newList]);
      closeCreateListModal(); // Close the modal after creating
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
      <button className={styles.createButton} onClick={openCreateListModal}>
        Create New List
      </button>
      <div className={styles.innerdiv}>
        {checklists.map(({ id, heading }) => (
          <div key={id} className={styles.checklistBubble}>
            <div className={styles.headerSection}>
              <h2 className={styles.boardName}>{heading}</h2>
              <button className={styles.expandButton} onClick={() => toggleExpand(id)}>
                Expand
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Existing checklist modal */}
      {expandedChecklist && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>&times;</button>
            {expandedChecklist.isEditing ? (
              <input
                type="text"
                value={expandedChecklist.heading}
                onChange={(e) => handleEditTitle(e.target.value)}
                placeholder="Edit title"
              />
            ) : (
              <h2>{expandedChecklist.heading}</h2>
            )}
            <div className={styles.contentSection}>
              <ul>
                {expandedChecklist.items.map((item, index) => (
                  <li key={index}>
                    {expandedChecklist.isEditing ? (
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleEditItem(index, e.target.value)}
                      />
                    ) : (
                      item
                    )}
                  </li>
                ))}
              </ul>
              <div className={styles.addItemSection}>
                {expandedChecklist.isEditing && (
                  <>
                    <input
                      type="text"
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      placeholder="Add new item"
                    />
                    <button className={`${buttons.addButton} ${styles.editButton}`} onClick={handleAddItem}>
                      Add
                    </button>
                  </>
                )}
                <button className={styles.editButton} onClick={toggleEditMode}>
                  {expandedChecklist.isEditing ? 'Save' : 'Edit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
            <button className={styles.createButton} onClick={handleCreateList}>
              Create List
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checklist;
