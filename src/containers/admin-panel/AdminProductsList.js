import { Card } from 'primereact/card';
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import { Button } from 'primereact/button';
import FileUploadComponent from './FileUploadComponent';
import FileUploadDialog from './FileUploadDialog';

const AdminProductsList = (props) => {
  const navigation = useNavigate();
  const [visible, setVisible] = useState(false);

  const [allProducts, setItems] = useState([]);
  const [toggle, setToggle] = useState(false);

  const service = new ProductService();

  useEffect(() => {
    const fetchData = async () => {
      props.setLoading(true);
      try {
        const response = await service.getDashboard();
        const json = await response.json();
        setItems(json);
        props.setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const style = {
    backgroundColor: "black",
    width: "100%",
    height: "300px",
  };

  const getColumns = () => {
    return [
      {
        field: "yourField",
        header: "Thumbnail",
      },
      {
        field: "yourField",
        header: "Name",
      },
      {
        field: "yourField",
        header: "Category",
      },
      {
        field: "yourField",
        header: "Gross price",
      },
      {
        field: "yourField",
        header: "Net price",
      },
      {
        field: "yourField",
        header: "Tax",
      },
      {
        field: "yourField",
        header: "Product code",
      },
      {
        field: "yourField",
        header: "Stock",
      },
      {
        field: "yourField",
        header: "Create date",
      },
    ];
  };

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <div className="row">
        <span className="text-xl text-900 font-bold">Produkty</span>
      </div>
      <div style={{ display: "flex", justifyContent: "start" }}>
        <Button
          icon="pi pi-plus"
          rounded
          raised
          label="Dodaj produkt"
          style={{ marginRight: "20px" }}
        />
        <Button
          icon="pi "
          rounded
          raised
          label="Importuj"
          onClick={(e) => {
            setVisible(true);
          }}
        />
      </div>
    </div>
  );
 const renderDatatable = () => {
   const columns = getColumns().map((col) => {
     return <Column field={col.field} header={col.header} />;
   });

   return (
     <DataTable
       header={header}
       value={allProducts}
       tableStyle={{
        //  maxWidth: "800px",
         minHeight: "500px",
       }}
     >
       {columns}
     </DataTable>
   );
 };

  return (
    <div>
      <Card
        style={{
          display: "flex",
          justifyContent: "center",
          background: "var(--surface-card)",
          padding: "2rem",
        }}
      >
        <FileUploadDialog visible={visible} showMessage={props.showMessage} onHide={() => setVisible(false)} />
        {renderDatatable()}
      </Card>
    </div>
  );
};
  
  export default AdminProductsList;