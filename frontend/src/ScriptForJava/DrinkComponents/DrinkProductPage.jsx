import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { scriptAddToCart } from "../../store/index";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const DrinkProductPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { scriptDrinks, scriptReviews } = useSelector((state) => state);
  const [expanded, setExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!scriptDrinks) {
    return null;
  }

  const drink = scriptDrinks.find((d) => d.id === id);
  if (!drink) {
    return null;
  }

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const clickToCart = () => {
    dispatch(scriptAddToCart(drink, quantity));
  };

  const filtered = scriptReviews.filter((review) => review.productId === drink.id);
  // console.log(filtered);

  // console.log("whats going on wiht the individual product page?");

  return (
    <div id="scriptforjava-ProductDiv">
      <div id="scriptforjava-productDivLeft">
        <Card>
          <CardMedia
            component="img"
            sx={{
              maxHeight: "fit-content",
              maxWidth: "fit-content",
              objectFit: "contain",
              // padding: "1rem",
              // display: "flex",
            }}
            image={drink.imageUrl}
            alt={drink.name}
          />
        </Card>
      </div>

      <div id="scriptforjava-productDivRight">
        <Card>
          <CardHeader
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={drink.name}
            subheader={"Price: $" + drink.price}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {drink.description}
              <br />
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <CardActions>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={quantity}
                    label="quantity"
                    onChange={(ev) => setQuantity(ev.target.value)}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Button size="small" onClick={() => clickToCart()}>
                Add To Cart
              </Button>
            </CardActions>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Info:</Typography>
              <Typography paragraph>
                {drink.description}
                <br />
                <br />
                Read the Reviews!
                {filtered.review}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    </div>
  );
};

export default DrinkProductPage;
