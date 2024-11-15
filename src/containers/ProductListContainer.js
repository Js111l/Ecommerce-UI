import { useEffect, useState } from "react";
import ProductService from "../services/ProductService";
import { Card } from 'primereact/card'
import { Dropdown } from "primereact/dropdown";
import { Paginator } from 'primereact/paginator';
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import EnumService from "../services/EnumService";
import { Button } from "primereact/button";
import { TreeSelect } from 'primereact/treeselect';

const CategoryListContainer = (props) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState(undefined)
  const navigation = useNavigate()
  const [hoveredLikeButton,setHoveredLikeButton]=useState({})

  const [nodes, setNodes] = useState(null);
  const [categoriesOptions, setCategoriesOptions]=useState([])
  const [categoriesSelected,setCategoriesSelected]=useState({})
  const [fabricOptions,setFabricOptions]= useState([])
  const [sleeveLengthOptions, setSleeveLengthOptions]=useState([])
  const [styleOptions,setStyleOptions]=useState([])


  const [criteria, setCriteria] = useState({
    page: first,
    size: rows,
    sortAsc: true,
    sortField: 'id',
    categories: undefined,
    sortType: ''
  });
  const [hoverStatus,setHoverStatus]=useState({});

  const service = new ProductService();
  const enumService = new EnumService();
  const [sortTypeOptions,setSortTypeOptions]=useState([])
  const [brandOtions, setBrandsOptions]=useState([])
  const [colorsOptions,setColorsOptions]=useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const queryParameters = new URLSearchParams(window.location.search);
        const categoriesParams = queryParameters.get("categories");
        criteria.categories = categoriesParams;
  
        const categories = await service.getAllCategories();
        const categoriesJson = await categories.json();
        setCategoriesOptions(categoriesJson);
  
        const obj = {};
        categoriesJson.forEach((x) => check(x, categoriesParams, obj));
        setCategoriesSelected(obj);
  
        let arr = [];
        Object.keys(obj).forEach((key) => {
          if (obj[key].checked) arr.push(key);
        });
        criteria.categories = arr;
  
        setCriteria({ ...criteria });
      } catch (err) {
        console.log(err);
      }
    };
  

    const fetchBrands = async () => {
      try {
        const brands = await service.getAllBrands();
        const brandsJson = await brands.json();
        setBrandsOptions(brandsJson);
      } catch (err) {
        console.log(err);
      }
    };
  
    const fetchColors = async () => {
      try {
        const colors = await service.getAllColors();
        const colorsJson = await colors.json();
        setColorsOptions(colorsJson);
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchCategories();
    fetchBrands();
    fetchColors();
  }, []);
  


  const fetchData = async (criteria) => {
    const fetchEnums = async () => {
      try {
        // Fetch SortType options
        const sortTypeResponse = await enumService.getValuesByClassName('SortType');
        const sortTypeJson = await sortTypeResponse.json();
        setSortTypeOptions(sortTypeJson);
    
        // Fetch SleeveLength options
        const sleeveLengthResponse = await enumService.getValuesByClassName('SleeveLength');
        const sleeveLengthJson = await sleeveLengthResponse.json();
        setSleeveLengthOptions(sleeveLengthJson);
    
        // Fetch Style options
        const styleResponse = await enumService.getValuesByClassName('Style');
        const styleJson = await styleResponse.json();
        setStyleOptions(styleJson);
    
        // Fetch Fabric options
        const fabricResponse = await enumService.getValuesByClassName('Fabric');
        const fabricJson = await fabricResponse.json();
        setFabricOptions(fabricJson);
        
      } catch (err) {
        console.log(err);
      }
    };

    props.setLoading(true)
    try {
      const queryParameters = new URLSearchParams(window.location.search)
      const categories = queryParameters.get("categories")
      criteria.categories = categories;
      
      const response = await service.getList(criteria);

      const json = await response.json();
      setProducts(json.content);
      setTotalRecords(json.totalElements)
      setRows(json.pageable.pageSize)
      setFirst(json.pageable.offset)

      fetchEnums()

      props.setLoading(false);
    } catch (error) {
      props.setLoading(false);
      console.log("error", error);
    }
  }
  const check = (model, ids, obj) => {
    if (!model) {
      return;
    }

    if (ids.includes(model.key)) {
      console.log(ids, model,obj)
      obj[model.key] = {
        checked: true,
        partialChecked: false
      }
    }

    if (model.children && model.children.length) {
      model.children.forEach((x) => {
        check(x, ids, obj);
      });
    }
  }

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search)
    const category = queryParameters.get("category")

    criteria.category = category;
    
    setCriteria(criteria)
    fetchData(criteria);
  }, [criteria]);

  
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

  const formatMoney = (value) => {
    return (value / 100).toFixed(2);
  }

  const renderFilters = () => {
    return (
      <>
        <div
          className="row"
          style={{ marginLeft: "15%", marginTop: "5%", maxWidth: "100%" }}
        >
           <TreeSelect
            value={categoriesSelected}
            style={{
              width: "20%",
              marginRight: "20px",
            }}
            valueTemplate={(e)=>{
              return `Kategoria (2)`
            }}
            onChange={(e) => {
              setCategoriesSelected(e.value)
            }}
            options={categoriesOptions}
            metaKeySelection={false}
            className="md:w-20rem w-full"
            selectionMode="checkbox"
            display="chip"
            placeholder="Kategoria"
            panelFooterTemplate={(e) => {
              return (
                <Button style={{
                  width: '100%',
                  textAlign: 'center',
                }}
                  label="Zastosuj"
                  onClick={(e) => {
                    let ids = []
                    Object.keys(categoriesSelected).forEach(key => {
                      if (categoriesSelected[key].checked)
                        ids.push(key)
                    })
                    criteria.categories=ids;
                    setCriteria(criteria)
                    
                    navigation('/category/list?categories=' + ids)
                    fetchData(criteria)
                  }}
                >
                </Button>
              )
            }}
            >
          </TreeSelect>
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
            placeholder="Marka"
            value={criteria.sortType}
            options={brandOtions}
            style={{
              width: "20%",
              marginRight: "20px",
            }}
          ></Dropdown>
          <Dropdown
            placeholder="Kolor"
            value={criteria.sortType}
            options={colorsOptions}
            style={{
              width: "20%",
              marginRight: "20px",
            }}
          ></Dropdown>
        </div>
        <div className="row" style={{ marginLeft: "15%", marginTop: "1%" }}>
          <Dropdown
            placeholder="Faktura"
            value={criteria.sortType}
            options={fabricOptions}
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
            value={criteria.sortType}
            options={sleeveLengthOptions}
            style={{
              width: "20%",
              marginRight: "20px",
            }}
          ></Dropdown>
          <Dropdown
            placeholder="Fason"
            value={criteria.sortType}
            options={styleOptions}
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
                    {formatMoney(product?.price)}
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