import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Pagination";
import { listUsers, deleteUser } from "../actions/userActions";

const UserListScreem = ({ history, location }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, pager, pageOfItems, error } = userList;

  console.log("pager", pager);

  console.log("pageOfItems", pageOfItems);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get("page")) || 1;

    if (userInfo && userInfo.isAdmin) {
      try {
        if (page !== pager.currentPage) {
          dispatch(listUsers(page));
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete, location.search]);

  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
    setShow(false);
  };

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pageOfItems.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {userInfo._id === user._id ? (
                      "Not available"
                    ) : (
                      <>
                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                          <Button variant="primary" className="btn-sm">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </LinkContainer>{" "}
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={handleShow}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header>
                            <Modal.Title>Are you sure?</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <p>
                              {" "}
                              Do you really want to delete this record? This
                              process cannot be undone.
                            </p>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="secondary disabled"
                              onClick={handleClose}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => deleteHandler(user._id)}
                            >
                              Delete
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pager={pager} />
        </>
      )}

      {console.log("hello", pager)}
    </>
  );
};

export default UserListScreem;
