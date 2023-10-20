import "./App.css";
import { checkDBConnection, getTableFromDB } from "./Axios/APICalls";
import Button from "@mui/material/Button";
import GetTableButton from "./GetTableButton";
import React, {useState} from 'react';

function App() {

  const [checkConn, setCheckConn] = useState(null);

  return (
    <div className="App">
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "100px" }}
        onClick={async () => {
          const res = await checkDBConnection();
          setCheckConn(1);
          console.log(res);
        }}
      >
        Check DB Connection
      </Button>
      {checkConn && <p>Successful Connection</p>}
      <GetTableButton chosenTable="RESTAURANT"/>
      <GetTableButton chosenTable="DINING_HALL"/>
      <GetTableButton chosenTable="COMMENT"/>
      <GetTableButton chosenTable="COMMENT_DISLIKES"/>
      <GetTableButton chosenTable="COMMENT_LIKES"/>
      <GetTableButton chosenTable="MENU_ITEM"/>
      <GetTableButton chosenTable="REVIEW"/>
      <GetTableButton chosenTable="REVIEW_DISLIKES"/>
      <GetTableButton chosenTable="REVIEW_LIKES"/>
      <GetTableButton chosenTable="USER"/>
    </div>
  );
}

export default App;
