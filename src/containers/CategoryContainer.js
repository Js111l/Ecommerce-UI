import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import { Card } from 'primereact/card'
import { Dropdown } from "primereact/dropdown";
import { Paginator } from 'primereact/paginator';
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import EnumService from "../services/EnumService";
import { Button } from "primereact/button";

const CategoryListContainer = (props) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState(undefined)
  const navigation = useNavigate()
  const [hoveredLikeButton,setHoveredLikeButton]=useState({})
  const [criteria, setCriteria] = useState({
    page: first,
    size: rows,
    sortAsc: true,
    sortField: 'id',
    category: '',
    sortType: ''
  });
  const [hoverStatus,setHoverStatus]=useState({});

  const service = new ProductService();
  const enumService = new EnumService();
  const [sortTypeOptions,setSortTypeOptions]=useState([])

  const fetchData = async (criteria) => {
    props.setLoading(true)
    try {
      const response = await service.getList(criteria);
      const json = await response.json();
      setProducts(json.content);
      setTotalRecords(json.totalElements)
      setRows(json.pageable.pageSize)
      setFirst(json.pageable.offset)

      const enumServiceResponse = await enumService.getValuesByClassName('SortType');
      const enumJson = await enumServiceResponse.json()
      setSortTypeOptions(enumJson);

      props.setLoading(false);
    } catch (error) {
      props.setLoading(false);
      console.log("error", error);
    }
  }


  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search)
    const category = queryParameters.get("category")
    criteria.category = category;
    setCriteria(criteria)
    fetchData(criteria);
  }, []);



  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return null;
    }
  };


  const renderFilters = () => {
    return (
      <>
        <div
          className="row"
          style={{ marginLeft: "15%", marginTop: "5%", maxWidth: "100%" }}
        >
          <Dropdown
            placeholder="Sortuj"
            value={criteria.sortType}
            options={sortTypeOptions}
            onChange={(e) => {
              criteria.sortType = e.target.value
              setCriteria(criteria)
              fetchData(criteria)
            }}
            style={{
              width: "20%",
              marginRight: "20px",
            }}
          ></Dropdown>
          <Dropdown
            placeholder="Kategoria"
            style={{
              width: "20%",
              marginRight: "20px",
            }}
          ></Dropdown>
          <Dropdown
            placeholder="Marka"
            style={{
              width: "20%",
              marginRight: "20px",
            }}
          ></Dropdown>
          <Dropdown
            placeholder="Kolor"
            style={{
              width: "20%",
              marginRight: "20px",
            }}
          ></Dropdown>
        </div>
        <div className="row" style={{ marginLeft: "15%", marginTop: "1%" }}>
          <Dropdown
            placeholder="Faktura"
            style={{
              width: "20%",
              marginRight: "20px",
            }}
          ></Dropdown>
          <Dropdown
            placeholder="Cena"
            style={{
              width: "20%",
              marginRight: "20px",
            }}
          ></Dropdown>
          <Dropdown
            placeholder="Długość rękawa"
            style={{
              width: "20%",
              marginRight: "20px",
            }}
          ></Dropdown>
          <Dropdown
            placeholder="Fason"
            style={{
              width: "20%",
              marginRight: "20px",
            }}
          ></Dropdown>
        </div>
      </>
    )
  }

  const onPageChange = (event) => {
    criteria.page = event.first
    criteria.size = event.rows
    setCriteria(criteria)
    fetchData(criteria)
  };

  
  const getMappedProducts = (products) => {
    let result = []
    for (let i = 0; i < products.length; i += 3) {
      const index = i;
      result.push(
        <div className="row">
          {products.slice(i, i + 3).map((product) => {
          return (
            <Card
                className="col-md-4"
                style={{
                  //width: "600px",
                }}
                onClick={(e) => {
                  navigation(`/product/details/${product?.id}`)
                }}
              >
                <div
                  style={{
                    minHeight: '500px',   // Set the minimum height
                    height: '100%'     
                  }}
                >
                  <div>
                  <div style={{
                    display:'flex',
                    justifyContent:'start',
                    position:'absolute',
                    marginTop:'25px'
                  }}>
                    
                    <Button
                      icon={"pi pi-heart"}
                      style={{
                        background:'white',
                        border:'none',
                        color: hoveredLikeButton?.status && hoveredLikeButton?.id === product.id 
                        ? 'red' : 'black'
                      }}
                      onMouseEnter={() => setHoveredLikeButton({
                        id: product.id,
                        status: true
                      })}
                      onMouseLeave={() => setHoveredLikeButton({
                        id: product.id,
                        status: false
                      })}
                    >
                      
                    </Button>
                    </div>
                  <img
                    src={hoverStatus.status && product.id === hoverStatus.id ? product?.detailUrl : product?.imageUrl}
                    alt={product?.name}
                    style={{
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                        marginTop: "5%",
                      }}
                      onClick={() => { }}
                    onMouseEnter={() => {
                      setHoverStatus({
                        status: true,
                        id: product.id,
                      });
                    }}
                    onMouseLeave={() => {
                      setHoverStatus({
                        status: false,
                        id: product.id,
                      });
                    }}
                  />
                </div>
          
                <div className="container">
                  <div
                    className="row"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '10%',
                    }}
                  >
                    {product?.name + product?.id}
                  </div>
                  <div
                    className="row"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '5%',
                      color: 'gray',
                    }}
                  >
                    {product?.category}
                  </div>
                  <div
                    className="row"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '5%',
                      color: 'gray',
                    }}
                  >
                    {product?.price}
                  </div>
                </div>
              </div>
            </Card>
          );
          })}
        </div>
      )
    }
    return result
  }


  return (
    (
      <div style={{
        marginLeft:'5%',
        marginRight: '5%'
      }}>
        <div style={{ maxWidth: '100%' }}>
          {renderFilters()}
        </div>
        <div
          style={{
            //marginLeft: "5%",
            //marginRight: "5%",
          }}
        >
          {getMappedProducts(products)}
        </div>
        <div className="card">
          <Paginator first={first} rows={rows} totalRecords={totalRecords} rowsPerPageOptions={[5, 10, 20, 50]} onPageChange={onPageChange} />
        </div>
      </div>
    )
  )
};

export default CategoryListContainer;