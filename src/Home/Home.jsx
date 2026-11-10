import { Box, Typography, Container, Chip } from "@mui/material";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

import HomeButton from "../componnents/HomeButton";
import { getCategories } from "../api/categories";

import paner from "../assets/paner.svg";

const categoryColors = [
  { background: "#F0E9FF", color: "#6B40CC" },
  { background: "#E5F3EE", color: "#287A58" },
  { background: "#FFF0E5", color: "#C46A32" },
  { background: "#E8F0FA", color: "#3C689C" },
  { background: "#FCE8ED", color: "#B84F70" },
  { background: "#F5F0DF", color: "#92752C" },
  { background: "#E8EDF0", color: "#526773" },
  { background: "#F1E9E3", color: "#986B4D" },
];

export default function Home() {
  const navigate = useNavigate();

  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 4,
          my: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            background:
              "linear-gradient(135deg, var(--primary), var(--secondry))",
            borderRadius: 2,
            p: { xs: 3, sm: 4, md: 5 },
            gap: { xs: 4, md: 3 },
            overflow: "hidden",
            width: "100%",
            boxSizing: "border-box",
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
                display: "flex",
                alignItems: "center",
                gap: 1,
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 6,
                p: 1,
                width: "fit-content",
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "var(--primary)",
                }}
              />
              <Typography color="white" fontSize={12}>
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
              Discover handcrafted home essentials, minimalist audio, and
              timeless wardrobe staples calibrated for quiet everyday luxury.
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
                borderRadius: 3,
              }}
            />
          </Box>
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: { xs: 11, sm: 12, md: 14 },
              fontWeight: 400,
              color: "var(--primary)",
            }}
          >
            EXPLORE DEPARTMENTS
          </Typography>
          <Box sx={{
            display: "flex", justifyContent: "space-between"
          }}>
            <Typography
              sx={{
                fontSize: { xs: 15, sm: 20, md: 30 },
                fontWeight: 600,
              }}
            >
              Shop by Category
            </Typography>
            <Typography
              onClick={() => navigate("/categories")}
              sx={{
                fontSize: { xs: 11, sm: 12, md: 14 },
                fontWeight: 400,
                color: "var(--primary)",
                cursor: "pointer",
                width: "fit-content",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              View all categories
            </Typography>
          </Box>


          <Typography
            sx={{
              fontSize: { xs: 10, sm: 12, md: 14 },
              color: "var(--span)",
            }}
          >
            Carefully organized capsules for every corner of your daily
            environment
          </Typography>
        </Box>

        {!isLoading && !isError && (
          <Box
            sx={{
              display: "flex",
              flexWrap: { xs: "nowrap", md: "wrap" },
              gap: 6,
              alignItems: "center",
              overflowX: { xs: "auto", md: "visible" },
              overflowY: "hidden",
              width: "100%",
              pb: { xs: 1, md: 0 },
              scrollbarWidth: { xs: "thin", md: "auto" },
              "&::-webkit-scrollbar": {
                height: { xs: "4px", md: 0 },
              },
            }}
          >
            {categories.map((category, index) => {
              const colors =
                categoryColors[index % categoryColors.length];

              return (
                <Chip
                  key={category.id}
                  label={category.name || `Category ${category.id}`}
                  clickable
                  onClick={() =>
                    navigate(`/categories/${category.id}`)
                  }
                  sx={{
                    flexShrink: 0,
                    backgroundColor: colors.background,
                    color: colors.color,
                    fontSize: { xs: 12, sm: 14 },
                    fontWeight: 600,
                    height: 42,
                    px: 1.5,
                    borderRadius: 3,
                    transition: "0.2s ease",
                    "&:hover": {
                      backgroundColor: colors.background,
                      filter: "brightness(0.95)",
                      transform: "translateY(-2px)",
                    },
                  }}
                />
              );
            })}
          </Box>
        )}
      </Box>
    </Container>
  );
}
