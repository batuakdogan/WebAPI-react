import React ,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';



export class AddEmpModal extends Component
{
	constructor(props)
	{
    super(props);
    this.state=
    {
		deps:[],
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

  componentDidMount() {
	  fetch('http://localhost:54682/api/department').then(response =>response.json())
	  .then(data =>
		{
			this.setState({
				deps:data
			});
		})
  }
  
  handleSubmit(e)
  {
    e.preventDefault();
    fetch('http://localhost:54682/api/employee',
    {
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        EmployeeID:null,
		EmployeeName: e.target.EmployeeName.value,
		Department:e.target.Department.value,
		MailID:e.target.MailID.value,
		DOJ:e.target.DOJ.value
      })  
    }).then(res => res.json())
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
         Add Employee
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
		  
        <Row>
          <Col sm={6}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="EmployeeName">
                <Form.Label>
                  EmployeeName
                </Form.Label>
                <Form.Control
                  type="text"
                  name="EmployeeName"
                  required
                  placeholder="EmployeeName"
                />

              </Form.Group>
			  <Form.Group controlId="Department">
                <Form.Label>
                  Department
                </Form.Label>
				<Form.Control as="select">
					{this.state.deps.map(dep =>
						
						<option key={dep.DepartmentID}>
							{dep.DepartmentName}
						</option>
						
						)}
					

				</Form.Control>
               

              </Form.Group>
			  <Form.Group controlId="MailID">
                <Form.Label>
                  MailID
                </Form.Label>
                <Form.Control
                  type="text"
                  name="MailID"
                  required
                  placeholder="MailID"
                />

              </Form.Group>
			  <Form.Group controlId="DOJ">
                <Form.Label>
                  DOJ
                </Form.Label>
                <Form.Control
                  type="date"
                  name="DOJ"
                  required
                  placeholder="DOJ"
                />

              </Form.Group>
              <Form.Group>

                <Button variant="primary" type="submit">
                  Add 
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