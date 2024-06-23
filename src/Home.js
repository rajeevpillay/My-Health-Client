// import React, { useState } from "react";
// import axios from "axios";
// import {
//   Container,
//   Box,
//   Button,
//   Typography,
//   Input,
//   styled,
// } from "@mui/material";

// const HomeContainer = styled(Box)(({ theme }) => ({
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   gap: theme.spacing(2),
//   backgroundColor: "#fff",
//   padding: theme.spacing(4),
//   borderRadius: theme.shape.borderRadius,
//   boxShadow: "0px 3px 6px rgba(0,0,0,0.16)",
// }));

// const Background = styled(Box)({
//   background: "linear-gradient(135deg, #6D5BBA 0%, #8D58BF 100%)",
//   height: "100vh",
//   width: "100vw",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   margin: 0,
// });

// const HomeButton = styled(Button)({
//   background: "linear-gradient(90deg, #3b82f6, #9333ea)",
//   color: "#fff",
//   padding: "10px 10px",
//   margin: "10px 10px",
// });

// function Home() {
//   const [image, setImage] = useState(null);
//   const [s3File, setFile] = useState(null);
//   const [preview, setPreview] = useState("");
//   // const [isFileUploaded, setIsFileUploaded] = useState(false)

//   const handleImageChange = (e) => {
//     const file = e.currentTarget.files[0];
//     if (file) {
//       setImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//       setFile(file);
//     } else {
//       setImage(null);
//       setPreview("");
//     }
//   };
//   const handleFileSubmit = async (e) => {
//     console.log(Object.keys(s3File));
//     // console.log(e.currentTarget);
//     // console.log(e.currentTarget.files);
//     // console.log(e.currentTarget.files[0]);
//     console.log(s3File);
//     e.preventDefault();
//     //const file = e.target.files;
//     const formData = new FormData();
//     if (s3File) {
//       formData.append("file", s3File);
//     }

//     try {
//       const response = await axios.post(
//         `http://localhost:4000/upload`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const handleSubmit = (e) => {
//     console.log("Submitting:", image);
//     console.log();
//     // Here you would typically handle the image submission to a backend
//     // axios.post("http://localhost:4000/image-upload", {
//     //   //ADD AXIOS POST REQUEST
//     //   value: "This is my awesome test value!",
//     // });
//     //alert("Image submitted successfully!");
//     handleFileSubmit(e);
//   };

//   const handleDelete = () => {
//     setImage(null);
//     setPreview("");
//     setFile(null);
//   };

//   return (
//     <Background>
//       <Container maxWidth="xs">
//         <HomeContainer>
//           <Typography variant="h4" component="h1" gutterBottom>
//             Welcome Home!
//           </Typography>
//           <Input
//             type="file"
//             onChange={handleImageChange}
//             accept="image/*"
//             className="home-input"
//             fullWidth
//           />
//           {preview && (
//             <Box className="home-preview" textAlign="center">
//               <Typography variant="h6" component="h2">
//                 Preview:
//               </Typography>
//               <img
//                 src={preview}
//                 alt="Preview"
//                 style={{ maxWidth: "100%", maxHeight: "300px" }}
//               />
//               <Box mt={2}>
//                 <HomeButton
//                   style={{
//                     padding: "10px 10px 10px 0px",
//                     margin: "10px 10px 10px 0px",
//                   }}
//                   onClick={handleFileSubmit}
//                 >
//                   Submit
//                 </HomeButton>
//                 <HomeButton
//                   style={{
//                     padding: "10px 10px 10px 0px",
//                     margin: "10px 10px 10px 0px",
//                   }}
//                   onClick={handleDelete}
//                 >
//                   Delete
//                 </HomeButton>
//               </Box>
//             </Box>
//           )}
//         </HomeContainer>
//       </Container>
//     </Background>
//   );
// }

// export default Home;
// src/Home.js
import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Box,
  Button,
  Typography,
  Input,
  styled,
} from "@mui/material";
import Popup from "./Popup";

const HomeContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
  backgroundColor: "#fff",
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0px 3px 6px rgba(0,0,0,0.16)",
}));

const Background = styled(Box)({
  background: "linear-gradient(135deg, #6D5BBA 0%, #8D58BF 100%)",
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: 0,
});

const HomeButton = styled(Button)({
  background: "linear-gradient(90deg, #3b82f6, #9333ea)",
  color: "#fff",
  padding: "10px 10px",
  margin: "10px 10px",
});

function Home() {
  const [image, setImage] = useState(null);
  const [s3File, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFile(file);
    } else {
      setImage(null);
      setPreview("");
    }
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (s3File) {
      formData.append("file", s3File);
    }

    try {
      const response2 = await axios.post(
        `http://localhost:4000/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const response = {
        message: "Document analyzed, transformed, and inferred successfully",
        inference:
          "Dear patient, I have summarized the information from your medical chart for you:  Your name is not mentioned in the chart.  You are a male, and your age is not specified.  Your contact number is 138-000-111.  Your insurance company is Caritas Insurance, and your policy number is not mentioned.  Your current health status shows that your blood pressure is 120/80 mmHg, your heart rate is 70 beats per minute, your temperature is 98.6 degrees Fahrenheit, and your breathing rate is 16 breaths per minute. Your oxygen level is 98.  You have reported experiencing pain for the past week.  Your medical history is not provided, and there are no known allergies listed. In simple terms, your blood pressure and breathing rate are within normal ranges, and your heart rate and oxygen level are slightly above normal. However, the main concern is the pain that you have been experiencing for the past week. Your medical history and any allergies you might have are not available in the chart. We will continue to investigate the cause of your pain and provide you with the necessary care. If you have any further concerns or questions, please let us know. We are here to help you.",
      };
      console.log(response);
      setResponseMessage(response.inference); // Assuming 'message' is the key in the response
      setPopupOpen(true); // Open popup after setting the message
    } catch (error) {
      console.error(error);
      setResponseMessage("An error occurred");
      setPopupOpen(true);
    }
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };
  const handleDelete = () => {
    setImage(null);
    setPreview("");
    setFile(null);
  };
  return (
    <Background>
      <Container maxWidth="xs">
        <HomeContainer>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome Home!
          </Typography>
          <Input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="home-input"
            fullWidth
          />
          {preview && (
            <Box className="home-preview" textAlign="center">
              <Typography variant="h6" component="h2">
                Preview:
              </Typography>
              <img
                src={preview}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: "300px" }}
              />
              <Box mt={2}>
                <HomeButton onClick={handleFileSubmit}>Submit</HomeButton>
                <HomeButton onClick={handleDelete}>Delete</HomeButton>
              </Box>
            </Box>
          )}
          <Popup
            open={popupOpen}
            handleClose={handleClosePopup}
            message={responseMessage}
          />
        </HomeContainer>
      </Container>
    </Background>
  );
}

export default Home;
