import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useReducer, useState } from "react";
import CheckoutService from "../services/CheckoutService";
import { Checkbox } from 'primereact/checkbox';

const ProductCardContainer = (props) => {
    const [element,setElement] = useState(props.element)
    const [quantity, setQuantity]=useState(props.element.quantity);
    const [, forceUpdate] = useState(0);
    const [checked, setChecked] = useState(props.selectedAll ? true : false);

    useEffect(() => {
        setChecked(props.selectedAll)
        
        return () => {
        };
      }, [props.selectedAll]); 

    // updateQuantity = async ()=>{
    //     try {
    //         const response = await service.getCheckoutCount(userId);
    //         const json = await response.json();
    //         setCheckoutCount(json);
    //         props.setLoading(false);
    //       } catch (error) {
    //         console.log(error);
    //       }
    // }
    const quantityOptions = [1,2,3,4,5,6,7]
    const service=new CheckoutService()

    
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
                    border: "1px solid #ccc", // Border to distinguish
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
                    borderRadius: "8px", // Rounded corners
                    padding: "10px", // Padding inside the card
                    backgroundColor: "#f9f9f9" // Light background color
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
                        <Checkbox checked={checked} onChange={(e)=>setChecked(e.checked)}></Checkbox>
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
                            value={quantity}
                            options={quantityOptions}
                            onChange={(e)=>{
                                service.setQuantity(element.id, e.target.value)
                                forceUpdate(n=>n+1)
                            }}
                            >
                            </Dropdown>
                            <Button style={{
                                marginLeft: 'auto'
                            }}
                                icon="pi pi-times"
                            >
                            </Button>
                        </div>
                        <div className='row'>
                            <span style={{
                                width: '60%',
                                wordWrap: 'break-word'
                            }}>{element?.name}
                            </span>
                        </div>
                        <div className='row'>
                            <span style={{
                                fontWeight: 'bold'
                            }} >{element?.price}</span>
                        </div>
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