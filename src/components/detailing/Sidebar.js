import React, { useState, useEffect } from "react";
 import { BsArrowLeftShort,  } from "react-icons/bs";
 import { GoThreeBars } from "react-icons/go";
 //import Records from "./records.json";
 import Select from 'react-select'
 import MoreFactsButton from './moreFacts';
 import "rsuite/dist/rsuite.min.css";
import Scrollbar from 'react-scrollbar'

 const Sidebar = () => {
  const [fileName, setFileName] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

let Records = JSON.parse(window.sessionStorage.getItem("selectedImages"));
  //window.sessionStorage.removeItem("selectedImages");
  const [products, setProducts] = useState(Records)

 
  function handleChange (e){
   //  console.log('clicked', e.target.src)
     setFileName(e.target.src);
   };

   useEffect(() => {
    setSelectedOption(selectedOption);
    console.log('SelectedOption',selectedOption);
    console.log('Records',Records);
    var keys = [];
   for(var k in selectedOption) keys.push(selectedOption[k].value);
    console.log('filteredOptions',keys);
 // .filter(([key, value]) => selectedOption.includes(key))

  let filteredProducts=[];
  for (let i = 0; i < Records.length; i++) {
    if (keys.includes(Records[i].type)) {
      filteredProducts.push(Records[i])
     // console.log('Key exists in object:', Records[i]);
    } else {
     // console.log('Key does not exist in object:', jsonArray[i]);
    }
  }

    console.log('filteredProducts',filteredProducts);
    if(filteredProducts.length === 0){
      setProducts(Records);
    }else{
      setProducts(filteredProducts);
    }
    
  }, [selectedOption])

    const [open, setOpen] = useState(true);

    
// Multiselect Dropdown

let uniqueType = [...new Set(Records.map(item => item.type))];
let productType = uniqueType.map(name => ({'value':name, 'label':name}));


    return (
      <div className="flex  h">
     
  <div
          className={`bg-dark-purple h-screen top-0 left-0 max-h-280 p-5 pt-8 overflow-y-scroll ${
            open ? "w-64" : "w-20"
          } duration-700 `}
        >

<div className="inline-flex ">
<GoThreeBars
              className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left py-2 mr-2 duration-700 ${
                open && "rotate-[360deg]"
              }`} onClick={() => setOpen(!open)}
            />

            <h1
              className={`bg-dark-purple text-white origin-left font-medium text-3xl duration-700 
             ${!open && "scale-0"}`}
            >
              {" "}
              <b> EMBIOTICS </b>
            </h1>
</div>
            {/* For DropDown */}

<div className="inner pt-6 rounded-md cursor-pointer">
{" "}
            {products &&
              products.map((record) => {
                return (
                  <div
                    className={`text-white py-2 origin-left font-medium text-1xl duration-500 
             ${!open && "scale-0"}`}
                    key={record.id}
                  >
                    <img src={record.image} alt="" onClick={handleChange} />
                    {record.product}
                  </div>
                );
              })}
            </div> 

</div>


        <div className="flex">
    
          <img src={fileName} alt="" />
      <MoreFactsButton />
     
    </div>
</div>

    );
 }
 
 export default Sidebar