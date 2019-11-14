import React from 'react';
import { Modal, Table } from 'react-bootstrap';
import CommentNewForm from './commentNewForm'

const DisplayComments = (props) => {
    return ( 
        <Modal show={props.show} onHide={() => props.handleClick(null, 'Display')}>
            <Modal.Header closeButton>
                <Modal.Title>Comments</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table>
                    <thead>
                        <tr>
                            <th>Comment</th>
                            <th width='20%'>User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.element.comments.map( (comment) => {
                            return (
                                <tr key={comment.id}>
                                    <td>
                                        {comment.text}
                                    </td>
                                    <td>
                                        {comment.user_name}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                Leave a Comment:
                <CommentNewForm handleDoneCommentClick={props.handleDoneCommentClick} />
            </Modal.Body>
        </Modal>
     );
}
 
export default DisplayComments;