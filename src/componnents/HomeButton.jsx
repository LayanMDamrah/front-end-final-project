import { Button } from "@mui/material";

export default function HomeButton({
  children,
  variant = "primary",
  onClick,
}) {
  const isPrimary = variant === "primary";

  return (
    <Button
      onClick={onClick}
      sx={{
        backgroundColor: isPrimary
          ? "white"
          : "rgba(255, 255, 255, 0.2)",

        color: isPrimary ? "var(--primary)" : "white",

        border: isPrimary
          ? "none"
          : "1px solid rgba(255,255,255,0.3)",

        borderRadius: 2,
        px: 3,
        py: 2,
        width: "fit-content",
        flexShrink: 0,
        textTransform: "none",
        fontSize: 16,
        fontWeight: 600,

        backdropFilter: "blur(10px)",

        "&:hover": {
          backgroundColor: isPrimary
            ? "#f0f0f0"
            : "rgba(255,255,255,0.3)",
        },
      }}
    >
      {children}
    </Button>
  );
}