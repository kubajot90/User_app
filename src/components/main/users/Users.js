import { useContext, useState } from "react";
import { usersContext } from "../../../context/UsersContextProvider";
import User from "./User";
import UserFormModal from "./userFormModal/UserFormModal";

import classes from "./Users.module.css";

const Users = () => {
  const { usersList, addUser, editUser } = useContext(usersContext);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const addUserHandler = (formData) => {
    const user = createUser(formData);
    addUser(user);
  };

  const editUserHandler = (formData, id) => {
    const user = createUser(formData);

    editUser(user, id);
    editUserIdHandler(null);
  };

  const createUser = (formData) => {
    const user = Object.fromEntries(formData.entries());
    user.id = `${user.lastname}-${user.birthday}`;
    user.address = { country: user.country };
    delete user.country;
    return user;
  };

  const toggleModal = (setState) => {
    setState((prev) => (prev = !prev));
  };

  const editUserIdHandler = (id) => {
    setEditUserId(id);
  };

  return (
    <>
      <div className={classes.Users}>
        <div className={`${classes.buttonsContainer} container`}>
          <button
            onClick={() => toggleModal(setShowAddUser)}
            className={`${classes.addUserButton} button`}
          >
            Add new user
          </button>
        </div>
        <div className="container">
          <span className="container-title">Users list</span>
          <ul className={classes.list}>
            {usersList &&
              usersList.map((data) => (
                <User
                  data={data}
                  toggleModal={() => toggleModal(setShowEditUser)}
                  editUserId={editUserIdHandler}
                  showButtons={true}
                  key={data.id}
                />
              ))}
          </ul>
        </div>
      </div>
      {showAddUser && (
        <UserFormModal
          buttonText="SUBMIT"
          title="Add new user"
          toggleModal={() => toggleModal(setShowAddUser)}
          onSubmitForm={addUserHandler}
        />
      )}
      {showEditUser && (
        <UserFormModal
          buttonText="EDIT"
          title="Edit user"
          toggleModal={() => toggleModal(setShowEditUser)}
          onSubmitForm={editUserHandler}
          editUserId={editUserId}
        />
      )}
    </>
  );
};

export default Users;
