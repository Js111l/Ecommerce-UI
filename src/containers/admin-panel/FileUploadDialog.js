import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { Dialog } from 'primereact/dialog';
import { useState } from "react";
import FileUploadComponent from "./FileUploadComponent";
import { DataTable } from "primereact/datatable";

const FileUploadDialog = (props) => {
    const navigation = useNavigate();
    const style = {
      backgroundColor: "black",
      width: "100%",
      height: "300px",
    };
    return (
      <div>
        <Dialog
          header="Wybierz plik CSV"
          visible={props.visible}
          style={{ width: "50vw" }}
          onHide={props.onHide}
        >
          <FileUploadComponent showMessage={props.showMessage} />
          
        </Dialog>
      </div>
    );
  };
  
  export default FileUploadDialog;