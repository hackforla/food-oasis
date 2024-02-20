import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { useFilterPanel } from "appReducer";
import AttributionInfo from "../AttributionInfo";

const overlay = {
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundColor: "transparent",
  zIndex: 1000,
  borderRadius: "10px",
};

const MobileLayout = ({ filters, map, list, showList }) => {
  const [position, setPosition] = useState();
  const filterPanelOpen = useFilterPanel();

  useEffect(() => {
    if (!showList) {
      setPosition({
        x: 0,
        y: 60 * (window.innerHeight / 100),
      });
    } else {
      setPosition({
        x: 0,
        y: 5,
      });
    }
  }, [showList]);
  useEffect(() => {
    if (filterPanelOpen) {
      setPosition({
        x: 0,
        y: window.innerHeight,
      });
    } else {
      setPosition({
        x: 0,
        y: 5,
      });
    }
  }, [filterPanelOpen]);

  // Define the bounds for vertical dragging
  const minY = 60;

  return (
    <>
      {filters}
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          position: "relative",
        }}
      >
        <Box sx={{ flex: 1 }}>{map}</Box>
        {list && (
          <Draggable
            position={position}
            onDrag={(e, ui) => {
              setPosition({ x: 0, y: ui.y });
            }}
            handle=".handle"
            bounds={{ top: 5, bottom: minY * (window.innerHeight / 100) }}
            defaultPosition={{ x: 0, y: minY * (window.innerHeight / 100) }}
            axis="y"
            sx={{
              marginTop: "20px",
              height: "10%",
              backgroundColor: "white",
            }}
          >
            <Box sx={overlay}>
              <Grid container spacing={0}>
                <Grid xs={6}>
                  <div>
                    <a
                      target="_blank"
                      rel="noopener nofollow noreferrer"
                      href="https://www.mapbox.com/"
                      aria-label="Mapbox logo"
                    >
                      <svg
                        width="88"
                        height="23"
                        viewBox="0 0 88 23"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        fillRule="evenodd"
                      >
                        <defs>
                          <path
                            id="logo"
                            d="M11.5 2.25c5.105 0 9.25 4.145 9.25 9.25s-4.145 9.25-9.25 9.25-9.25-4.145-9.25-9.25 4.145-9.25 9.25-9.25zM6.997 15.983c-.051-.338-.828-5.802 2.233-8.873a4.395 4.395 0 013.13-1.28c1.27 0 2.49.51 3.39 1.42.91.9 1.42 2.12 1.42 3.39 0 1.18-.449 2.301-1.28 3.13C12.72 16.93 7 16 7 16l-.003-.017zM15.3 10.5l-2 .8-.8 2-.8-2-2-.8 2-.8.8-2 .8 2 2 .8z"
                          />
                          <path
                            id="text"
                            d="M50.63 8c.13 0 .23.1.23.23V9c.7-.76 1.7-1.18 2.73-1.18 2.17 0 3.95 1.85 3.95 4.17s-1.77 4.19-3.94 4.19c-1.04 0-2.03-.43-2.74-1.18v3.77c0 .13-.1.23-.23.23h-1.4c-.13 0-.23-.1-.23-.23V8.23c0-.12.1-.23.23-.23h1.4zm-3.86.01c.01 0 .01 0 .01-.01.13 0 .22.1.22.22v7.55c0 .12-.1.23-.23.23h-1.4c-.13 0-.23-.1-.23-.23V15c-.7.76-1.69 1.19-2.73 1.19-2.17 0-3.94-1.87-3.94-4.19 0-2.32 1.77-4.19 3.94-4.19 1.03 0 2.02.43 2.73 1.18v-.75c0-.12.1-.23.23-.23h1.4zm26.375-.19a4.24 4.24 0 00-4.16 3.29c-.13.59-.13 1.19 0 1.77a4.233 4.233 0 004.17 3.3c2.35 0 4.26-1.87 4.26-4.19 0-2.32-1.9-4.17-4.27-4.17zM60.63 5c.13 0 .23.1.23.23v3.76c.7-.76 1.7-1.18 2.73-1.18 1.88 0 3.45 1.4 3.84 3.28.13.59.13 1.2 0 1.8-.39 1.88-1.96 3.29-3.84 3.29-1.03 0-2.02-.43-2.73-1.18v.77c0 .12-.1.23-.23.23h-1.4c-.13 0-.23-.1-.23-.23V5.23c0-.12.1-.23.23-.23h1.4zm-34 11h-1.4c-.13 0-.23-.11-.23-.23V8.22c.01-.13.1-.22.23-.22h1.4c.13 0 .22.11.23.22v.68c.5-.68 1.3-1.09 2.16-1.1h.03c1.09 0 2.09.6 2.6 1.55.45-.95 1.4-1.55 2.44-1.56 1.62 0 2.93 1.25 2.9 2.78l.03 5.2c0 .13-.1.23-.23.23h-1.41c-.13 0-.23-.11-.23-.23v-4.59c0-.98-.74-1.71-1.62-1.71-.8 0-1.46.7-1.59 1.62l.01 4.68c0 .13-.11.23-.23.23h-1.41c-.13 0-.23-.11-.23-.23v-4.59c0-.98-.74-1.71-1.62-1.71-.85 0-1.54.79-1.6 1.8v4.5c0 .13-.1.23-.23.23zm53.615 0h-1.61c-.04 0-.08-.01-.12-.03-.09-.06-.13-.19-.06-.28l2.43-3.71-2.39-3.65a.213.213 0 01-.03-.12c0-.12.09-.21.21-.21h1.61c.13 0 .24.06.3.17l1.41 2.37 1.4-2.37a.34.34 0 01.3-.17h1.6c.04 0 .08.01.12.03.09.06.13.19.06.28l-2.37 3.65 2.43 3.7c0 .05.01.09.01.13 0 .12-.09.21-.21.21h-1.61c-.13 0-.24-.06-.3-.17l-1.44-2.42-1.44 2.42a.34.34 0 01-.3.17zm-7.12-1.49c-1.33 0-2.42-1.12-2.42-2.51 0-1.39 1.08-2.52 2.42-2.52 1.33 0 2.42 1.12 2.42 2.51 0 1.39-1.08 2.51-2.42 2.52zm-19.865 0c-1.32 0-2.39-1.11-2.42-2.48v-.07c.02-1.38 1.09-2.49 2.4-2.49 1.32 0 2.41 1.12 2.41 2.51 0 1.39-1.07 2.52-2.39 2.53zm-8.11-2.48c-.01 1.37-1.09 2.47-2.41 2.47s-2.42-1.12-2.42-2.51c0-1.39 1.08-2.52 2.4-2.52 1.33 0 2.39 1.11 2.41 2.48l.02.08zm18.12 2.47c-1.32 0-2.39-1.11-2.41-2.48v-.06c.02-1.38 1.09-2.48 2.41-2.48s2.42 1.12 2.42 2.51c0 1.39-1.09 2.51-2.42 2.51z"
                          />
                        </defs>
                        <mask id="clip">
                          <rect
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                            fill="white"
                          />
                          <use xlinkHref="#logo" />
                          <use xlinkHref="#text" />
                        </mask>

                        <g
                          id="outline"
                          opacity="0.3"
                          stroke="#000"
                          strokeWidth="3"
                        >
                          <circle
                            mask="url(#clip)"
                            cx="11.5"
                            cy="11.5"
                            r="9.25"
                          />
                          <use xlinkHref="#text" mask="url(#clip)" />
                        </g>
                        <g id="fill" opacity="0.9" fill="#fff">
                          <use xlinkHref="#logo" />
                          <use xlinkHref="#text" />
                        </g>
                      </svg>
                    </a>
                  </div>
                </Grid>
                <Grid xs={6}>
                  <AttributionInfo />
                </Grid>
              </Grid>
              <Box
                sx={{
                  width: "100vw",
                  backgroundColor: "white",
                }}
              >
                <Box
                  className="handle"
                  sx={{
                    height: 42,
                    width: "90vw",
                    paddingTop: "8px",
                    marginX: "auto",
                    borderBottom: "1px solid #000",
                    backgroundColor: "white",
                  }}
                >
                  <Box
                    sx={{
                      width: 120,
                      height: 5,
                      margin: "0 auto",
                      background: "#D9D9D9",
                      borderRadius: "20px",
                    }}
                  ></Box>
                </Box>
              </Box>
              <Box
                sx={{
                  backgroundColor: "white",
                  height: "100vh",
                  width: "100vw",
                }}
              >
                {list}
              </Box>
            </Box>
          </Draggable>
        )}
      </Box>
    </>
  );
};

export default MobileLayout;
