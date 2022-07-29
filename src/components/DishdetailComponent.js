import React, {Component} from 'react';

import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button, Col, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';


function RenderDish(props) {
            return (
                    <div className='col-12 col-md-5 m-1'>
                        <Card>
                            <CardImg top src={props.dish.image} alt={props.dish.name} />
                            <CardBody>
                                <CardTitle>{props.dish.name}</CardTitle>
                                <CardText>{props.dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
            );
    }

function RenderComments(props){
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4>Comments</h4>
                {props.comments ? props.comments.map((comment)=>{
                    return (
                        <div key={comment.id}>
                            <p>{comment.comment}</p>
                            <span>-- {comment.author} , {comment.date}</span>
                        </div>
                    )
                }): <div></div>}
                <CommentForm dishId={props.dishId} addComment={props.addComment} />
            </div>
        );
    }



class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            author: '',
            rating: '',
            comment: '',
            isModalOpen: false,
            touched: {
                author: false
            }
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }


    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }


    handleComment(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
            [name]: value
        });
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    validate(author) {
        const errors = {
            author: '',
        };

        if (this.state.touched.author && author.length <= 2)
            errors.author = 'Must be greater than 2 characters';
        else if (this.state.touched.author && author.length > 15)
            errors.author = 'Must be 15 characters or less';

        return errors;
    }


    render() { 
        const errors = this.validate(this.state.author);

        return (
            <div>

                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>

                        <Form onSubmit={this.handleComment}>

                            <FormGroup row>
                                <Label htmlFor="rating"><strong>Rating</strong></Label>
                                <Col>
                                    <Input type="select" min="1" max="5" id="rating" name="rating"
                                        placeholder="1"
                                        value={this.state.rating}
                                        onChange={this.handleInputChange} >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Input>
                                </Col>
                            </FormGroup>


                            <FormGroup>
                                <Label htmlFor="author"><strong>Your Name</strong></Label>
                                <Col>
                                    <Input type="text" id="author" name="author"
                                        placeholder="Your Name"
                                        value={this.state.author}
                                        valid={errors.author === ''}
                                        invalid={errors.author !== ''}
                                        onBlur={this.handleBlur('author')}
                                        onChange={this.handleInputChange} />
                                    <FormFeedback>{errors.author}</FormFeedback>
                                </Col>                        
                            </FormGroup>


                            <FormGroup>
                                <Label htmlFor="comment"><strong>Comment</strong></Label>
                                <Col>
                                    <Input type="textarea" id="comment" name="comment"
                                        rows="6"
                                        value={this.state.comment}
                                        onChange={this.handleInputChange}></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup >
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </FormGroup>


                        </Form>

                    </ModalBody>
                </Modal>
            </div>
        );
    }
}


const DishDetail = (props) => {

        return (
            <div className="container">

                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>   
                </div>

                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id} />
                </div>

            </div>
        )
    }
export default DishDetail;