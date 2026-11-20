import { Chip } from "@mui/material";
import { useNavigate } from "react-router";

export default function CatogoriesUi({ category, colors }) {
  const navigate = useNavigate();

  return (
    <Chip
      key={category.id}
      label={category.name || `Category ${category.id}`}
      clickable
      onClick={() => navigate(`/categories/${category.id}`)}
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
}