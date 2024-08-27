import { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import ProductService from "../services/ProductService";
import {Card } from 'primereact/card'
const CategoryListContainer = (props) => {
    const [loading, setLoading] = useState(true);
    const [layout, setLayout] = useState('grid');
    const [products, setProducts] = useState([]);

    const service = new ProductService();

    useEffect(() => {
      const fetchData = async () => {
        props.setLoading(true)
        try {
          const response = await service.getDashboard();
          const json = await response.json();
          setProducts(json);
          props.setLoading(false);
        } catch (error) {
          console.log("error", error);
        }
      };
      fetchData();
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

    const listItem = (product, index) => {
        return (
            <div className="col" key={product.id}>
              {product.name}
                {/* <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.name}</div>
                            <Rating value={product.rating} readOnly cancel={false}></Rating>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.category}</span>
                                </span>
                                <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.price}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                        </div>
                    </div>
                </div> */}
            </div>
        );
    };

  const gridItem = (product) => {
    return (
    <Card className="col"
    style={{
      width:'100px'
    }}>
      <div className="col-2 col-sm-2 col-lg-2 col-xl-2 p-2" key={product.id}>
        <div className="p-4 border-1 surface-border surface-card border-round">
          <div className="flex flex-column align-items-center gap-3 py-5">
            <img className="w-9 shadow-2 border-round" src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} />
            <div className="text-2xl font-bold">{product.name}</div>
            <Rating value={product.rating} readOnly cancel={false}></Rating>
          </div>
        </div>
      </div>
    </Card>
    );
  };
  

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product, index);
        else if (layout === 'grid') return gridItem(product);
    };

    const listTemplate = (products, layout) => {
        return <div className="row">
          {products.map((product, index) => itemTemplate(product, layout, index))}
          </div>;
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
      <div>
      <div className="row">
        {/* <DataView value={products.slice(1,3)} itemTemplate={itemTemplate} layout={layout} header={header()} />
        <DataView value={products.slice(1,3)} itemTemplate={itemTemplate} layout={layout} header={header()} />
        <DataView value={products.slice(1,3)} itemTemplate={itemTemplate} layout={layout} header={header()} /> */}
   (
    <Card className="col"
     style={{
      width:'100px'
    }}>
      <div className="col-2 col-sm-2 col-lg-2 col-xl-2 p-2" key={'product.id'}>
        <div className="p-4 border-1 surface-border surface-card border-round">
          <div className="flex flex-column align-items-center gap-3 py-5">
            <img className="w-9 shadow-2 border-round" src={`https://primefaces.org/cdn/primereact/images/product/${'product.image'}`}
            alt={'product.name'} />
            <div className="text-2xl font-bold">{'product.name'}</div>
            <Rating value={'product.rating'} readOnly cancel={false}></Rating>
          </div>
        </div>
      </div>
    </Card>
    <Card className="col"
     style={{
      width:'100px'
    }}>
      <div className="col-2 col-sm-2 col-lg-2 col-xl-2 p-2" key={'product.id'}>
        <div className="p-4 border-1 surface-border surface-card border-round">
          <div className="flex flex-column align-items-center gap-3 py-5">
            <img className="w-9 shadow-2 border-round" src={`https://primefaces.org/cdn/primereact/images/product/${'product.image'}`}
            alt={'product.name'} />
            <div className="text-2xl font-bold">{'product.name'}</div>
            <Rating value={'product.rating'} readOnly cancel={false}></Rating>
          </div>
        </div>
      </div>
    </Card>
    <Card className="col"
     style={{
      width:'100px'
    }}>
      <div
        style={{
          width: '300px'
        }}>
        <div className="mb-3">
          <img src={'/buty2.jpg'} alt={'product.name'} style={{
            width: '300px',
            height: '350px',
            cursor: 'pointer',
            marginTop: '5%'
          }} 
          onClick={() => {
            
          }}
          onMouseEnter={() => {
          //  setHoverStatus({
          //     status: true,
          //     id: index
          //  });
          }}
            onMouseLeave={() => {
              // setHoverStatus({
              //   status: false,
              //   id: index
              // });
            }}
          />
        </div>
        <div className='container'>
          <div className='row' style={{ display: 'flex', justifyContent: 'center', marginTop:'10%' }}>
            {'product.name'}
          </div>
          <div className='row' style={{ display: 'flex', justifyContent: 'center',marginTop:'5%', color:'gray'}}>
            {'product.category'}
          </div>
          <div className='row' style={{ display: 'flex', justifyContent: 'center',marginTop:'5%', color:'gray'}}>
            {'product.price'}
          </div>
          {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop:'8%' }}>
            <Button //icon="pi pi-search"
             rounded style={{ marginRight: '20px' }} label='Ulubione'/>
            <Button icon="pi pi-star-fill" rounded label='Dodaj do koszyka'/>
          </div> */}
        </div>
      </div>
    </Card>
      </div>
         <div className="row">
         {/* <DataView value={products.slice(1,3)} itemTemplate={itemTemplate} layout={layout} header={header()} />
         <DataView value={products.slice(1,3)} itemTemplate={itemTemplate} layout={layout} header={header()} />
         <DataView value={products.slice(1,3)} itemTemplate={itemTemplate} layout={layout} header={header()} /> */}
    (
     <Card className="col"
      style={{
       width:'100px'
     }}>
       <div className="col-2 col-sm-2 col-lg-2 col-xl-2 p-2" key={'product.id'}>
         <div className="p-4 border-1 surface-border surface-card border-round">
           <div className="flex flex-column align-items-center gap-3 py-5">
             <img className="w-9 shadow-2 border-round" src={`https://primefaces.org/cdn/primereact/images/product/${'product.image'}`}
             alt={'product.name'} />
             <div className="text-2xl font-bold">{'product.name'}</div>
             <Rating value={'product.rating'} readOnly cancel={false}></Rating>
           </div>
         </div>
       </div>
     </Card>
     <Card className="col"
      style={{
       width:'100px'
     }}>
       <div className="col-2 col-sm-2 col-lg-2 col-xl-2 p-2" key={'product.id'}>
         <div className="p-4 border-1 surface-border surface-card border-round">
           <div className="flex flex-column align-items-center gap-3 py-5">
             <img className="w-9 shadow-2 border-round" src={`https://primefaces.org/cdn/primereact/images/product/${'product.image'}`}
             alt={'product.name'} />
             <div className="text-2xl font-bold">{'product.name'}</div>
             <Rating value={'product.rating'} readOnly cancel={false}></Rating>
           </div>
         </div>
       </div>
     </Card>
     <Card className="col"
      style={{
       width:'100px'
     }}>
       <div
         style={{
           width: '300px'
         }}>
         <div className="mb-3">
           <img src={'/buty2.jpg'} alt={'product.name'} style={{
             width: '300px',
             height: '350px',
             cursor: 'pointer',
             marginTop: '5%'
           }} 
           onClick={() => {
             
           }}
           onMouseEnter={() => {
           //  setHoverStatus({
           //     status: true,
           //     id: index
           //  });
           }}
             onMouseLeave={() => {
               // setHoverStatus({
               //   status: false,
               //   id: index
               // });
             }}
           />
         </div>
         <div className='container'>
           <div className='row' style={{ display: 'flex', justifyContent: 'center', marginTop:'10%' }}>
             {'product.name'}
           </div>
           <div className='row' style={{ display: 'flex', justifyContent: 'center',marginTop:'5%', color:'gray'}}>
             {'product.category'}
           </div>
           <div className='row' style={{ display: 'flex', justifyContent: 'center',marginTop:'5%', color:'gray'}}>
             {'product.price'}
           </div>
           {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop:'8%' }}>
             <Button //icon="pi pi-search"
              rounded style={{ marginRight: '20px' }} label='Ulubione'/>
             <Button icon="pi pi-star-fill" rounded label='Dodaj do koszyka'/>
           </div> */}
         </div>
       </div>
     </Card>
       </div>
          <div className="row">
          {/* <DataView value={products.slice(1,3)} itemTemplate={itemTemplate} layout={layout} header={header()} />
          <DataView value={products.slice(1,3)} itemTemplate={itemTemplate} layout={layout} header={header()} />
          <DataView value={products.slice(1,3)} itemTemplate={itemTemplate} layout={layout} header={header()} /> */}
     (
      <Card className="col"
       style={{
        width:'100px'
      }}>
        <div className="col-2 col-sm-2 col-lg-2 col-xl-2 p-2" key={'product.id'}>
          <div className="p-4 border-1 surface-border surface-card border-round">
            <div className="flex flex-column align-items-center gap-3 py-5">
              <img className="w-9 shadow-2 border-round" src={`https://primefaces.org/cdn/primereact/images/product/${'product.image'}`}
              alt={'product.name'} />
              <div className="text-2xl font-bold">{'product.name'}</div>
              <Rating value={'product.rating'} readOnly cancel={false}></Rating>
            </div>
          </div>
        </div>
      </Card>
      <Card className="col"
       style={{
        width:'100px'
      }}>
        <div className="col-2 col-sm-2 col-lg-2 col-xl-2 p-2" key={'product.id'}>
          <div className="p-4 border-1 surface-border surface-card border-round">
            <div className="flex flex-column align-items-center gap-3 py-5">
              <img className="w-9 shadow-2 border-round" src={`https://primefaces.org/cdn/primereact/images/product/${'product.image'}`}
              alt={'product.name'} />
              <div className="text-2xl font-bold">{'product.name'}</div>
              <Rating value={'product.rating'} readOnly cancel={false}></Rating>
            </div>
          </div>
        </div>
      </Card>
      <Card className="col"
       style={{
        width:'100px'
      }}>
        <div
          style={{
            width: '300px'
          }}>
          <div className="mb-3">
            <img src={'/buty2.jpg'} alt={'product.name'} style={{
              width: '300px',
              height: '350px',
              cursor: 'pointer',
              marginTop: '5%'
            }} 
            onClick={() => {
              
            }}
            onMouseEnter={() => {
            //  setHoverStatus({
            //     status: true,
            //     id: index
            //  });
            }}
              onMouseLeave={() => {
                // setHoverStatus({
                //   status: false,
                //   id: index
                // });
              }}
            />
          </div>
          <div className='container'>
            <div className='row' style={{ display: 'flex', justifyContent: 'center', marginTop:'10%' }}>
              {'product.name'}
            </div>
            <div className='row' style={{ display: 'flex', justifyContent: 'center',marginTop:'5%', color:'gray'}}>
              {'product.category'}
            </div>
            <div className='row' style={{ display: 'flex', justifyContent: 'center',marginTop:'5%', color:'gray'}}>
              {'product.price'}
            </div>
            {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop:'8%' }}>
              <Button //icon="pi pi-search"
               rounded style={{ marginRight: '20px' }} label='Ulubione'/>
              <Button icon="pi pi-star-fill" rounded label='Dodaj do koszyka'/>
            </div> */}
          </div>
        </div>
      </Card>
        </div>
           <div className="row">
           {/* <DataView value={products.slice(1,3)} itemTemplate={itemTemplate} layout={layout} header={header()} />
           <DataView value={products.slice(1,3)} itemTemplate={itemTemplate} layout={layout} header={header()} />
           <DataView value={products.slice(1,3)} itemTemplate={itemTemplate} layout={layout} header={header()} /> */}
      (
       <Card className="col"
        style={{
         width:'100px'
       }}>
         <div className="col-2 col-sm-2 col-lg-2 col-xl-2 p-2" key={'product.id'}>
           <div className="p-4 border-1 surface-border surface-card border-round">
             <div className="flex flex-column align-items-center gap-3 py-5">
               <img className="w-9 shadow-2 border-round" src={`https://primefaces.org/cdn/primereact/images/product/${'product.image'}`}
               alt={'product.name'} />
               <div className="text-2xl font-bold">{'product.name'}</div>
               <Rating value={'product.rating'} readOnly cancel={false}></Rating>
             </div>
           </div>
         </div>
       </Card>
       <Card className="col"
        style={{
         width:'100px'
       }}>
         <div className="col-2 col-sm-2 col-lg-2 col-xl-2 p-2" key={'product.id'}>
           <div className="p-4 border-1 surface-border surface-card border-round">
             <div className="flex flex-column align-items-center gap-3 py-5">
               <img className="w-9 shadow-2 border-round" src={`https://primefaces.org/cdn/primereact/images/product/${'product.image'}`}
               alt={'product.name'} />
               <div className="text-2xl font-bold">{'product.name'}</div>
               <Rating value={'product.rating'} readOnly cancel={false}></Rating>
             </div>
           </div>
         </div>
       </Card>
       <Card className="col"
        style={{
         width:'100px'
       }}>
         <div
           style={{
             width: '300px'
           }}>
           <div className="mb-3">
             <img src={'/buty2.jpg'} alt={'product.name'} style={{
               width: '300px',
               height: '350px',
               cursor: 'pointer',
               marginTop: '5%'
             }} 
             onClick={() => {
               
             }}
             onMouseEnter={() => {
             //  setHoverStatus({
             //     status: true,
             //     id: index
             //  });
             }}
               onMouseLeave={() => {
                 // setHoverStatus({
                 //   status: false,
                 //   id: index
                 // });
               }}
             />
           </div>
           <div className='container'>
             <div className='row' style={{ display: 'flex', justifyContent: 'center', marginTop:'10%' }}>
               {'product.name'}
             </div>
             <div className='row' style={{ display: 'flex', justifyContent: 'center',marginTop:'5%', color:'gray'}}>
               {'product.category'}
             </div>
             <div className='row' style={{ display: 'flex', justifyContent: 'center',marginTop:'5%', color:'gray'}}>
               {'product.price'}
             </div>
             {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop:'8%' }}>
               <Button //icon="pi pi-search"
                rounded style={{ marginRight: '20px' }} label='Ulubione'/>
               <Button icon="pi pi-star-fill" rounded label='Dodaj do koszyka'/>
             </div> */}
           </div>
         </div>
       </Card>
         </div>
            <div className="row">
            {/* <DataView value={products.slice(1,3)} itemTemplate={itemTemplate} layout={layout} header={header()} />
            <DataView value={products.slice(1,3)} itemTemplate={itemTemplate} layout={layout} header={header()} />
            <DataView value={products.slice(1,3)} itemTemplate={itemTemplate} layout={layout} header={header()} /> */}
       (
        <Card className="col"
         style={{
          width:'100px'
        }}>
          <div className="col-2 col-sm-2 col-lg-2 col-xl-2 p-2" key={'product.id'}>
            <div className="p-4 border-1 surface-border surface-card border-round">
              <div className="flex flex-column align-items-center gap-3 py-5">
                <img className="w-9 shadow-2 border-round" src={`https://primefaces.org/cdn/primereact/images/product/${'product.image'}`}
                alt={'product.name'} />
                <div className="text-2xl font-bold">{'product.name'}</div>
                <Rating value={'product.rating'} readOnly cancel={false}></Rating>
              </div>
            </div>
          </div>
        </Card>
        <Card className="col"
         style={{
          width:'100px'
        }}>
          <div className="col-2 col-sm-2 col-lg-2 col-xl-2 p-2" key={'product.id'}>
            <div className="p-4 border-1 surface-border surface-card border-round">
              <div className="flex flex-column align-items-center gap-3 py-5">
                <img className="w-9 shadow-2 border-round" src={`https://primefaces.org/cdn/primereact/images/product/${'product.image'}`}
                alt={'product.name'} />
                <div className="text-2xl font-bold">{'product.name'}</div>
                <Rating value={'product.rating'} readOnly cancel={false}></Rating>
              </div>
            </div>
          </div>
        </Card>
        <Card className="col"
         style={{
          width:'100px'
        }}>
          <div
            style={{
              width: '300px'
            }}>
            <div className="mb-3">
              <img src={'/buty2.jpg'} alt={'product.name'} style={{
                width: '300px',
                height: '350px',
                cursor: 'pointer',
                marginTop: '5%'
              }} 
              onClick={() => {
                
              }}
              onMouseEnter={() => {
              //  setHoverStatus({
              //     status: true,
              //     id: index
              //  });
              }}
                onMouseLeave={() => {
                  // setHoverStatus({
                  //   status: false,
                  //   id: index
                  // });
                }}
              />
            </div>
            <div className='container'>
              <div className='row' style={{ display: 'flex', justifyContent: 'center', marginTop:'10%' }}>
                {'product.name'}
              </div>
              <div className='row' style={{ display: 'flex', justifyContent: 'center',marginTop:'5%', color:'gray'}}>
                {'product.category'}
              </div>
              <div className='row' style={{ display: 'flex', justifyContent: 'center',marginTop:'5%', color:'gray'}}>
                {'product.price'}
              </div>
              {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop:'8%' }}>
                <Button //icon="pi pi-search"
                 rounded style={{ marginRight: '20px' }} label='Ulubione'/>
                <Button icon="pi pi-star-fill" rounded label='Dodaj do koszyka'/>
              </div> */}
            </div>
          </div>
        </Card>
          </div>
          </div>
    );
  };
  
  export default CategoryListContainer;