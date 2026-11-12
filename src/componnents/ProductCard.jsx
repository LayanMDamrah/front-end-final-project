import { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  IconButton,
  Rating,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";

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
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name || `Product ${product.id}`}
          sx={{
            height: 160,
            borderRadius: 3,
            objectFit: "cover",
          }}
        />

        <IconButton
          onClick={() => setIsFavorite(!isFavorite)}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(255,255,255,0.9)",
            width: 34,
            height: 34,
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
      </Box>

      <CardContent sx={{ p: 0, pt: 1.5, "&:last-child": { pb: 0 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
          <Rating
            value={Number(product.rate) || 0}
            precision={0.1}
            readOnly
            size="small"
            sx={{ color: "#D99100", fontSize: 17 }}
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

          <IconButton
            onClick={() => onAdd?.(product)}
            sx={{
              backgroundColor: "#00796B",
              color: "white",
              width: 38,
              height: 38,
              "&:hover": {
                backgroundColor: "#005F54",
              },
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}
