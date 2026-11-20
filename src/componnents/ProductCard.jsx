import { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  IconButton,
  Rating,
  CardActionArea,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router";

export default function ProductCard({ product, onAdd }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 270,
        borderRadius: 4,
        p: 1.5,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        position: "relative",
      }}
    >
      <CardActionArea
        component={Link}
        to={`/products/${product.id}`}
        sx={{
          borderRadius: 3,
          textAlign: "left",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.name}
            sx={{
              height: 250,
              borderRadius: 3,
              objectFit: "fill",
            }}
          />
        </Box>

        <CardContent
          sx={{
            p: 0,
            pt: 1.5,
            width: "100%",
            "&:last-child": { pb: 0 },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
            <Rating
              value={Number(product.rate)}
              precision={0.1}
              readOnly
              size="small"
              sx={{ color: "#f0a40d", fontSize: 17 }}
            />

            <Typography fontSize={11} fontWeight={600}>
              {product.rate}
            </Typography>
          </Box>

          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
              mt: 0.5,
              mb: 1.5,
            }}
          >
            {product.name || `Product ${product.id}`}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography fontSize={19} fontWeight={700}>
              ${product.price}
            </Typography>

            <Box sx={{ width: 38, height: 38 }} />
          </Box>
        </CardContent>
      </CardActionArea>

      <IconButton
        onClick={() => setIsFavorite(!isFavorite)}
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          backgroundColor: "rgba(255,255,255,0.9)",
          width: 34,
          height: 34,
          zIndex: 2,
          "&:hover": {
            backgroundColor: "white",
          },
        }}
      >
        {isFavorite ? (
          <FavoriteIcon sx={{ color: "#D32F2F", fontSize: 19 }} />
        ) : (
          <FavoriteBorderIcon sx={{ fontSize: 19 }} />
        )}
      </IconButton>

      <IconButton
        onClick={() => onAdd?.(product)}
        sx={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: "var(--primary)",
          color: "white",
          width: 38,
          height: 38,
          zIndex: 2,
          "&:hover": {
            backgroundColor: "var(--nav-text)",
          },
        }}
      >
        <AddIcon />
      </IconButton>
    </Card>
  );
}
