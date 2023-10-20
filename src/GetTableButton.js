import { checkDBConnection, getTableFromDB } from "./Axios/APICalls";
import Button from "@mui/material/Button";
import React, {useState} from 'react';

function GetTableButton({ chosenTable }) {

    const [tableData, setTableData] = useState(null);

    const fetchData = async () => {
        const res = await getTableFromDB(chosenTable);
        setTableData(res.data);
        console.log(res);
    }

    return (
        <div>
        <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: "200px"}}
            onClick={fetchData}
        >
            Get {chosenTable}
        </Button>
        {tableData && (
            <div>
            <h3>Table Data:</h3>
            {tableData.map((row, index) => (
                <div key={index}>
                <p>Entry: {index}</p>
                {Object.entries(row).map(([key, value]) => (
                    <div key={key}>
                    {key}: {value}
                    </div>
                ))}
                </div>
            ))}
            </div>
        )}
        </div>
    );
}

export default GetTableButton;