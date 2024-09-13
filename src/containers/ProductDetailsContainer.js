import { useEffect, useState } from "react";
import { Galleria } from 'primereact/galleria';
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";

const ProductDetailsContainer = (props) => {
  const [register, setRegister] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {};
    fetchProducts();
  }, []);

  const [images, setImages] = useState(null);
  const [position, setPosition] = useState("bottom");
  const positionOptions = [
    {
      label: "Bottom",
      value: "bottom",
    },
    {
      label: "Top",
      value: "top",
    },
    {
      label: "Left",
      value: "left",
    },
    {
      label: "Right",
      value: "right",
    },
  ];
  const responsiveOptions = [
    {
      breakpoint: "991px",
      numVisible: 4,
    },
    {
      breakpoint: "767px",
      numVisible: 3,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
    },
  ];

  useEffect(() => {
    setImages([
      {
        itemImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria1.jpg",
        thumbnailImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria1s.jpg",
        alt: "Description for Image 1",
        title: "Title 1",
      },
      {
        itemImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria2.jpg",
        thumbnailImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria2s.jpg",
        alt: "Description for Image 2",
        title: "Title 2",
      },
      {
        itemImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria3.jpg",
        thumbnailImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria3s.jpg",
        alt: "Description for Image 3",
        title: "Title 3",
      },
      {
        itemImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria4.jpg",
        thumbnailImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria4s.jpg",
        alt: "Description for Image 4",
        title: "Title 4",
      },
      {
        itemImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria5.jpg",
        thumbnailImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria5s.jpg",
        alt: "Description for Image 5",
        title: "Title 5",
      },
      {
        itemImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria6.jpg",
        thumbnailImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria6s.jpg",
        alt: "Description for Image 6",
        title: "Title 6",
      },
      {
        itemImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria7.jpg",
        thumbnailImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria7s.jpg",
        alt: "Description for Image 7",
        title: "Title 7",
      },
      {
        itemImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria8.jpg",
        thumbnailImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria8s.jpg",
        alt: "Description for Image 8",
        title: "Title 8",
      },
      {
        itemImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria9.jpg",
        thumbnailImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria9s.jpg",
        alt: "Description for Image 9",
        title: "Title 9",
      },
      {
        itemImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria10.jpg",
        thumbnailImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria10s.jpg",
        alt: "Description for Image 10",
        title: "Title 10",
      },
      {
        itemImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria11.jpg",
        thumbnailImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria11s.jpg",
        alt: "Description for Image 11",
        title: "Title 11",
      },
      {
        itemImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria12.jpg",
        thumbnailImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria12s.jpg",
        alt: "Description for Image 12",
        title: "Title 12",
      },
      {
        itemImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria13.jpg",
        thumbnailImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria13s.jpg",
        alt: "Description for Image 13",
        title: "Title 13",
      },
      {
        itemImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria14.jpg",
        thumbnailImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria14s.jpg",
        alt: "Description for Image 14",
        title: "Title 14",
      },
      {
        itemImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria15.jpg",
        thumbnailImageSrc:
          "https://primefaces.org/cdn/primereact/images/galleria/galleria15s.jpg",
        alt: "Description for Image 15",
        title: "Title 15",
      },
    ]);
  }, []);

  const itemTemplate = (item) => {
    return (
      <img
        src={item.itemImageSrc}
        alt={item.alt}
        style={{ width: "100%", display: "block" }}
      />
    );
  };

  const thumbnailTemplate = (item) => {
    return (
      <img
        src={item.thumbnailImageSrc}
        alt={item.alt}
        style={{ width: "100%", display: "block" }}
      />
    );
  };

  return (
    <div className="content-container">
      <div className="row">
        <div className="col">
          <Galleria
            style={{
              maxWidth: "440px",
              marginLeft: "190px",
              marginTop: "40px",
            }}
            value={images}
            responsiveOptions={responsiveOptions}
            numVisible={5}
            item={itemTemplate}
            thumbnailsPosition={position}
            thumbnail={thumbnailTemplate}
          />
        </div>
        <div className="col" style={{ marginLeft: "80px" }}>
          <label style={{ marginTop: "40px" }}>Adidasek</label>
          <div className="row">
            <Dropdown
              style={{
                width: "270px",
                marginLeft: '12px'
              }}
            ></Dropdown>
          </div>
          <div className="row">
            <label>KOLOR: Czarny</label>
            <div
              className="col"
              style={{ display: "flex", justifyContent: "start" }}
            >
              <img
                src="https://primefaces.org/cdn/primereact/images/galleria/galleria14.jpg"
                style={{
                  width: "80px",
                  height: "80px",
                  marginRight: "10px",
                }}
              />
              <img
                src="https://primefaces.org/cdn/primereact/images/galleria/galleria14.jpg"
                style={{
                  width: "80px",
                  height: "80px",
                }}
              />
            </div>
          </div>
          <div className="row" style={{ marginTop: "20px" }}>
            <div className="col">
              <Button
                style={{
                  width: "220px",
                }}
                label={"Dodaj do koszyka"}
              />
              <Button
                icon={"pi pi-heart"}
                style={{
                  marginLeft: "12px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsContainer;