import {
  Button,
  Form,
  Input,
  Header,
  Loader,
  Dimmer,
  Segment,
  Divider,
} from 'semantic-ui-react';


// WorkshopForm is a simple form used for the Skynet Workshop
const WorkshopForm = (props) => {


  return (
    <>
      <Segment>
        <Dimmer active={props.loading}>
          <Loader active={props.loading} />
        </Dimmer>

          <>
            {props.loggedIn === true && (
              <Button onClick={props.handleMySkyLogout}>
                Log Out of MySky
              </Button>
            )}
            {props.loggedIn === false && (
              <Button color="green" onClick={props.handleMySkyLogin}>
                Login with MySky
              </Button>
            )}
            <Divider />
          </>

  

        <Form onSubmit={props.handleSubmit}>
            <>
              

              <Form.Field>
                <label>
                  Discoverable UserID <i>(Shared across MySky)</i>
                </label>
                <Input
                  placeholder="You must Login with MySky..."
                  value={props.userID}
                  icon="user circle"
                  iconPosition="left"
                />
              </Form.Field>
              
              <Divider />
              
              
              <Form.Group inline>
                <Form.Input
                  label="To Do Item"
                  placeholder="Enter To Do Item"
                  value={props.formValue}
                  onChange={(e) => {
                    props.setFormValue(e.target.value);
                  }}
                  
                />
                <Button 
                  disabled={!(props.formValue.length > 0)} 
                  onClick={()=>{
                    props.setLoading(true)
                    props.handleMySkyWrite()}}
                  >
                  Add to List!
                </Button>
                <Button 
                  disabled={!(props.toDoList.length > 0)} 
                  onClick={() => 
                    {
                    props.setLoading(true)
                    props.handleMySkyClearList()}
                    }>
                    Delete List!
                </Button>
              </Form.Group>
              
              
              
              <Divider />
            </>

         
      
        </Form>
        <Header as="h4">MySky To Do List</Header>

        {props.toDoList && <div style={{display: 'flex', flexDirection: 'column' }}>
            
            {props.toDoList.map((item)=>{
            return (<div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px'}}>
              <Button primary style={{minWidth: '200px', maxWidth: '75%'}}>{item}</Button>
              <Button onClick={()=>{
                props.setLoading(true)
                props.handleMySkyDelete(item)}}>
                Finished!
              </Button>
              </div>)
            })}      
      </div>}
      </Segment>
      
      
    </>
  );
};

export default WorkshopForm;
