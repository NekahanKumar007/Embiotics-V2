import React, { useState, useEffect } from "react";
// import Records from "../detailing/records.json";
// import Sidebar from "../detailing/Sidebar";
import Sidebar1 from "./Sidebar1";
import "./Sidebar.css";
import axios from "axios";
import { API, setTokenHeader } from "../../redux/api.js";
import Select from "react-select";
import "../../App.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
// import classNames from 'classnames';
const Detailing = () => {
  // let uniqueType = [...new Set(Records.map((item) => item.type))];
  // let productType = uniqueType.map((name) => ({ value: name, label: name }));
  // const [selectedOption, setSelectedOption] = useState("");
  const [products, setProducts] = useState("");
  // const [groupedImages, setGroupedImages] = useState([]);
  // const [switchState, setSwitchState] = useState(false);
  const imagesFTPUrl = "https://webikind.net";
  const [recordInfo, setRecordInfo] = useState({empId: '',"doctorId":"", "postDocSelectionDateTime": "", "latitude": '', "longitude": '', "ipAddress": '', "productsIdsAuto": '', "productsIdsManually": "", "postStartDetailingDateTime": ''});
  // for radio buttons

  const [selectedOptionRadio, setSelectedOptionRadio] = useState(null);

  const handleOptionChange = (event) => {
    setProducts([]);
    setSelectedOptionRadio(event.target.value);
  };

  useEffect(() => {
    if (selectedOptionRadio == "allProducts") {
      fetchAllProducts();
    }
  }, [selectedOptionRadio]);
  let token = localStorage.getItem("token");
  setTokenHeader(token);
  // finished

  let id = 0;
  // function selectOption(e) {
  //   setSelectedOption(e.target.src);
  //   var keys = [];
  //   for (var k in selectedOption) keys.push(selectedOption[k].value);
  //   // console.log("filteredOptions", keys);
  //   // .filter(([key, value]) => selectedOption.includes(key))

  //   let filteredProducts = [];
  //   for (let i = 0; i < Records.length; i++) {
  //     if (keys.includes(Records[i].type)) {
  //       filteredProducts.push(Records[i]);
  //       // console.log('Key exists in object:', Records[i]);
  //     } else {
  //       // console.log('Key does not exist in object:', jsonArray[i]);
  //     }
  //   }

  //   console.log("filteredProducts", filteredProducts);
  //   if (filteredProducts.length === 0) {
  //     setProducts(Records);
  //   } else {
  //     setProducts(filteredProducts);
  //   }
  // }

  // function productTypeSelect(e) {
  //   // console.log(e.target.innerText);

  //   let filteredProducts = Records.filter((o) => o.type === e.target.innerText);

  //   if (e.target.innerText == "All") {
  //     setProducts(Records);
  //   } else {
  //     setProducts(filteredProducts);
  //   }
  // }

  const [clickedImages, setClickedImages] = useState({}); /// for highlighting

  const [selectedImages, setSelectedImages] = useState([]); //footer varaible
  const [selectedImage, setSelectedImage] = useState(null); // not used

  const [transferSelectedImages, setTransferImages] = useState([]);

  const isImageDisabled = true;

  const handleImageSelect = (event) => {
    const selectedImage = event.target.src;

    let productId = event.target.id;
    //to set the selected images productId for highlighting

    //get whether products are autoSelected/for doctors or all products
    const liElement = event.target.closest('li');
   
      const from = liElement.dataset.from;
      console.log('Clicked item ID:', from);
    

    highlightImages(productId);

    console.log("selectedImage", selectedImage);

    // to set the selected images url for footer and transfering to next page
    if (selectedImages.length >= 10) {
      return false;
    }

    footerImages(selectedImage);

    if (transferSelectedImages.some((obj) => obj.product == event.target.alt)) {
      let filtered = transferSelectedImages.filter(
        (image) => image.product != event.target.alt
      );

      // console.log(filtered);

      // if (switchState) {
      //   //remove all other images grouped with the clicked image
      //   let image = products.find((o) => o.id == event.target.id);
      //   // console.log("image to be removed", image);
      //   const filteredArray = products.filter(
      //     (item) => item.group == image.group && item.id != image.id
      //   );
      //   // console.log("images to be removed", filteredArray);
      //   // console.log("remove", filteredArray);
      //   for (let data of filteredArray) {
      //     filtered = filtered.filter((image) => image.product != data.product);
      //   }
      // }
      setTransferImages(filtered);
      window.sessionStorage.setItem("selectedImages", JSON.stringify(filtered));
      // console.log("filter", filtered);
    } else {
      console.log("productname", event.target.id);
      transferSelectedImages.push({
        product: event.target.alt,
        image: selectedImage,
        id: event.target.id,
        type: "test",
        from: from
      });

      //add all other images grouped with the clicked image
      // console.log('switchState',switchState)
      // find the images grouped with the selected image

      // if (switchState) {
      //   let image = products.find((o) => o.id == event.target.id);

      //   const filteredArray = products.filter(
      //     (item) => item.group == image.group && item.id != image.id
      //   );

      //   // console.log("grouped", filteredArray);

      //   for (let data of filteredArray) {
      //     transferSelectedImages.push({
      //       product: data.product,
      //       image: data.image,
      //       id: image.id,
      //       type: data.type,
      //     });
      //   }
      // }

      setTransferImages(transferSelectedImages);

      window.sessionStorage.setItem(
        "selectedImages",
        JSON.stringify(transferSelectedImages)
      );
      // console.log("added", transferSelectedImages);
    }
  };

  function highlightImages(productId) {
    setClickedImages((prevState) => {
      return {
        ...prevState,
        [productId]: !prevState[productId],
      };
    });
  }

  function footerImages(selectedImage) {
    console.log("selectedImages", selectedImages);
    if (selectedImages.includes(selectedImage)) {
      setSelectedImages(
        selectedImages.filter((image) => image !== selectedImage)
      );
    } else {
      setSelectedImages([...selectedImages, selectedImage]);
    }
  }

  function transferImages() {}

  function checkImages() {
    if (selectedImages.length === 0) {
      return false;
    }

  let selectedImgs = JSON.parse(sessionStorage.getItem('selectedImages'))
 
 //read auto selected products
    const productsIdsAuto = selectedImgs
  .filter(obj => obj.from == "byDoctors")
  .map(obj => obj.id)
  .join(",");

 //read manually selected products
 const productsIdsManually = selectedImgs
  .filter(obj => obj.from == "allProducts")
  .map(obj => obj.id)
  .join(",");

  //console.log(recordInfo);
   
    
   recordInfo.productsIdsAuto = productsIdsAuto;
   recordInfo.productsIdsManually = productsIdsManually;
   recordInfo.postStartDetailingDateTime = new Date().toLocaleString();
   sessionStorage.setItem('recordInfo', JSON.stringify(recordInfo))
    window.location.href="/sidebar";
  }

  // const handleSwitchChange = () => {
  //   //  console.log(products)

  //   //clear all selected images

  //   setSelectedImages([]);
  //   setTransferImages([]);
  //   window.sessionStorage.removeItem("selectedImages");

  //   setSwitchState(!switchState);
  //   if (switchState) {
  //     setProducts(products);
  //     alert("All Products");
  //   } else {
  //     alert("Grouped and Ungrouped");
  //     //filter the array where group is not empty
  //     let filteredArray = products.filter((obj) => {
  //       return obj.group.trim() !== "";
  //     });

  //     // group the filterd array by the key --group
  //     let groupedObject = filteredArray.reduce((result, obj) => {
  //       let key = obj.group;
  //       if (!result[key]) {
  //         result[key] = [];
  //       }
  //       result[key].push(obj);
  //       return result;
  //     }, {});

  //     // console.log(groupedObject);

  //     //read the first element from each group

  //     let firstImageInGroup = [];
  //     for (let x in groupedObject) {
  //       firstImageInGroup.push(groupedObject[x][0]);
  //       console.log(firstImageInGroup);
  //     }

  //     if (firstImageInGroup) setGroupedImages(firstImageInGroup);

  //     let filteredArray2 = products.filter((obj) => {
  //       return obj.group.trim() == "";
  //     });

  //     let final;
  //     if (filteredArray2) {
  //       final = filteredArray2.concat(firstImageInGroup);
  //     }

  //     if (firstImageInGroup) {
  //       final = firstImageInGroup.concat(filteredArray2);
  //     }

  //     setProducts(final);
  //   }
  // };

  //dropdown part

  const [cities, setCities] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [proceedClicked, setProceedClicked] = useState(false);

  // API call for products

  const fetchAllProducts = () => {
    // if (!selectedDoctor.doctorId) {
    //   Swal.fire({
    //     title: "Please Select the Doctor!",
    //     icon: "warning",
    //     iconHtml: "!",
    //     showConfirmButton: true,
    //     customClass: {
    //       popup: "animate-swal-center",
    //     },
    //   });
    // }

    API.get(`/registrations/product/getallactive`)
      .then((response) => {
        console.log(response.data);

        let RecordsFile = JSON.parse(
          window.sessionStorage.getItem("receivedImages")
            ? window.sessionStorage.getItem("receivedImages")
            : []
        );

        window.sessionStorage.setItem(
          "receivedImages",
          JSON.stringify(response.data.results)
        );
     
        const productsArray = response.data.results.map((item) => {
          //console.log(item)
          const prodObj =
            RecordsFile.find((obj) => obj["id"] === item.productId) || null;

          //console.log(prodObj)
          return {
            id: item.productId,
            name: item.productName,
            product_group: item.productGroup,
            product_type: item.productType,
            image: item.image,
            follow_image: item.followImage,
            youtubelink: item.youtubeLink,
            from: prodObj ? "byDoctors" : "allProducts",
          };
        });

        setProducts(productsArray);
        window.sessionStorage.setItem("receivedImages",JSON.stringify(productsArray))
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchProductsByDocIds = () => {
    if (!selectedDoctor.doctorId) {
      Swal.fire({
        title: "Please Select the Doctor!",
        icon: "warning",
        iconHtml: "!",
        showConfirmButton: true,
        customClass: {
          popup: "animate-swal-center",
        },
      });
    }

    API.get(
      `/registrations/getproductsbydocids?doctorId=${selectedDoctor.doctorId}`
    )
      .then((response) => {
        console.log(response.data);

        const productsArray = response.data.results.map((item) => {
          return {
            id: item.id,
            name: item.name,
            product_group: item.product_group,
            product_type: item.product_type,
            image: item.image,
            follow_image: item.follow_image,
            youtubelink: item.youtubelink,
            from: "byDoctors",
          };
        });

        setProducts(productsArray);

        // console.log(products);

        let footerImgs = [];
        let transferImgs = [];
        productsArray.forEach((obj) => {
          highlightImages(obj.id);
          // console.log(imagesFTPUrl+obj.image)
          ///footerImages(imagesFTPUrl+obj.image);

          footerImgs.push(imagesFTPUrl + obj.image);
          transferImgs.push({
            product: obj.name,
            image: imagesFTPUrl + obj.image,
            id: obj.id,
            type: obj.product_type,
            from:'byDoctors'
          });
        });

        setSelectedImages(footerImgs);

        setTransferImages(transferImgs);
        window.sessionStorage.setItem(
          "receivedImages",
          JSON.stringify(response.data.results)
        );
        window.sessionStorage.setItem(
          "selectedImages",
          JSON.stringify(transferImgs)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // API call for cities and doctors
  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      API.get("/registrations/doctor/getdoctorcities")
        .then(function (response) {
          console.log(response.data);

          setCities(response.data.results);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDoctors = async (cityIds) => {
    try {
      const response = await API.get(
        `/registrations/doctor/getdoctorbycity?cityId=${cityIds}`
      );
      const data = await response;
      console.log(data);
      setDoctors(data.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCityChange = (cityId, cityName) => {
    //const cityId = event.target.value;
    // console.log(cityId, cityName)
    setSelectedCity({ cityId: cityId, cityName: cityName });
    setSelectedDoctor("");
    fetchDoctors(cityId);
  };

  const handleDoctorChange = (doctorId, doctorName) => {
   // console.log(doctorId, doctorName);
    setSelectedDoctor({ doctorId: doctorId, doctorName: doctorName });
   sessionStorage.setItem('doctorName', JSON.stringify(doctorName))
    setRecordInfo((prevData) => ({
      ...prevData,
      postDocSelectionDateTime: new Date().toLocaleString(),
    }));   
  };

  const handleProceed = (event) => {
    // handle proceed button click
    setClickedImages([]);
    fetchProductsByDocIds();
    setProceedClicked(true);
  
   
    if ("geolocation" in navigator) {

      navigator.permissions.query({ name: 'geolocation' }).then(function(result) {
        if (result.state === 'granted') {
          console.log("Location services are enabled.");
          return false
        } else if (result.state === 'prompt') {
          console.log("Location services prompt is shown.");
        } else if (result.state === 'denied') {
          Swal.fire({
            title: "Location is denied",
            icon: "warning",
            iconHtml: "!",
            showConfirmButton: true,
            customClass: {
              popup: "animate-swal-center",
            },
          });
        }
      });

      let ipAddress=''
      fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
         ipAddress = data.ip;

         let empDetails = JSON.parse(localStorage.getItem('empDetails'))
         let empId = empDetails.userId
        console.log('empId:', empId);
      navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
    console.log('ipAddress',ipAddress)
        setRecordInfo((prevData) => ({
          ...prevData,
          doctorId: selectedDoctor.doctorId,
          latitude: latitude,
          longitude: longitude,
          ipAddress: ipAddress,
          empId: empId
        }));   
      });
      
      })
      .catch(error => {
        console.error('Error:', error);
      });

      

    } else {
      //console.log("Geolocation is not supported by your browser.");
      Swal.fire({
        title: "Geolocation is not supported by your browser",
        icon: "warning",
        iconHtml: "!",
        showConfirmButton: true,
        customClass: {
          popup: "animate-swal-center",
        },
      });
    }
    

  
  };
  // Handle reset button click
  const handleReset = () => {
    setSelectedCity("");
    setSelectedDoctor("");
    setProducts([]);
    setSelectedImages([]);
    sessionStorage.removeItem("receivedImages");
    sessionStorage.removeItem("selectedImages");
  };

  // toggle button

  const toggleButton = () => {
    if (proceedClicked && selectedDoctor.doctorId) {
      fetchAllProducts();
    } else{
      Swal.fire({
        title: "Please Select the Doctor!",
        icon: "warning",
        iconHtml: "!",
        showConfirmButton: true,
        customClass: {
          popup: "animate-swal-center",
        },
      });
    
    }
  };

  return (
    <div className="flex fixed">
      <Sidebar1 />

      <div className="content">
        <div className="flex flex-grow bg-light-white">
          <div className="px-2 origin-left font-medium ">
            <div className="flex flex-row ">
              {/* Radio buttons */}
              <div className="flex flex-row mt-4 justify-top space-x-4">
                {/* <label htmlFor="byDoctors" className="mt-1">By Doctors</label>
                <input
                  type="radio"
                  value="byDoctors"
                  checked={selectedOptionRadio === "byDoctors"}
                  onChange={handleOptionChange}
                  
                /> */}

                {/* <label htmlFor="allProducts" className="mt-1">All Products</label>
                <input
                  type="radio"
                  value="allProducts"
                  checked={selectedOptionRadio === "allProducts"}
                  onChange={handleOptionChange}
                  
                /> */}

                {/* Dropdown part */}

                <div className="flex flex-row space-x-4 mb-2">
                  <label htmlFor="city-dropdown" className="text-[20px] mt-1">
                    Select City
                  </label>
                  <Select
                    className="border border-gray-400 w-[130px] rounded-md focus:outline-none focus:border-blue-500"
                    id="city"
                    name="city"
                    // value={selectedCity}
                    value={{
                      label: selectedCity.cityName,
                      value: selectedCity.cityId,
                    }}
                    onChange={(option) =>
                      handleCityChange(option.value, option.label)
                    }
                    options={
                      cities &&
                      cities.map((city) => ({
                        label: city.city_name,
                        value: city.city_id,
                      }))
                    }
                    // {cities && cities.map((city) => (
                    //   <option key={city.city_id} value={city.city_id}>
                    //     {city.city_name}
                    //   </option>
                    // ))}
                  />

                  <label htmlFor="doctor-dropdown" className="text-[20px] mt-1">
                    Select Doctor
                  </label>
                  <Select
                    className="border border-gray-400 rounded-md w-[130px] focus:outline-none focus:border-blue-500"
                    id="doctor"
                    name="doctor"
                    value={{
                      label: selectedDoctor.doctorName,
                      value: selectedDoctor.doctorId,
                    }}
                    onChange={(option) =>
                      handleDoctorChange(option.value, option.label)
                    }
                    options={
                      doctors &&
                      doctors.map((doctor) => ({
                        label: doctor.doctorName,
                        value: doctor.id,
                      }))
                    }
                    // {doctors && doctors.map((doctor) => (
                    //   <option key={doctor.id} value={doctor.id}>
                    //     {doctor.doctorName}
                    //   </option>
                    // ))}
                  />

                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white  h-[35px] w-[70px] rounded-md"
                    onClick={handleProceed}>
                    Proceed
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white h-[35px] w-[80px] rounded-md"
                    onClick={handleReset}>
                    Reset
                  </button>
                </div>

              
                  <button
                    className={
                      "px-4 py-2 fixed top-4 right-4 z-10 rounded-md bg-blue-500 hover:bg-blue-700 text-white"
                    }
                    onClick={toggleButton}>
                    All Products
                  </button>
           
              </div>
            </div>

            <h6 className="text-black flex  bg-skin w-[1300px] mt-0">
              Select product for detailing
            </h6>

            {/* Product Type */}

            {/* <ul className="pt-1 inline-flex gap-x-4">
              <li className="text-white rounded-md mt-2 cursor-pointer">
                <span
                  className="bg-dark-blue hover:bg-pink hover:text-black rounded-md py-2 focus:outline-none text-base p-12 font-medium flex-1"
                  onClick={productTypeSelect}>
                  All
                </span>
              </li>
              {productType &&
                productType.map((record) => {
                  return (
                    <li className="text-white rounded-md mt-2 cursor-pointer">
                      <span
                        className="bg-dark-blue hover:bg-pink hover:text-black rounded-md py-2 focus:outline-none text-base p-12 font-medium flex-1"
                        value={record.value}
                        onClick={productTypeSelect}>
                        {record.value}
                      </span>
                    </li>
                  );
                })}

              <label
                htmlFor="switch"
                className="flex items-center cursor-pointer text-sm mt-4 ml-[200px]">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="switch"
                    className="sr-only "
                    onChange={handleSwitchChange}
                  />
                  <div className="block bg-gray-500 w-12 h-6 rounded-full"></div>
                  <div
                    className={`${
                      switchState
                        ? "translate-x-6 bg-sky-blue"
                        : "translate-x-0 bg-white"
                    } absolute left-0 top-0 bottom-0 w-6 h-6 rounded-full transition-transform`}></div>
                </div>
                <div className="ml-3 text-lg font bold text-gray-700">
                  By Group
                </div>
              </label>
            </ul> */}
            {/* images */}
            <div className="flex h-screen ">
              <ul className="grid grid-cols-5 gap-x-2 pt-3 mt-4 h-[500px] pb-20 rounded-md cursor-pointer overflow-x-hidden">
                {products &&
                  products.map((record) => {
                    //console.log(record.from);
                    return (
                      <li data-from={record.from}
                        className={`text-black font-medium gap-y-4 h-[200px]  space-y-4 text-sm ${
                          record.from == "byDoctors"
                            ? "pointer-events-none"
                            : ""
                        } ${
                          clickedImages[record.id] ? "border-4 border-skin" : ""
                        } cursor-pointer hover:opacity-75  `}
                        key={record.id}>
                        <img
                          src={imagesFTPUrl + record.image}
                          value={record.name}
                          alt={record.name}
                          // className={`w-full h-auto ${clickedImages[record.id] ? 'border-2 border-blue-500' : ''} cursor-pointer hover:opacity-75`}
                          // className=" w-full h-auto border-4 border-amber-800 cursor-pointer hover:opacity-75"
                          id={record.id}
                          onClick={handleImageSelect}
                        />
                        {record.name}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>

          <footer className="fixed bg-gray-500 bottom-0 w-full flex flex-nowrap">
            {/* bg-gray-400 text-black py-1 fixed bottom-0 w-full  */}
            <p className="text-white text-align-right px-4 mt-2 pt-6 text-black ">
              Selected Items
            </p>
            <div>
              <ul className="">
                {/* inline-flex gap-x-4 px-6 */}
                {selectedImages.map((image) => (
                  <li className="text-black font-medium text-sm pt-4 inline-block mr-2">
                    <img
                      src={image}
                      alt="Selected Image"
                      className="h-10 w-16"
                    />
                  </li>
                ))}
              </ul>
            </div>
            
              <button
                class="fixed bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 mt-4 mb-4 rounded-md right-4"
                onClick={checkImages}
                disabled={true ? selectedImages.length == 0 : false}>
                Start Detailing
              </button>
      
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Detailing;
