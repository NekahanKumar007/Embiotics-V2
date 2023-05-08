import React, { useState, useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
// import RecordsFile from "./records.json";
//  import MoreFactsButton from './Buttons/moreFacts';
//  import ShareButton from './Buttons/share';
import "rsuite/dist/rsuite.min.css";
import { NavLink } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";
import ThreeDots from "./Buttons/threeDots";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Sidebar = () => {
  const menuItem = [
    {
      path: "/detailing",
      icon: <TbArrowBackUp />,
    },
  ];

  const [fileName, setFileName] = useState(""); // image location
  const [productId, setProductId] = useState(""); // image/productid
  const [selectedOption, setSelectedOption] = useState("");
  const [publicLink, setPubliclink] = useState("");

  let Records = JSON.parse(window.sessionStorage.getItem("selectedImages"));
  let RecordsFile = JSON.parse(window.sessionStorage.getItem("receivedImages"));
  //window.sessionStorage.removeItem("selectedImages");
  const [products, setProducts] = useState(Records);

  //console.log(products);
  function handleChange(e) {
    // console.log("clicked", e.target.alt);
    setFileName(e.target.src); // for displaying image
    setProductId(e.target.alt);

    setSubImages(e.target.alt);
  }

  useEffect(() => {
    setSelectedOption(selectedOption);
    // console.log('SelectedOption',selectedOption);
    // console.log('Records',Records);
    var keys = [];
    for (var k in selectedOption) keys.push(selectedOption[k].value);
    // console.log("filteredOptions", keys);
    // .filter(([key, value]) => selectedOption.includes(key))

    let filteredProducts = [];
    for (let i = 0; i < Records.length; i++) {
      if (keys.includes(Records[i].type)) {
        filteredProducts.push(Records[i]);
        // console.log('Key exists in object:', Records[i]);
      } else {
        // console.log('Key does not exist in object:', jsonArray[i]);
      }
    }

    if (filteredProducts.length === 0) {
      setProducts(Records);
    } else {
      setProducts(filteredProducts);
    }

    window.addEventListener("beforeunload", showAlert);

    // remove event listener when component unmounts
    return () => {
      window.removeEventListener("beforeunload", showAlert);
    };
  }, [selectedOption]);

  function showAlert() {
    alert("Are you sure you want to leave?");
  }

  const [open, setOpen] = useState(true);

  // Multiselect Dropdown

  // let uniqueType = [...new Set(Records.map((item) => item.type))];
  // let productType = uniqueType.map((name) => ({ value: name, label: name }));

  function setSubImages(product) {

    let images = RecordsFile.find((obj) => obj.id == product);
    //setSubImages(images)
     console.log("products", images);
    window.sessionStorage.setItem("subImages", JSON.stringify(images));
    setPubliclink(images.link);
  }

  function findPrevious() {
    let previousObj = null;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === productId) {
        previousObj = products[i - 1];
        break;
      }
    }
    //setSubImages();
    // console.log(previousObj)

    if (previousObj) {
      setFileName(previousObj.image); // for displaying image
      setProductId(previousObj.id);
      setSubImages(previousObj.id);
    }
  }

  function findNext() {
    let nextObj = null;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === productId) {
        nextObj = products[i + 1];
        break;
      }
    }
    // console.log(nextObj)
    if (nextObj) {
      setFileName(nextObj.image); // for displaying image
      setProductId(nextObj.id);
      setSubImages(nextObj.id);
    }
  }

  return (
    <>
      <div className="flex">
        <div
          className={`bg-dark-blue h-screen p-5 pt-8 overflow-y-scroll no-scrollbar ${
            open ? "w-64" : "w-20"
          } duration-700 relative`}>
          <div className="inline-flex">
            <BsArrowLeftShort
              className={` bg-white text-dark-purple text-3xl rounded-full absolute -right-2 top-9 border border-dark-purple cursor-pointer ${
                !open && "rotate-180"
              }`}
              onClick={() => setOpen(!open)}
            />

            {menuItem.map((item, index) => (
              <NavLink to={item.path} key={index}>
                <div
                  className="bg-amber-300 text-black text-3xl rounded-md cursor-pointer border border-dark-purple float-left mt-1 mr-2 duration-500"
                  onClick={showAlert}>
                  {item.icon}
                </div>
              </NavLink>
            ))}
            <h1
              className={`bg-dark-blue text-white origin-left font-medium block text-3xl duration-700 
         ${!open && "scale-0"}`}>
              <b> FEMURA </b>
            </h1>
          </div>

          <div className="inner pt-6 rounded-md cursor-pointer">
            {" "}
            {products &&
              products.map((record) => {
                return (
                  <div
                    className={`text-white py-2 origin-left font-medium text-1xl duration-500 
              ${!open && "scale-0"}`}
                    key={record.id}>
                    <img
                      src={record.image}
                      alt={record.id}
                      onClick={handleChange}
                    />
                    {record.product}
                  </div>
                );
              })}
          </div>
        </div>
        <div></div>

        <div className="flex">
          <div className="inline-flex w-full">
            <img src={fileName} alt="" />
          </div>
          <div>
            <BsChevronCompactLeft
              className="absolute -translate-x-0 translate-y-[-50%] my-[400px] left-[270px] text-4xl rounded-full p-2 bg-black/30 text-white cursor-pointer"
              onClick={findPrevious}
            />
          </div>

          <div>
            <BsChevronCompactRight
              className="absolute -translate-x-0 translate-y-[50%] my-[360px] right-[60px] text-4xl rounded-full p-2 bg-black/30 text-white cursor-pointer"
              onClick={findNext}
            />
          </div>

          <ThreeDots />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
