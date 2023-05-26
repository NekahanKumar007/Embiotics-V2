/** @format */

import React, { useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "react-modal";
import { HiInformationCircle } from "react-icons/hi";
// import ShareButton from "./share";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { FaCommentAlt  } from "react-icons/fa";
import { FiMail, FiShare2 } from "react-icons/fi";
import { ImYoutube2 } from "react-icons/im";
//  import { QRCode } from 'react-qrcode-logo';
import { useLocation } from "react-router-dom";
import axios from "axios";
import ChatBox from "./ChatBox";

//custom style for modal

const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "0.5rem",
    padding: "2rem",
    border: "none",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    maxWidth: "1000px",
    width: "100%",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1000,
  },
};

const MoreFactsButton = () => {
  const [isOpen, setIsOpen] = useState(false);
 

  const toggleOpen = () => setIsOpen(!isOpen);

  const imagesFTPUrl = "https://webikind.net";
  // For More Facts

  const [modalIsOpen, setModalIsOpen] = useState(false);


  
  function validateAndReturnImages(images) {
    //  console.log('products', images)
    if (images == null) {
      return [];
    } else if (images == "undefined") {
      //  console.log('condiotion2')
      return [];
    } else if (images == undefined) {
      //  console.log('condiotion2')
      return [];
    } else {
      //  console.log('condiotion3')
      return JSON.parse(window.sessionStorage.getItem("subImages"));
    }
  }

  let Products = validateAndReturnImages(
    window.sessionStorage.getItem("subImages")
  );

  //console.log("records", Products);

  const handleButtonClick = () => {
    setModalIsOpen(true);
  };

  // For  Youtube Link
  let youtubeLink= '';
  const [videoId, setVideoId] = useState(false);
  useEffect(() => {
    let player;
    let product = JSON.parse(sessionStorage.getItem("viewImage"));
    // if(product.youtubeLink){
      console.log('videoId', videoId)
    // }
try {
  

    const onYouTubeIframeAPIReady = () => {
      player = new window.YT.Player('youtube-player', {
        height: '360',
        width: '640',
        videoId: videoId,
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    };

    const onPlayerReady = (event) => {
      event.target.playVideo();
    };

    const onPlayerStateChange = (event) => {
      if (event.data === window.YT.PlayerState.ENDED) {
        closeModal();
      }
    };
    if (window.YT && window.YT.Player) {
      // If the YouTube Player API is already loaded, create the player immediately
      onYouTubeIframeAPIReady();
    } else {
      // Load the YouTube Player API script dynamically
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.id = 'youtube-api-script';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // Call the onYouTubeIframeAPIReady function once the script is loaded
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }

    // Cleanup
    return () => {
      if (player) {
        player.destroy();
      }
      document.getElementById('youtube-api-script')?.remove();
    };
  } catch (error) {
  console.log('error', error)
  }
  });


    function extractVideoId(url) {
      const pattern = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?=.*v=([^&\s]+)))|(?:youtu\.be\/([^&\s]+)))/;
      const match = url.match(pattern);
    
      if (match && match[1]) {
        // Matched YouTube video URL with query string
        return match[1];
      } else if (match && match[2]) {
        // Matched YouTube video URL without query string
        return match[2];
      } else {
        // Invalid YouTube video URL
        return null;
      }
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
  
    // const openModal = () => {
    //   setIsModalOpen(true);
    // };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  const openModal = () => {
    setIsModalOpen(true);
 
    let product = JSON.parse(sessionStorage.getItem("viewImage"));
    if(product.youtubeLink){
      youtubeLink= product.youtubeLink
     let videoId = extractVideoId(youtubeLink);
     console.log(videoId)
     setVideoId(videoId);
    }else {
      setIsModalOpen(false);
      Swal.fire({
        icon: "info",
        title: "Youtube Link Is Not There For This Product!",
      
      });
    }

  }

  // For Share Button
  const [showOptions, setShowOptions] = useState(false);
  const location = useLocation();

  const handleShareClick = () => {
    setShowOptions(!showOptions);
  };
  const [phoneNumber, setPhoneNumber] = useState("");
  const [smsModal, setSmsModal] = useState(false);
  const handleSmsClick = (event) => {
    setPhoneNumber(event.target.value);
  };

  const submitSms = (event) => {
    let doctorName = JSON.parse(sessionStorage.getItem("doctorName"));
    let product = JSON.parse(sessionStorage.getItem("viewImage"));

    event.preventDefault();
    axios
      .get("https://2factor.in/API/R1/", {
        params: {
          module: "TRANS_SMS",
          apikey: "48f6af5c-a0fd-11ec-a4c2-0200cd936042",
          to: phoneNumber,
          from: "PHAFFS",
          msg: `Hello ${doctorName}, Please click on the following link to view ${product.productName} info. Link: https://shorturl.at/bjRS1 -Sw by PHARMIT`,
        },
      })
      .then((response) => {
        // Handle successful response
        setEmail("");
        setSmsModal(false);
        Swal.fire({
          icon: "success",
          title: "SMS Sent!",
          text: "Your sms has been successfully sent.",
        });
        console.log("success", response.data);
      })
      .catch((error) => {
        // Handle error
        Swal.fire({
          icon: "error",
          title: "SMS Not Sent!",
          text: "Your sms has been Not Been sent.",
        });
        console.error("error", error);
      });
  };

  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var bodyFormData = new FormData();
    bodyFormData.append("sendEmailAPI", "true");
    bodyFormData.append("apiauth", "J3LX8NGi7UiKbbR8Jea9VBcH5r5W2qBSTasu7J2j");
    bodyFormData.append("toEmail", email);
    bodyFormData.append("fromEmail", "emailservice@pharmit.live");
    bodyFormData.append("fromName", "PharmIT");
    bodyFormData.append("emailSub", "subject");
    bodyFormData.append("emailBody", "body");
    bodyFormData.append("replyTo", "emailservice@pharmit.live");
    bodyFormData.append("replyToName", "PharmIT");

    axios
      .post("https://apcogsys.com/emailservice/email-api.php", { bodyFormData })
      .then((response) => {
        setEmail("");
        setShowModal(false);
        Swal.fire({
          icon: "success",
          title: "Email Sent!",
          text: "Your email has been successfully sent.",
        });
        console.log("email response", response);
      })
      .catch((error) => {
        // console.error(error);
        Swal.fire({
          icon: "error",
          title: "Email Not Sent!",
          text: "Your email has been Not Been sent.",
        });
      });
  };
  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        className="bg-gray-800 text-white p-2 rounded-full focus:outline-none"
        onClick={toggleOpen}>
        <BsThreeDotsVertical size={24} />
      </button>

      {isOpen && (
        <div className="absolute bottom-14 right-0 flex flex-col space-y-2 bg-transparent shadow-lg p-2 rounded-md">


{/* Youtube */}

<button
              onClick={openModal}
              className="flex items-center justify-center px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none">
              <ImYoutube2 size={30} className="mr-2" />
            </button>


            {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="relative">
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 m-4 text-white hover:text-gray-300 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="aspect-w-16 aspect-h-9">
              <div id="youtube-player" />
            </div>
          </div>
        </div>
      )}

          <button className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-gray-100 focus:outline-none">

            {/* Share Button */}

            <button
              onClick={handleShareClick}
              className="flex items-center justify-center px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none">
              <FiShare2 size={24} />
            </button>

            {showOptions && (
              <div className="absolute z-10 right-16 bottom-20 flex flex-col items-center justify-center bg-transparent rounded-md shadow-md p-4">
                <div className="mb-4">
                  {/* <QRCode
              value={location.href}
              size={128}
              bgColor="#FFFFFF"
              fgColor="#000000"
            //   logoImage={logoImage}
              logoWidth={48}
              logoHeight={48}
            /> */}
                </div>
                <div className="flex flex-col items-center justify-center">
                  {/* For SMS */}

                  <button
                    onClick={() => setSmsModal(true)}
                    className="flex items-center justify-center px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none">
                    <FaCommentAlt  size={20} className="mr-2" />
                  </button>
                  {smsModal && (
                    <div className="modal ">
                      <div className="modal-content mt-4">
                        <form onSubmit={submitSms}>
                          <label htmlFor="SMS-input">
                            <b>Phone Number</b>
                          </label>
                          <input
                            id="sms-input"
                            type="text"
                            value={phoneNumber}
                            onChange={handleSmsClick}
                            className="py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter email"
                          />
                          <div className="pt-2">
                            <button
                              type="submit"
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                              Send
                            </button>
                            <button
                              type="button"
                              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => setSmsModal(false)}>
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                  {/* SMS Ending */}
                  {/* <button onClick={() => setShowModal(true)} className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md">
              <FiMail size={20} className="mr-2" />         
            </button>
            {showModal && (
        <div className="modal ">
          <div className="modal-content mt-4">
            <form onSubmit={handleSubmit}>
              <label htmlFor="email-input"><b>Email</b></label>
              <input
                id="email-input"
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email"
              />
              <div className="pt-2">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" >Send</button>
              <button type="button" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )} */}
                </div>
              </div>
            )}
          </button>
          {/* Share Ens Here */}
          {/* More Facts Button */}
          <button
            onClick={handleButtonClick}
            className="flex items-center justify-center px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none">
            <HiInformationCircle className="mx-2" size={24} />
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={customModalStyles}
            contentLabel="More Facts Modal">
            <div className="text-center ">
              <h2 className="text-2xl font-bold mb-4">More Facts</h2>
              <div className=" grid grid-cols-2 gap-x-2 ">
                {Products.follow_image &&
                  Products.follow_image.split(",").map((record) => {
                    return (
                      <img
                        src={imagesFTPUrl + record}
                        alt=""
                        className="h-80 w-75 border-double border-4 border-pink"
                      />
                    );
                  })}
              </div>
              <button
                onClick={() => setModalIsOpen(false)}
                className="mt-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8 py-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ">
                Close
              </button>
            </div>
          </Modal>
          <ChatBox />
        </div>
      )}
    </div>
  );
};

export default MoreFactsButton;

