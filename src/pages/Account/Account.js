import React, { useEffect, useRef, useState } from "react";

import { useAuth } from "../../context/auth-context";

export default function Account() {
  const { updateUser, user } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFromData] = useState({
    name: user.name,
    email: user.email,
    password: "",
  });

  const editName = useRef(null);

  const onChangeHandler = (evt) => {
    setFromData((state) => ({ ...state, [evt.target.name]: evt.target.value }));
  };

  const editHandler = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await updateUser({ ...formData, id: user.userId });
      editName.current.blur();
    }
    setIsEdit(!isEdit);
    editName.current.focus();
  };

  useEffect(() => {
    setFromData({ name: user.name, email: user.email, password: "" });
  }, [user]);

  return (
    <div>
      <div className="login--container">
        <div className="flex">
          <div className="flex">
            <h3>My Account</h3>
          </div>
          <div className="flex"></div>
        </div>
        <form className="login--form">
          <input
            type="text"
            ref={editName}
            placeholder="Enter name"
            name="name"
            value={formData.name}
            readOnly={!isEdit}
            onChange={onChangeHandler}
          />
          <input
            readOnly={!isEdit}
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
          />
          <input
            readOnly={!isEdit}
            value={formData.password}
            type="password"
            placeholder="Enter new password"
            name="password"
            onChange={onChangeHandler}
          />
          <button className="btn--login" onClick={editHandler}>
            {isEdit ? "Save" : "Edit"}
          </button>
        </form>
      </div>
    </div>
  );
}
