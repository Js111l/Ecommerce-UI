import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import ProductService from '../../services/ProductService';
import { Paginator } from 'primereact/paginator';
import { Card } from 'primereact/card';



const UserReturnsContainers = (props) => {

    const [hover, setHover] = useState({})
    const navigation = useNavigate()
    const service = new ProductService();
    const [returns, setReturns] = useState([])
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [totalRecords, setTotalRecords] = useState(undefined)
    const [hoverStatus, setHoverStatus] = useState({});

    const [criteria, setCriteria] = useState({
        page: first,
        size: rows,
        sortAsc: true,
        sortField: 'id',
        category: '',
        sortType: ''
    });

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
                        
                        {/* <Button
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
                          
                        </Button> */}
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

    const fetchData = async (criteria) => {
        const response = await service.getList(criteria);
        const json = await response.json();
        setReturns(json.content);



        props.setLoading(false)
    }

    useEffect(() => {
        props.setLoading(true)

        fetchData()
    }, [])

    const onPageChange = (event) => {
        criteria.page = event.first
        criteria.size = event.rows
        setCriteria(criteria)
        fetchData(criteria)
    };


    const sidebar = (
        <div className='col-md-2'>
            <div
                className='row'
                style={{
                    marginTop: '5%',
                    cursor: 'pointer',
                    textDecoration: hover.id === 0 && hover.status ? 'underline' : ''
                }}
                onMouseEnter={() => setHover({ id: 0, status: true })}
                onMouseLeave={() => setHover({ id: 0, status: false })}
                onClick={(e) => {
                    navigation('/user/account')
                }}
            >
                <span>Moje dane</span>
            </div>
            <div
                className='row'
                style={{
                    marginTop: '5%',
                    cursor: 'pointer',
                    textDecoration: hover.id === 1 && hover.status ? 'underline' : ''
                }}
                onMouseEnter={() => setHover({ id: 1, status: true })}
                onMouseLeave={() => setHover({ id: 1, status: false })}
                onClick={(e) => {
                    navigation('/user/returns')
                }}
            >
                <span>Zwroty</span>
            </div>
            <div
                className='row'
                style={{
                    marginTop: '5%',
                    cursor: 'pointer',
                    textDecoration: hover.id === 2 && hover.status ? 'underline' : ''
                }}
                onMouseEnter={() => setHover({ id: 2, status: true })}
                onMouseLeave={() => setHover({ id: 2, status: false })}
                onClick={(e) => {
                    navigation('/user/return-form')
                }}
            >

                <span>Wykonaj zwrot</span>
            </div>
            <div
                className='row'
                style={{
                    marginTop: '5%',
                    cursor: 'pointer',
                    textDecoration: hover.id === 3 && hover.status ? 'underline' : ''
                }}
                onMouseEnter={() => setHover({ id: 3, status: true })}
                onMouseLeave={() => setHover({ id: 3, status: false })}
                onClick={(e) => {
                    navigation('/user/orders')
                }}
            >

                <span>Zamówienia</span>
            </div>
            <div
                className='row'
                style={{
                    marginTop: '5%',
                    cursor: 'pointer',
                    textDecoration: hover.id === 4 && hover.status ? 'underline' : ''
                }}
                onMouseEnter={() => setHover({ id: 4, status: true })}
                onMouseLeave={() => setHover({ id: 4, status: false })}
                onClick={(e) => {
                    navigation('/user/addresses')
                }}
            >

                <span>Adresy</span>
            </div>
            <div
                className='row'
                style={{
                    marginTop: '5%',
                    cursor: 'pointer',
                    textDecoration: hover.id === 5 && hover.status ? 'underline' : ''
                }}
                onMouseEnter={() => setHover({ id: 5, status: true })}
                onMouseLeave={() => setHover({ id: 5, status: false })}
                onClick={(e) => {
                    navigation('/user/favorites')
                }}
            >
                <span>Lista życzeń</span>
            </div>
        </div>
    )


    const divider = (
        (
            <hr style={{
                marginTop: '3%',
                marginBottom: '3%'
            }} class="solid">
            </hr>
        )
    )


    return (
        <div className='row'
            style={{
                marginLeft: '20%',
                marginRight: '20%',
                marginTop: '5%'
            }}>
            {sidebar}
            <div className='col-md-6' style={{
                marginLeft: "12%"
            }}>
                {getMappedProducts}
            </div>
            <div className="card">
                <Paginator first={first} rows={rows} totalRecords={totalRecords} rowsPerPageOptions={[5, 10, 20, 50]} onPageChange={onPageChange} />
            </div>
        </div>
    )
}

export default UserReturnsContainers;
