// Import react components
import { useState, useEffect } from 'react';

// Import App Component & helper
import WorkshopForm from './components/Form';

// Import UI Components
import { Header, Container, Button } from 'semantic-ui-react';

import { ContentRecordDAC } from '@skynetlabs/content-record-library';

import { SkynetClient } from 'skynet-js';


const client = new SkynetClient();

const contentRecord = new ContentRecordDAC();



function App() {
  // Define app state helpers
  const [loading, setLoading] = useState(false);

  const [dataKey, setDataKey] = useState('5007');
  const [filePath, setFilePath] = useState(5007);
  const [userID, setUserID] = useState();
  const [mySky, setMySky] = useState();
  const [loggedIn, setLoggedIn] = useState(null);

  const [toDoList, setToDoList] = useState([]);
  const [formValue, setFormValue] = useState('');
  
  useEffect(() => {
    setFilePath(dataDomain + '/' + dataKey);
    console.log('datakey', dataKey)
  }, [dataKey]);

const dataDomain = 'localhost';


  useEffect(() => {

async function initMySky() {
  try {
    const mySky = await client.loadMySky(dataDomain);

    await mySky.loadDacs(contentRecord);

    const loggedIn = await mySky.checkLogin();

    setMySky(mySky);
    setLoggedIn(loggedIn);
    if (loggedIn) {
      setUserID(await mySky.userID());
    }
  } catch (e) {
    console.error(e);
  }
}

initMySky();
  }, []);

  const handleMySkyLogin = async () => {

    const status = await mySky.requestLoginAccess();


    setLoggedIn(status);

    if (status) {
      setUserID(await mySky.userID());
    }
  };

  const handleMySkyLogout = async () => {
   
    await mySky.logout();
    setLoggedIn(false);
    setUserID('');

  };

  const handleMySkyWrite = async () => {
    const newList = []
    toDoList?.forEach((item)=>{
      newList.push(item)
    })
    newList.push(formValue)


try {
  console.log('userID', userID);
  console.log('filePath', filePath);
  await mySky.setJSON(filePath, {toDoList: newList});
  loadData();
} catch (error) {
  console.log(`error with setJSON: ${error.message}`);
}
setLoading(false);

  };

  const handleMySkyClearList = async () => {
    const newList = []

  try {
  console.log('userID', userID);
  console.log('filePath', filePath);
  await mySky.setJSON(filePath, {toDoList: newList});
  loadData();
  } catch (error) {
  console.log(`error with setJSON: ${error.message}`);
  }
  setLoading(false)

}

  const handleMySkyDelete = async (i) => {
    const newList = []
    toDoList?.forEach((item)=>{
      if (!(item === i)) {newList.push(item)}
    })


  try {
  console.log('userID', userID);
  console.log('filePath', filePath);
  await mySky.setJSON(filePath, {toDoList: newList});
  loadData();
  } catch (error) {
  console.log(`error with setJSON: ${error.message}`);
  }
  setLoading(false);

}

  const loadData = async () => {
    console.log('Loading user data from SkyDB');



const { data } = await mySky.getJSON(filePath);

if (data) {
  setToDoList(data.toDoList)
  console.log('User data loaded from SkyDB!', data);
} else {
  console.error('There was a problem with getJSON');
}

  setLoading(false);
  };

  const formProps = {
    mySky,
    handleMySkyWrite,
    handleMySkyLogin,
    handleMySkyLogout,
    handleMySkyClearList,
    handleMySkyDelete,
    loadData,
    formValue,
    dataKey,
    loading,
    loggedIn,
    dataDomain,
    userID,
    toDoList,
    setFormValue,
    setToDoList,
    setLoggedIn,
    setDataKey,
    setLoading,
  };

  useEffect(()=>{
    setLoading(true);
    mySky && loadData();
  },[loggedIn])

  return (
    <Container>
      <Header
        as="h1"
        content="Skynet To Do List"
        textAlign="center"
        style={{ marginTop: '1em', marginBottom: '1em' }}
      />
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {loggedIn === false && (
          <Button color="green" onClick={handleMySkyLogin}>
            Login with MySky
          </Button>
        )}
        {loggedIn && <WorkshopForm {...formProps} />}
      </div>
      
    </Container>
  );
}

export default App;
