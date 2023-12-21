import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  function addItem(item) {
    setItems((items) => [...items, item]);
    console.log(items);
  }

  function deleteItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  function updateDone(id) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }
  return (
    <div className="app">
      <Form onAddItem={addItem} />
      <List items={items} onDeleteItem={deleteItem} onUpdate={updateDone} />
    </div>
  );
}

function Form({ onAddItem }) {
  const [item, setItem] = useState("");
  const [id, setId] = useState(1);
  function handleAdd(e) {
    e.preventDefault();
    if (item !== "") {
      const newItem = { id: id, name: item, done: false };
      setId(id + 1);
      onAddItem(newItem);
      setItem("");
    }
  }
  return (
    <header style={{ paddingBottom: "70px", paddingTop: "70px" }}>
      <form onSubmit={handleAdd}>
        <label>What's to be done</label>
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <button>Add</button>
      </form>
    </header>
  );
}

function List({ items, onDeleteItem, onUpdate }) {
  return (
    <ul style={{ marginTop: "50px" }}>
      {items.map((item) => (
        <ListItem item={item} onDeleteItem={onDeleteItem} onUpdate={onUpdate} />
      ))}
    </ul>
  );
}

function ListItem({ item, onDeleteItem, onUpdate }) {
  // const [deletedItem, setDeletedItem] = useState(null);
  function handleDelete(id) {
    onDeleteItem(id);
  }

  return (
    <li className={item.done ? "done" : null}>
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => onUpdate(item.id)}
      />
      <span>{item.name}</span>
      {/* <button className="btn edit">Edit</button> */}
      <button className="btn delete" onClick={() => handleDelete(item.id)}>
        Delete
      </button>
    </li>
  );
}
