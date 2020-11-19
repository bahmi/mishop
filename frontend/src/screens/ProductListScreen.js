import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Modal, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts } from "../actions/productActions";

const ProductListScreem = ({ history }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const deleteHandler = (id) => {
    // delete product
    setShow(false);
  };

  const createProductHandler = (product) => {
    console.log("product");
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
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
                        Do you really want to delete this record? This process
                        cannot be undone.
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
                        onClick={() => deleteHandler(product._id)}
                      >
                        Delete
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreem;
