import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainImage from "../../assets/HomePageImages/Banner.svg";
import { useFetchAllUsers } from "../Hooks/GetAllUsers";
import { useFetchAllClasses } from "../Hooks/getAllClasses";
import { Box, Grid, Typography } from "@mui/material";
import AboutImageOne from "../../assets/HomePageImages/AboutImageOne.svg";
import AboutImageTwo from "../../assets/HomePageImages/AboutImageTwo.svg";
import AboutImageThree from "../../assets/HomePageImages/AboutImageThree.svg";
import BackgroundPattern from "../../assets/HomePageImages/BackgroundPattern.svg";

function Home() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const {
    data: getAllUsers,
    isLoading: getusersLoading,
    refetch: refetchUsers,
  } = useFetchAllUsers();

  const isVerified = getAllUsers?.isVerified;

  const {
    data: allClasses,
    isLoading: classesLoading,
    refetch: refetchClasses,
  } = useFetchAllClasses();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isVerified === false) {
          navigate("/");
        } else {
          // Assuming getAllUsers makes the API call internally
          const usersData = await getAllUsers();
          setUsers(usersData); // Update state with user data
          console.log(usersData);
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchData();
  }, [isVerified, navigate, getAllUsers]);

  return (
    <React.Fragment>
      <Box sx={{ background: "#FBFFFE", overflow: "hidden" }}>
        <Box
          sx={{
            backgroundImage: `url(${MainImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "80vh",
            width: "100%",
            position: "relative",
            color: "white",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Inter",
              fontSize: "70px",
              fontWeight: 800,
              letterSpacing: "0em",
              textAlign: "center",
              color: "#FFFFFF", // Text color
              width: "600px",
              position: "relative",
              textShadow:
                "-7px 7px 0 rgba(23, 29, 36, 1), -7.1px 7.1px 0 rgba(255, 255, 255, 1)",
              lineHeight: "95px",
            }}
          >
            Keep Your Body Fit & Strong
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "auto",
              height: "50px",
              mt: "20px",
              gap: "10px",
            }}
          >
            <Box sx={ButtonStyle}>Start Today</Box>
            <Box sx={ButtonStyle} onClick={() => navigate("/about")}>
              About Us
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            background: "#FBFFFE",
            height: "auto",
            width: "80%",
            mx: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              height: "300px",
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: "80%",
              }}
            >
              <Typography
                sx={{
                  fontFamilu: "poppins",
                  color: "#524FF5",
                  fontSize: "16px",
                  fontWeight: 600,
                  letterSpacing: "5px",
                  textTransform: "uppercase",
                }}
              >
                our fitness training
              </Typography>
              <Typography
                sx={{
                  fontFamilu: "poppins",
                  color: "#000",
                  fontSize: "35px",
                  fontWeight: 700,
                }}
              >
                Upcoming Classes
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  position: "absolute",
                  right: "-25%",
                  fontFamily: "poppins",
                  fontSize: "230px",
                  fontWeight: 800,
                  color: "#FBFFFE",
                  backgroundColor: "transparent",
                  textShadow: `
      -1px -1px 0 #E3E3E3,  
       1px -1px 0 #E3E3E3,
      -1px  1px 0 #E3E3E3,
       1px  1px 0 #E3E3E3`,
                }}
              >
                CLASSES
              </Typography>
              <Box
                sx={{
                  position: "absolute",
                  right: "2.5%",
                  fontFamily: "poppins",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#FBFFFE",
                  background: "#1C2229",
                  width: "150px",
                  height: "50px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:hover": {
                    background: "transparent",
                    cursor: "pointer",
                    color: "#1B1B1E",
                    border: "1px solid #1B1B1E",
                    backdropFilter: "blur(10px)",
                  },
                }}
                onClick={() => navigate("/classes")}
              >
                More Class
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              width: "100%",
              height: "auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: "150px",
            }}
          >
            {allClasses?.slice(0, 3)?.map((item, index) => {
              console.log(item);
              return (
                <Box
                  sx={{
                    width: "30%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    // padding: "20px",
                  }}
                  key={index}
                >
                  <Box
                    component='img'
                    src={item?.image}
                    sx={{ height: "320px", width: "auto" }}
                  />
                  <Box
                    sx={{
                      width: "92%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamilu: "poppins",
                        color: "#000",
                        fontSize: "24px",
                        fontWeight: 700,
                      }}
                    >
                      {item?.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "poppins",
                        color: "#000",
                        fontSize: "16px",
                        fontWeight: 500,
                        width: "100%",
                        whiteSpace: "pre-line", // CSS property to collapse whitespace and preserve newlines
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxHeight: "50px",
                        lineHeight: "24px", // Ensure the line height is consistent
                      }}
                    >
                      {item?.description.length > 170
                        ? `${item?.description.substring(0, 170)}...`
                        : item?.description}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box
          sx={{
            background: "#1C2229",
            width: "100%",
            height: "100px",
            display: "flex",
            overflow: "hidden", // Hide the overflowed text
            position: "relative", // For the absolute positioning of the child
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "poppins",
              fontSize: "50px",
              color: "#FBFFFE",
              textTransform: "uppercase",
              fontWeight: 600,
              letterSpacing: "10px",
              whiteSpace: "nowrap", // Ensure text is in one line
              animation: "marquee 20s linear infinite", // Adjust duration as needed
              "@keyframes marquee": {
                "0%": { transform: "translateX(100%)" },
                "100%": { transform: "translateX(-100%)" },
              },
            }}
          >
            focus on your{" "}
            <span
              style={{
                // position: "absolute",
                // width: "100%",
                // height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "poppins",
                fontSize: "50px",
                color: "#A1F65E",
                textTransform: "uppercase",
                fontWeight: 600,
                letterSpacing: "10px",
              }}
            >
              &nbsp; fitness &nbsp;
            </span>{" "}
            not your loss
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "auto",
            width: "80%",
            mx: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              height: "300px",
              position: "relative",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontFamilu: "poppins",
                  color: "#524FF5",
                  fontSize: "16px",
                  fontWeight: 600,
                  letterSpacing: "5px",
                  textTransform: "uppercase",
                }}
              >
                About
              </Typography>
              <Typography
                sx={{
                  fontFamilu: "poppins",
                  color: "#000",
                  fontSize: "35px",
                  fontWeight: 700,
                  lineHeight: "40px",
                }}
              >
                Respect your body, <br /> it's the only one you get
              </Typography>
              <Typography
                sx={{
                  fontFamilu: "poppins",
                  color: "#6A6A6A",
                  fontSize: "16px",
                  fontWeight: 500,
                  width: "40%",
                  lineHeight: "20px",
                  mt: "20px",
                }}
              >
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                point of using Lorem Ipsum is
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  position: "absolute",
                  right: "-5%",
                  fontFamily: "poppins",
                  fontSize: "230px",
                  fontWeight: 800,
                  color: "#FBFFFE",
                  background: "transparent",
                  textShadow: `
      -1px -1px 0 #E3E3E3,  
       1px -1px 0 #E3E3E3,
      -1px  1px 0 #E3E3E3,
       1px  1px 0 #E3E3E3`,
                }}
              >
                About
              </Typography>
            </Box>
          </Box>

          <Grid
            container
            sx={{
              pb: "100px",
            }}
          >
            <Grid
              item
              xl={6}
              lg={6}
              md={6}
              sm={6}
              xs={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "20px",
                // padding: "20px",
              }}
            >
              {" "}
              <Box
                sx={{
                  background: "#F3F3F3",
                  width: "90%",
                  display: "flex",
                  padding: "20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    width: "100%",
                    padding: "20px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamilu: "poppins",
                      color: "#000",
                      fontSize: "26px",
                      fontWeight: 700,
                    }}
                  >
                    Motivation
                  </Typography>
                  <Typography
                    sx={{
                      fontFamilu: "poppins",
                      color: "#6A6A6A",
                      fontSize: "16px",
                      fontWeight: 500,
                      width: "auto",
                      lineHeight: "20px",
                    }}
                  >
                    It is a long established fact that a reader will be
                    distracted
                  </Typography>
                </Box>
                <Box
                  component='img'
                  src={AboutImageOne}
                  sx={{
                    height: "130px",
                    width: "auto",
                  }}
                />
              </Box>
              <Box
                sx={{
                  background: "#F3F3F3",
                  width: "90%",
                  display: "flex",
                  padding: "20px",
                }}
              >
                <Box
                  component='img'
                  src={AboutImageTwo}
                  sx={{
                    height: "130px",
                    width: "auto",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    width: "80%",
                    padding: "20px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamilu: "poppins",
                      color: "#000",
                      fontSize: "26px",
                      fontWeight: 700,
                    }}
                  >
                    Inspire
                  </Typography>
                  <Typography
                    sx={{
                      fontFamilu: "poppins",
                      color: "#6A6A6A",
                      fontSize: "16px",
                      fontWeight: 500,
                      width: "auto",
                      lineHeight: "20px",
                    }}
                  >
                    It is a long established fact that a reader will be
                    distracted
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
              {" "}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <Box
                  component='img'
                  src={BackgroundPattern}
                  sx={{
                    position: "absolute",
                    height: "500px",
                    width: "auto",
                    top: "-130px",
                  }}
                />
                <Box
                  component='img'
                  src={AboutImageThree}
                  sx={{
                    position: "absolute",
                    height: "465px",
                    top: "0",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            height: "100px",
          }}
        ></Box>
      </Box>
    </React.Fragment>
  );
}

export default Home;

const ButtonStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "poppins",
  fontSize: "18px",
  fontWeight: 500,
  width: "180px",
  height: "50px",
  border: "2px solid #FBFFFE",
  background: "transparent",
  color: "#FBFFFE",
  "&:hover": {
    border: "2px solid transparent",
    background: "#A1F65E",
    color: "#1B1B1E",
    cursor: "pointer",
  },
};
