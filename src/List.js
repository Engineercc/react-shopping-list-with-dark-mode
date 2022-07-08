import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ items, removeItem, editItem, completedItem }) => {
  const handleChange = (e) => {
    //alternatif versiyon. Div üzerine tıklayınca item tamamlanıyor.
    e.preventDefault();
    completedItem(e.currentTarget.id);
  };

  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, title, completed } = item;
        return (
          <div className="grocery-content" key={id}>
            <article className="grocery-item " id={id} onClick={handleChange}>
              <p className="title">
                <span
                  className={`${completed ? "title-done" : "title-none"}`}
                ></span>
                {title}
              </p>
            </article>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                {<FaEdit />}
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeItem(id)}
              >
                {<FaTrash />}
              </button>

              <label className="switch2">
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={() => completedItem(id)}
                />
                <span
                  className="item-checked"
                  checked-value="✓"
                  unchecked-value="✗"
                ></span>
              </label>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
