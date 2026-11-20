
import {
  Box,
  Typography,
  Rating,
  Avatar,
  Stack,
} from "@mui/material";

import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "?";

const timeAgo = (date) => {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";

  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);

  const units = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];

  for (const [unit, secs] of units) {
    const value = Math.floor(seconds / secs);

    if (value >= 1) {
      return `${value} ${unit}${value > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
};

export default function ReviewItem({ review }) {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: 4,
        boxShadow: "0 3px 15px rgba(0,0,0,0.04)",
        p: { xs: 2, md: 2.5 },
        display: "flex",
        gap: 2,
        alignItems: "flex-start",
      }}
    >
      <Avatar
        sx={{
          width: 40,
          height: 40,
          fontSize: 14,
          fontWeight: 600,
          backgroundColor: "#E6ECF5",
          color: "var(--span)",
        }}
      >
        {getInitials(review.userName)}
      </Avatar>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              flexWrap="wrap"
            >
              <Typography
                fontSize={14}
                fontWeight={700}
                color="var(--head-color)"
              >
                {review.userName || "Anonymous"}
              </Typography>

              {review.verified === true && (
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    backgroundColor: "#E8F7F5",
                    color: "var(--nav-text)",
                    px: 1,
                    py: 0.25,
                    borderRadius: 5,
                  }}
                >
                  <VerifiedOutlinedIcon sx={{ fontSize: 12 }} />

                  <Typography fontSize={10} fontWeight={600}>
                    Verified Buyer
                  </Typography>
                </Box>
              )}
            </Stack>

            <Typography fontSize={11} color="var(--neutral)">
              {timeAgo(review.createdAt)}
            </Typography>
          </Box>

          <Rating
            value={Number(review.rating)}
            readOnly
            size="small"
            sx={{ color: "var(--tertiary)" }}
          />
        </Box>

        {review.comment && (
          <Typography
            fontSize={13}
            color="var(--head-color)"
            sx={{
              mt: 1.5,
              lineHeight: 1.7,
            }}
          >
            “{review.comment}”
          </Typography>
        )}
      </Box>
    </Box>
  );
}
