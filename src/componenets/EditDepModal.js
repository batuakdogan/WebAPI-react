import React ,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';





export class EditDepModal extends Component
{
	constructor(props)
	{
    super(props);
    this.state=
    {
      snackbaropen :false,
      snackbarmsg:''
    }
    
    
    this.handleSubmit=this.handleSubmit.bind(this);

  }

  snackbarClose = () =>
  {
    this.setState({
      snackbaropen:false
    });
  }




  handleSubmit(e)
  {
    e.preventDefault();
    fetch('http://localhost:54682/api/department',
    {
      method:'PUT',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        DepartmentID:e.target.DepartmentID.value,
        DepartmentName: e.target.DepartmentName.value
      })  
    })  
    .then(res => res.json())
      .then((result)=>
      {
       this.setState({
         snackbaropen:true,
         snackbarmsg:result
       });
      },
      (error)=>
      {
        this.setState({
          snackbaropen:true,
          snackbarmsg:'Failed'
        });
      }
      )

   
   
  }
	render()
	{
		return(
      <div className="container">
        <Snackbar
        anchorOrigin={{vertical:'center',horizontal:'center'}}
        open={this.state.snackbaropen}
        autoHideDuration={3000}
        onClose={this.snackbarClose}

        message={<span id="message-id">{this.state.snackbarmsg}</span> }
        action={[
          <IconButton key="close" aria-label="Close" color="inherit" onClick={this.snackbarClose}>
            x
          </IconButton>
        ]}

        />
			<Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Add Department
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
		  
        <Row>
          <Col sm={6}>
            <Form onSubmit={this.handleSubmit}>
			<Form.Group>
                <Form.Label>
                  DepartmentID
                </Form.Label>
                <Form.Control
                  type="text"
                  name="DepartmentID"
				  required
				  disabled
				  defaultValue={this.props.depid}
                  placeholder="DepartmentID"
                />

              </Form.Group>


              <Form.Group>
                <Form.Label>
                  Department Name
                </Form.Label>
                <Form.Control
                  type="text"
                  name="DepartmentName"
				  required
				  defaultValue={this.props.depName}
                  placeholder="DepartmentName"
                />

              </Form.Group>
              <Form.Group>

                <Button variant="primary" type="submit">
                  Update Department 
                </Button>
              </Form.Group>


            </Form>
          
          </Col>
        </Row>
		 
       
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>
		)
	}
}