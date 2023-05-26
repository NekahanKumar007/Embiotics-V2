import React, { useState, useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { API, setTokenHeader } from "../../redux/api.js";
// import RecordsFile from "./records.json";
//  import MoreFactsButton from './Buttons/moreFacts';
//  import ShareButton from './Buttons/share';
import "rsuite/dist/rsuite.min.css";
// import { NavLink, useHistory } from "react-router-dom";
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
  // const [firstClickTime, setFirstClickTime] = useState(null);
  // const [selectedProductId, setSelectedProductId] = useState(null);
  const [recordProductInfo, setRecordProductInfo] = useState({
    selectedProductId: "",
    startTime: "",
    endTime: "",
    timeTaken: "",
    status: ""
  });

  let notSelectedProducts =[];

  let [arrayProductInfo, setArrayProductInfo] = useState([]);
  // let recordProductInfo= {};
  // let arrayProductInfo =[]

  let Records = JSON.parse(window.sessionStorage.getItem("selectedImages"));
  let RecordsFile = JSON.parse(window.sessionStorage.getItem("receivedImages"));
  let recordInfo = JSON.parse(window.sessionStorage.getItem("recordInfo"));
  //window.sessionStorage.removeItem("selectedImages");
  const [products, setProducts] = useState(Records);

  //console.log(products);
  function handleChange(e) {
    // console.log("clicked", e.target.alt);
    setFileName(e.target.src); // for displaying image
    setProductId(e.target.alt);

    setSubImages(e.target.alt);

    productRecordInfo(e.target.alt);

    let selectedImage = Records.find(obj => obj.id == e.target.alt);
    let selectedImage2 = RecordsFile.find(obj => obj.id == e.target.alt);

     // the image displayed in the content area
    sessionStorage.setItem('viewImage', JSON.stringify({ productName: selectedImage.product, url:selectedImage.image, youtubeLink: selectedImage2.youtubelink }));
  }
  let token = localStorage.getItem("token");
  setTokenHeader(token);

  useEffect(() => {
    console.log("arrayProductInfo", arrayProductInfo);
    getAllProductInfo();
  }, [arrayProductInfo]);

  //to get the selected productInfo
  function productRecordInfo(productId) {
    //console.log(recordProductInfo)
    //if starting for the first time
    if (recordProductInfo.selectedProductId == "") {
      setRecordProductInfo((prevData) => ({
        ...prevData,
        selectedProductId: productId,
        startTime: new Date().toLocaleString(),
        status: 1
      }));

      // recordProductInfo.productId =productId;
      // recordProductInfo.startTime = new Date();
      //  console.log('1st',recordProductInfo)
    }
    //if different product is clicked
    else if (recordProductInfo.productId != productId) {
      //   //record the previous product's info and set the new one
      recordProductInfo.endTime = new Date().toLocaleString();
      recordProductInfo.timeTaken = new Date() - new Date(recordProductInfo.startTime);
      // console.log('differentProduct',recordProductInfo);
     // setArrayProductInfo((prevArray) => [...prevArray, recordProductInfo]);
        arrayProductInfo.push(recordProductInfo);
      // and set the new one
      setRecordProductInfo((prevData) => ({
        selectedProductId: productId,
        startTime: new Date().toLocaleString(),
        endTime: "",
        timeTaken: "",
        status: 1
      }));
      // recordProductInfo.productId = productId;
      // recordProductInfo.startTime = new Date();
      // recordProductInfo.endTime='';
      // recordProductInfo.timetaken ='';
    }

    //if same product is clicked again
    else if (recordProductInfo.productId == productId) {
      setRecordProductInfo((prevData) => ({
        ...prevData,
        endTime: new Date().toLocaleString(),
        timeTaken: new Date() - new Date(prevData.startTime),
      }));
      //   recordProductInfo.endTime=new Date();
      //  recordProductInfo.timetaken = new Date() - recordProductInfo.startTime;
      //    console.log('sameProduct',recordProductInfo)
    }

    // if (firstClickTime === null) {
    //   // first image is clicked
    //   setFirstClickTime(new Date())
    //   setSelectedProductId(productId);
    // } else {
    //   // second image is clicked
    //   let secondClickTime = new Date();
    //   let timeDiff = secondClickTime.getTime() - firstClickTime.getTime(); // time difference in milliseconds
    //   //console.log(`Time between clicks: ${timeDiff} milliseconds`);
    //   setFirstClickTime(null) // reset firstClickTime for next pair of clicks
    //   console.log('timeDiff',timeDiff)

    //   setSelectedProductId(null);
    // }
  }

   function saveDetails(obj){
    
    API.post(`/eva/doctorvisitrecord`,obj)
      .then((response) => {
        console.log(response.data);  
        window.location.href = "/detailing";    
      })
      .catch((error) => {
        console.log(error);
      });
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
  }, [selectedOption]);


 function save(){

  checkLastProduct(); //record the last product
       
  getAllProductInfo(); // to get not selected products


  let finalArray = [...notSelectedProducts, ...arrayProductInfo]; // combine 
  console.log(finalArray);
  //save all the products
  for (const element of finalArray) {
    const mergedObject = { ...element, ...recordInfo }
   // console.log(mergedObject)
  saveDetails(mergedObject);
  }

   
  // Swal.fire('Detailing Ended!', 'The detailing has been successfully ended.', 'success');
 }


  function showAlert() {
    Swal.fire({
      title: "Do You Want To Go Back! </br> And End Detailing",
      icon: "warning",
      iconHtml: "!",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "animate-swal-center",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle OK button click
        save();
        // history.push('/detailing');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
      }
    });
  }

  const [open, setOpen] = useState(true);

  // Multiselect Dropdown

  // let uniqueType = [...new Set(Records.map((item) => item.type))];
  // let productType = uniqueType.map((name) => ({ value: name, label: name }));

  function setSubImages(product) {
    let images = RecordsFile.find((obj) => obj.id == product);
    //setSubImages(images)
    //  console.log("products", images);
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
     console.log('previousProduct',previousObj)

    if (previousObj) {
      setFileName(previousObj.image); // for displaying image
      setProductId(previousObj.id);
      setSubImages(previousObj.id);
      productRecordInfo(previousObj.id);
    }
  }

  function findNext() {
    let nextObj = null;
    console.log('products',products)
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === productId) {
        nextObj = products[i + 1];
        break;
      }
    }
     console.log('nextproduct',nextObj)
    if (nextObj) {
      setFileName(nextObj.image); // for displaying image
      setProductId(nextObj.id);
      setSubImages(nextObj.id);
      productRecordInfo(nextObj.id);
    }
  }

  // to record end time and timeTaken for the last product
 function checkLastProduct(){
  console.log('last product',recordProductInfo);
 if(recordProductInfo.endTime == ''){
  recordProductInfo.endTime = new Date().toLocaleString();
  recordProductInfo.timeTaken = new Date() - new Date(recordProductInfo.startTime);
  //setArrayProductInfo((prevArray) => [...prevArray, recordProductInfo]);
  arrayProductInfo.push(recordProductInfo);
 }
 }

 // get all the products info
 function getAllProductInfo(){
   
  // products selected in detailing page
  let selectedImages = JSON.parse(sessionStorage.getItem("selectedImages"));
  //get the products not selected by the user
  let productsNotSelected = selectedImages.filter(obj => !arrayProductInfo.some(o => o.selectedProductId == obj.id));
  //console.log('productsNotSelected',productsNotSelected);
  notSelectedProducts = productsNotSelected.map((item) => {
    // Transformation logic
    return {
      selectedProductId: item.id,
      startTime: '',
      endTime: '',
      timeTaken:'',
      status: '0'
    }
  });
 }

  //End Detailing

  const handleEndDetailing = () => {

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to end detailing?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, end it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        save();
      }else if (result.dismiss === Swal.DismissReason.cancel) {
        
      }
    });
  };

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
              <div
                className="bg-amber-300 text-black text-3xl rounded-md cursor-pointer border border-dark-purple float-left mt-1 mr-2 duration-500"
                onClick={showAlert}>
                {item.icon}
              </div>
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

          <button
      onClick={handleEndDetailing}
      className="bg-red-500 hover:bg-red-700 text-white mt-4 py-2 px-4 rounded-md"
    >
      End Detailing
    </button>

        </div>
       

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