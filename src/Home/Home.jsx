import { Box, Typography } from "@mui/material";
import HomeButton from "../componnents/HomeButton";
import { useNavigate } from "react-router";
import paner from "../assets/paner.svg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        background:
          "linear-gradient(135deg, var(--primary), var(--secondry))",
        mx: { xs: 2, sm: 3, md: 6 },
        my: { xs: 2, md: 4 },
        borderRadius: 2,
        p: { xs: 3, sm: 4, md: 5 },
        gap: { xs: 4, md: 3 },
        overflow: "hidden",
      }}
    >

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >

        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: 6,
            p: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
            width: "fit-content",
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              borderRadius: 50,
              backgroundColor: "var(--primary)",
              height: 10,
              width: 10,
            }}
          />

          <Typography sx={{ color: "white" }}>
            AUTUMN EDITION 2025
          </Typography>
        </Box>

  
        <Typography
          sx={{
            fontSize: { xs: 30, sm: 36, md: 40 },
            color: "white",
            maxWidth: 400,
            mt: 2,
          }}
        >
          Curated Design For Modern Living
        </Typography>


        <Typography
          sx={{
            maxWidth: 500,
            py: 2,
            color: "white",
            fontSize: { xs: 14, sm: 16 },
          }}
        >
          Discover handcrafted home essentials, minimalist audio,
          and timeless wardrobe staples calibrated for quiet
          everyday luxury.
        </Typography>

   
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <HomeButton
            variant="primary"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </HomeButton>

          <HomeButton
            variant="secondary"
            onClick={() => navigate("/categories")}
          >
            Explore Collection
          </HomeButton>
        </Box>
      </Box>

  
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src={paner}
          alt="Autumn Collection"
          sx={{
            width: "100%",
            maxWidth: 500,
            maxHeight: { xs: 250, sm: 320, md: 380 },
            objectFit: "contain",
            objectPosition: "bottom",
            display: "block",
            borderRadius:3
          }}
        />
      </Box>
    </Box>
  );
}
