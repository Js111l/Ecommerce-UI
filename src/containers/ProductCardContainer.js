import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useReducer, useState } from "react";
import CheckoutService from "../services/CheckoutService";
import { Checkbox } from 'primereact/checkbox';
import ProductService from "../services/ProductService";

const ProductCardContainer = (props) => {
    const [element,setElement] = useState(props.element)
    const [quantity, setQuantity]=useState(props.element.quantity);
    const [, forceUpdate] = useState(0);
    const [checked, setChecked] = useState(props.selectedAll ? true : false);
    const refresh = useState(props.refresh)
    const selectedProducts = useState(props.selectedProducts)
    const viewMode = useState(props.viewMode)

    useEffect(() => {
        setChecked(props.selectedAll)
        
        return () => {
        };
      }, [props.selectedAll]); 


    const deleteProduct = async () => {
        try {
            const resp = await service.deleteProducts([element.id])
            await resp
            props.refresh()
        } catch (err) {
            console.log(err)
        }

    }

    const updateQuantity = async (e) => {
        try {
            const resp = await service.setQuantity(element.id, e.target.value)
            await resp
            setQuantity(e.target.value)
            props.refresh()
        } catch (err) {
            console.log(err)
        }
    }
    
    const quantityOptions = [1,2,3,4,5,6,7]
    const service=new CheckoutService()

    const formatMoney = (value) => {
        return (value / 100).toFixed(2);
    }
      
    return (
        <div className='row'
        style={{
            width:'100%',
            marginLeft:'0px'
        }} >
            <Card
                className="col"
                style={{
                    width: "100%",
                    border: "1px solid #ccc", 
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px", 
                    padding: "10px",
                    backgroundColor: "#f9f9f9" 
                }}
            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'start',
                    width: '100%'
                }}>
                    <div style={{
                        display:'flex',
                        alignItems: 'center',
                        marginRight: '10px'
                    }}>
                        {/* <Checkbox checked={checked} onChange={(e) => { //TODO implement it later
                            setChecked(e.checked)
                            props.onSelectProduct(checked, element.id)
                        }}></Checkbox> */}
                    </div>
                    <div
                        style={{
                            marginRight: '10px',
                            display:'flex',
                            alignItems:'center'
                        }}>
                        <img
                            className="w-9 shadow-2 border-round"
                            src={`https://primefaces.org/cdn/primereact/images/galleria/galleria3s.jpg`}
                            alt={"product.name"}
                        />
                    </div>
                    <div style={{
                        fontSize: '12px',
                        width:'100%'
                    }}>
                        <div className='col-md-2' 
                            style={{
                                display: 'flex',
                                justifyContent: 'start',
                                width:"100%"
                            }}>
                            <span>{element?.name}</span>
                            <Dropdown
                            style={{
                                marginLeft: 'auto'
                            }}
                            disabled={viewMode[0] === 'VIEW'}
                            value={quantity}
                            options={quantityOptions}
                            onChange={(e)=>{
                                updateQuantity(e)
                            }}
                            >
                            </Dropdown>
                            {viewMode[0] === 'VIEW' ? null :
                                <Button style={{
                                    marginLeft: 'auto'
                                }}
                                    icon="pi pi-times"
                                    onClick={(e) => {
                                        deleteProduct()
                                    }}
                                >
                                </Button>
                            }
                        </div>
                        <div className='row'>
                            <span style={{
                                width: '60%',
                                wordWrap: 'break-word'
                            }}>{element?.name}
                            </span>
                        </div>
                        {quantity > 1 ?
                            <div className='row'>
                                <span style={{
                                    fontWeight: 'bold'
                                }} >{formatMoney(element?.price * quantity)}
                                </span>
                                <span style={{
                                    fontWeight: 'bold'
                                }} >{`Za sztukę: ${formatMoney(element?.price)}`}
                                </span>
                            </div> : 
                            <div className='row'>
                                <span style={{
                                    fontWeight: 'bold'
                                }} >{formatMoney(element?.price)}</span>
                            </div> 
                        }
                        <div className='row'>
                            <span style={{
                            }} >{`Kolor: ${element?.color}`}</span>
                        </div>
                        <div className='row'>
                            <span style={{
                            }} >{`Rozmiar: ${element?.size}`}</span>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default ProductCardContainer