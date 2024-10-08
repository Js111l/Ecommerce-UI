import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useState } from "react";

const ProductCardContainer = (props) => {
    const [element,setElement] = useState(props.element)

    return (
        <div className='row' >
            <Card
                className="col"
                style={{
                    width: "100px",
                }}
            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'start',
                    width: '100%'
                }}>
                    <div
                        style={{
                            marginRight: '10px'
                        }}>
                        <img
                            className="w-9 shadow-2 border-round"
                            src={`https://primefaces.org/cdn/primereact/images/galleria/galleria3s.jpg`}
                            alt={"product.name"}
                        />
                    </div>
                    <div style={{
                        fontSize: '12px'
                    }}>
                        <div className='col'
                            style={{
                                display: 'flex',
                                justifyContent: 'start'
                            }}>
                            <span>{element?.brand}</span>
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
                        <div className='row'>
                            <span style={{
                            }} >{element?.quantity}</span>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default ProductCardContainer