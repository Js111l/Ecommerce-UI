import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";



const AdminPanelContainer = (props) => {
    const navigation = useNavigate();
    
  const style={
    backgroundColor: "black",
    width:'100%',
    height:'300px'
  }
    return (
      <div>
        <div className="row">
          <div className="col">
            <Card
              style={style}
            ></Card>
          </div>

          <div className="col">
            <Card
              style={style}
            ></Card>
          </div>
          <div className="col">
            <Card
              style={style}
            ></Card>
          </div>
        </div>
        <div className="row" style={{marginTop:'1%'}}>
          <div className="col">
            <Card
              style={style}
            ></Card>
          </div>

          <div className="col">
            <Card
              style={style}
            ></Card>
          </div>
          <div className="col">
            <Card
              style={style}
            ></Card>
          </div>
        </div>
      </div>
    );
  };
  
  export default AdminPanelContainer;