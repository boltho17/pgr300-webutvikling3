import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


// Customized code from: https://react-bootstrap.github.io/components/modal/
// Props from <NewsPostDisplay/>
export const MyModal = props => {
    return (
        <Modal
            show={props.show}
            onHide={props.hide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Are you sure you want to delete this post?
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <img src={props.post.urlToImage} style={{maxHeight: '300px', maxWidth: '400px'}} alt={props.post.url}/>
                <h4>{props.post.title}</h4>
                <p>{props.post.description}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="danger" onClick={props.onDelete}>Delete</Button>
                <Button variant="secondary" onClick={props.hide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};
