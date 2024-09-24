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

  /*
  Adding new list item, will need to add in the logic so that the itll save to the backend. 
  */
  const handleAddItem = () => {
    if (newItem.trim() !== '' && expandedChecklist) {
      setExpandedChecklist({
        ...expandedChecklist,
        items: [...expandedChecklist.items, newItem],
      });
      setNewItem(''); // Clear the input field after adding
    }
  };

  return (
    <div className={styles.outerdiv}>
      <h1 className={styles.header}>Checklist</h1>
      <div className={styles.innerdiv}>
        {checklists.map(({ id, heading }) => (
          <div key={id} className={styles.checklistBubble}>
            <div className={styles.headerSection}>
              <h2 className={styles.boardName}>{heading}</h2>
              <button className={styles.expandButton} onClick={() => toggleExpand(id)}>  
                {/*Will need to add a symbol or something here*/}
                Pop out -^
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {expandedChecklist && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>&times;</button>
            <h2>{expandedChecklist.heading}</h2>
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
    </div>
  );
}

export default Checklist;
