import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
import Theme from "./Theme";
import { GrClearOption } from "react-icons/gr";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState(""); // formdaki input değeri için.
  const [completed, setCompleted] = useState(false);
  const [list, setList] = useState(getLocalStorage()); // alışveriş listesi başlangıç durumu.
  const [isEditing, setisEditing] = useState(false); // edit işlemi için flag. Edit durumunda mı değil mi kontrol etmek için.
  const [editID, setEditID] = useState(null); // Hangi itemin editleme işleminde olduğunu anlamak için.
  const [alert, setAlert] = useState({ show: false, message: "", type: "" }); // ekleme,silme,editleme durumları için alert box.
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "Please Enter Value", "danger");
      setAlert({ show: true, message: "Please Enter Value", type: "danger" });
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name, completed: completed };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setisEditing(false);
      showAlert(true, "Item updated", "success");
    } else {
      showAlert(true, "Item added to list.", "success");
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
        completed: completed,
      };
      setList([...list, newItem]);
      setName("");
    }
  };

  const clearItems = () => {
    showAlert(true, "All items removed", "danger");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "Item removed", "danger");
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setisEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  const completedItem = (id) => {
    let newItems = list.map((item) => {
      return item.id === id
        ? { ...item, completed: !item.completed }
        : { ...item };
    });

    setList(newItems);
    console.log(newItems);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  const showAlert = (show = false, message = "", type = "") => {
    setAlert({ show, message, type }); //ES6da key değerleri parametreyle aynıysa show: show şekinde yazmaya gerek yok.
  };
  return (
    <section className="section-center">
      <Theme />
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Shopping List</h3>
        <div className="form-control">
          <input
            className="grocery"
            placeholder="e.g meat"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Edit" : "Add"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List
            items={list}
            removeItem={removeItem}
            editItem={editItem}
            completedItem={completedItem}
            setCompleted={setCompleted}
          />
          <button className="clear-btn" onClick={clearItems}>
            {<GrClearOption/>}Clear Items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
