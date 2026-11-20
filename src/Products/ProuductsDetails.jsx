import { useState } from "react";
import { useParams, Link } from "react-router";
import UseProductsDetails from "../hooks/UseProductsDetails";

import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Rating,
  Button,
  IconButton,
  Divider,
  CircularProgress,
  Stack,
  LinearProgress,
  Avatar,
  InputBase,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CheckIcon from "@mui/icons-material/Check";

const MAX_COMMENT_LENGTH = 500;

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

export default function ProductsDetails({
  onAdd,
  onBuyNow,
  onSubmitReview,
}) {
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const [newRating, setNewRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, isPending, isError } = UseProductsDetails(id);

  if (isPending) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress sx={{ color: "var(--primary)" }} />
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography color="error" textAlign="center">
          Failed to load product details.
        </Typography>
      </Container>
    );
  }

  const product = data.response ?? data;
  const reviews = product.reviews || [];

  const stock = Number(product.quantity) || 0;
  const rate = Number(product.rate) || 0;

  const productName = product.name || `Product ${product.id}`;

  const maxQuantity = stock;

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter(
      (review) => Number(review.rating) === star
    ).length,
  }));

  const totalReviews = reviews.length;

  const canSubmit =
    newRating > 0 && comment.trim().length > 0 && !isSubmitting;

  const handleSubmitReview = async () => {
    if (!canSubmit) return;

    try {
      setIsSubmitting(true);

      await onSubmitReview?.({
        productId: product.id,
        rating: newRating,
        comment: comment.trim(),
      });

      setNewRating(0);
      setComment("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F6F9FF",
        minHeight: "100vh",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 3, md: 5 },
        }}
      >
        {/* Breadcrumbs */}
        <Breadcrumbs separator="/" sx={{ mb: 3 }}>
          <Typography
            component={Link}
            to="/home"
            sx={{
              color: "var(--neutral)",
              textDecoration: "none",
              fontSize: 13,
              "&:hover": {
                color: "var(--primary)",
              },
            }}
          >
            Home
          </Typography>

          <Typography
            component={Link}
            to="/products"
            sx={{
              color: "var(--neutral)",
              textDecoration: "none",
              fontSize: 13,
              "&:hover": {
                color: "var(--primary)",
              },
            }}
          >
            Products
          </Typography>

          <Typography
            sx={{
              color: "var(--nav-text)",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {productName}
          </Typography>
        </Breadcrumbs>

        {/* Main Product Layout */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "0.85fr 1.15fr",
            },
            gap: { xs: 2, md: 2.5 },
            alignItems: "start",
          }}
        >
          {/* Product Image */}
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: 4,
              boxShadow: "0 3px 15px rgba(0,0,0,0.04)",
              p: 2,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              onClick={() => setIsFavorite(!isFavorite)}
              aria-label="Add to favorites"
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                backgroundColor: "#F6F9FF",
                color: isFavorite ? "#D32F2F" : "var(--neutral)",
                zIndex: 1,
                "&:hover": {
                  backgroundColor: "#E8F7F5",
                },
              }}
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>

            <Box
              component="img"
              src={product.image}
              alt={productName}
              sx={{
                width: "100%",
                maxWidth: 320,
                height: 320,
                objectFit: "contain",
                borderRadius: 3,
              }}
            />
          </Box>

          {/* Product Info */}
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: 4,
              boxShadow: "0 3px 15px rgba(0,0,0,0.04)",
              p: { xs: 2.5, md: 3.5 },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
                mb: 1.5,
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#E8F7F5",
                  color: "var(--nav-text)",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 5,
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                PRODUCT DETAILS
              </Box>

              <Typography fontSize={11} color="var(--neutral)">
                SKU: {product.id}
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: { xs: 25, md: 32 },
                fontWeight: 750,
                color: "var(--head-color)",
                lineHeight: 1.2,
                mb: 1,
              }}
            >
              {productName}
            </Typography>

            {/* Product Rating */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 2.5, flexWrap: "wrap" }}
            >
              <Rating
                value={rate}
                precision={0.1}
                readOnly
                size="small"
                sx={{ color: "var(--tertiary)" }}
              />

              <Typography
                fontSize={13}
                fontWeight={700}
                color="var(--head-color)"
              >
                {rate.toFixed(1)}
              </Typography>

              <Typography fontSize={11} color="var(--neutral)">
                ({totalReviews} customer reviews)
              </Typography>
            </Stack>

            {/* Price */}
            <Box
              sx={{
                backgroundColor: "#F6F9FF",
                borderRadius: 3,
                px: 2,
                py: 1.5,
                mb: 2.5,
              }}
            >
              <Typography
                fontSize={{ xs: 30, md: 36 }}
                fontWeight={800}
                color="var(--head-color)"
              >
                ${product.price}
              </Typography>
            </Box>

            {/* Stock */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2.5,
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor:
                    stock > 0 ? "var(--primary)" : "#D32F2F",
                  flexShrink: 0,
                }}
              />

              <Typography fontSize={13} color="var(--head-color)">
                {stock > 0 ? (
                  <>
                    In stock —{" "}
                    <Box
                      component="span"
                      sx={{
                        color: "var(--primary)",
                        fontWeight: 700,
                      }}
                    >
                      {stock} units
                    </Box>{" "}
                    available
                  </>
                ) : (
                  "Out of stock"
                )}
              </Typography>
            </Box>

            {/* Description */}
            <Typography
              sx={{
                color: "var(--span)",
                fontSize: 14,
                lineHeight: 1.8,
                mb: 3,
              }}
            >
              {product.description ||
                "No description available for this product."}
            </Typography>

            {/* Quantity */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1.5,
                mb: 2.5,
              }}
            >
              <Typography
                fontSize={13}
                fontWeight={600}
                color="var(--head-color)"
              >
                Quantity
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  backgroundColor: "#E8F7F5",
                  p: 0.5,
                  borderRadius: 2,
                }}
              >
                <IconButton
                  size="small"
                  disabled={quantity <= 1}
                  onClick={() =>
                    setQuantity((prev) => Math.max(1, prev - 1))
                  }
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 1.5,
                    color: "var(--nav-text)",
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>

                <Typography
                  sx={{
                    minWidth: 32,
                    textAlign: "center",
                    fontWeight: 700,
                    fontSize: 14,
                    color: "var(--head-color)",
                  }}
                >
                  {quantity}
                </Typography>

                <IconButton
                  size="small"
                  disabled={quantity >= maxQuantity}
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.min(prev + 1, maxQuantity)
                    )
                  }
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 1.5,
                    color: "var(--nav-text)",
                  }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* Buttons */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                },
                gap: 1.5,
                mb: 2.5,
              }}
            >
              <Button
                disabled={stock <= 0}
                variant="contained"
                startIcon={<ShoppingBagOutlinedIcon />}
                onClick={() => onAdd?.(product, quantity)}
                sx={{
                  backgroundColor: "var(--primary)",
                  color: "white",
                  borderRadius: 2.5,
                  py: 1.5,
                  fontSize: 13,
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "var(--nav-text)",
                    boxShadow: "none",
                  },
                }}
              >
                Add to Cart
              </Button>

              <Button
                disabled={stock <= 0}
                variant="contained"
                onClick={() => onBuyNow?.(product, quantity)}
                sx={{
                  backgroundColor: "var(--nav-text)",
                  color: "white",
                  borderRadius: 2.5,
                  py: 1.5,
                  fontSize: 13,
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "var(--neutral)",
                    boxShadow: "none",
                  },
                }}
              >
                Buy Now
              </Button>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Stack direction="row" flexWrap="wrap" gap={2}>
              <Typography fontSize={11} color="var(--span)">
                ✓ Quality Product
              </Typography>

              <Typography fontSize={11} color="var(--span)">
                ✓ Customer Reviews
              </Typography>
            </Stack>
          </Box>
        </Box>

        {/* Customer Reviews */}
        <Box sx={{ mt: { xs: 4, md: 6 } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
              gap: 1.5,
              mb: 3,
            }}
          >
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: 24, md: 28 },
                fontWeight: 750,
                color: "var(--head-color)",
              }}
            >
              Customer Reviews{" "}
              <Box
                component="span"
                sx={{
                  fontSize: 15,
                  fontWeight: 400,
                  color: "var(--neutral)",
                }}
              >
                ({totalReviews} ratings)
              </Box>
            </Typography>

            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.75,
                backgroundColor: "#E6ECF5",
                px: 1.5,
                py: 0.6,
                borderRadius: 5,
              }}
            >
              <VerifiedOutlinedIcon
                sx={{ fontSize: 16, color: "var(--nav-text)" }}
              />

              <Typography
                fontSize={12}
                fontWeight={600}
                color="var(--head-color)"
              >
                Customer Feedback
              </Typography>
            </Box>
          </Box>

          {/* Rating Section */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "0.9fr 1.6fr",
              },
              gap: 2.5,
              alignItems: "start",
            }}
          >
            {/* Rating Summary */}
            <Stack spacing={2.5}>
              {/* Overall Satisfaction */}
              <Box
                sx={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: 4,
                  boxShadow: "0 3px 15px rgba(0,0,0,0.04)",
                  p: { xs: 2.5, md: 3 },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    color: "var(--neutral)",
                    mb: 1.5,
                  }}
                >
                  Overall Satisfaction
                </Typography>

                <Stack
                  direction="row"
                  alignItems="baseline"
                  spacing={0.75}
                >
                  <Typography
                    sx={{
                      fontSize: 48,
                      fontWeight: 800,
                      lineHeight: 1,
                      color: "var(--head-color)",
                    }}
                  >
                    {rate.toFixed(1)}
                  </Typography>

                  <Typography fontSize={18} color="var(--span)">
                    / 5.0
                  </Typography>
                </Stack>

                <Rating
                  value={rate}
                  readOnly
                  precision={0.1}
                  sx={{
                    color: "var(--tertiary)",
                    mt: 1,
                  }}
                />

                <Typography
                  fontSize={12}
                  color="var(--span)"
                  mt={1}
                >
                  Based on {totalReviews} reviews
                </Typography>
              </Box>

              {/* Rating Breakdown */}
              <Box
                sx={{
                  backgroundColor: "#F0F5FB",
                  borderRadius: 4,
                  boxShadow: "0 3px 15px rgba(0,0,0,0.04)",
                  p: { xs: 2.5, md: 3 },
                }}
              >
                <Typography
                  fontSize={14}
                  fontWeight={700}
                  color="var(--head-color)"
                  mb={2.5}
                >
                  Rating Breakdown
                </Typography>

                <Stack spacing={1.75}>
                  {ratingCounts.map((item) => {
                    const percentage =
                      totalReviews > 0
                        ? (item.count / totalReviews) * 100
                        : 0;

                    return (
                      <Box
                        key={item.star}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.25,
                        }}
                      >
                        <Typography
                          fontSize={12}
                          fontWeight={600}
                          color="var(--head-color)"
                          sx={{ minWidth: 38 }}
                        >
                          {item.star} ★
                        </Typography>

                        <LinearProgress
                          variant="determinate"
                          value={percentage}
                          sx={{
                            flex: 1,
                            height: 9,
                            borderRadius: 5,
                            backgroundColor: "#DCE5EF",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: "var(--tertiary)",
                              borderRadius: 5,
                            },
                          }}
                        />

                        <Typography
                          fontSize={12}
                          fontWeight={600}
                          color="var(--head-color)"
                          sx={{
                            minWidth: 22,
                            textAlign: "right",
                          }}
                        >
                          {item.count}
                        </Typography>
                      </Box>
                    );
                  })}
                </Stack>

                <Typography
                  fontSize={11}
                  color="var(--neutral)"
                  mt={2}
                >
                  {totalReviews} total customer reviews
                </Typography>
              </Box>

              {/* Quality Note */}
              <Box
                sx={{
                  backgroundColor: "#EAF3FC",
                  borderRadius: 4,
                  boxShadow: "0 3px 15px rgba(0,0,0,0.04)",
                  p: 2.5,
                  display: "flex",
                  gap: 1.25,
                }}
              >
                <GppGoodOutlinedIcon
                  sx={{
                    fontSize: 22,
                    color: "var(--nav-text)",
                    mt: 0.25,
                  }}
                />

                <Box>
                  <Typography
                    fontSize={12}
                    fontWeight={700}
                    color="var(--head-color)"
                  >
                    Quality Matters
                  </Typography>

                  <Typography
                    fontSize={12}
                    color="var(--span)"
                    lineHeight={1.7}
                  >
                    Your feedback helps other customers make better
                    decisions.
                  </Typography>
                </Box>
              </Box>
            </Stack>

            {/* Right Column */}
            <Stack spacing={2.5}>
              {/* Leave Your Feedback */}
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: 4,
                  boxShadow: "0 3px 15px rgba(0,0,0,0.04)",
                  p: { xs: 2.5, md: 3.5 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: 1.5,
                    mb: 2.5,
                  }}
                >
                  <Box>
                    <Typography
                      fontSize={17}
                      fontWeight={700}
                      color="var(--head-color)"
                    >
                      Leave Your Feedback
                    </Typography>

                    <Typography fontSize={12} color="var(--span)">
                      Rate your experience with this product.
                    </Typography>
                  </Box>

                  <Rating
                    name="new-review-rating"
                    value={newRating}
                    onChange={(_, value) => setNewRating(value || 0)}
                    size="large"
                    sx={{ color: "var(--tertiary)" }}
                  />
                </Box>

                <Box
                  sx={{
                    backgroundColor: "#EAF3FC",
                    borderRadius: 3,
                    px: 2,
                    pt: 2,
                    pb: 1.5,
                    border: "1px solid transparent",
                    transition: "border-color 0.2s",
                    "&:focus-within": {
                      borderColor: "var(--primary)",
                    },
                  }}
                >
                  <InputBase
                    multiline
                    minRows={3}
                    fullWidth
                    value={comment}
                    onChange={(e) =>
                      setComment(
                        e.target.value.slice(0, MAX_COMMENT_LENGTH)
                      )
                    }
                    placeholder="Share your thoughts on the quality, finish, and everyday use..."
                    inputProps={{ maxLength: MAX_COMMENT_LENGTH }}
                    sx={{
                      fontSize: 14,
                      color: "var(--head-color)",
                      "& textarea::placeholder": {
                        color: "var(--neutral)",
                        opacity: 1,
                      },
                    }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 1.5,
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={0.5}
                    >
                      <LockOutlinedIcon
                        sx={{
                          fontSize: 13,
                          color: "var(--neutral)",
                        }}
                      />

                      <Typography fontSize={11} color="var(--neutral)">
                        Secure submission
                      </Typography>
                    </Stack>

                    <Typography
                      fontSize={11}
                      color="var(--neutral)"
                      sx={{ fontFamily: "monospace" }}
                    >
                      {comment.length} / {MAX_COMMENT_LENGTH}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    disabled={!canSubmit}
                    onClick={handleSubmitReview}
                    startIcon={
                      isSubmitting ? (
                        <CircularProgress size={16} color="inherit" />
                      ) : (
                        <CheckIcon />
                      )
                    }
                    sx={{
                      backgroundColor: "var(--nav-text)",
                      color: "white",
                      borderRadius: 2.5,
                      px: 3,
                      py: 1.25,
                      fontSize: 13,
                      fontWeight: 600,
                      textTransform: "none",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "var(--primary)",
                        boxShadow: "none",
                      },
                    }}
                  >
                    Submit Review
                  </Button>
                </Box>
              </Box>

              {/* Reviews */}
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <Box
                    key={review.id ?? index}
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
                                <VerifiedOutlinedIcon
                                  sx={{ fontSize: 12 }}
                                />

                                <Typography
                                  fontSize={10}
                                  fontWeight={600}
                                >
                                  Verified Buyer
                                </Typography>
                              </Box>
                            )}
                          </Stack>

                          <Typography
                            fontSize={11}
                            color="var(--neutral)"
                          >
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
                ))
              ) : (
                <Box
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 4,
                    boxShadow: "0 3px 15px rgba(0,0,0,0.04)",
                    p: 3,
                    textAlign: "center",
                  }}
                >
                  <Typography color="var(--neutral)" fontSize={14}>
                    No reviews yet. Be the first to share your thoughts.
                  </Typography>
                </Box>
              )}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
