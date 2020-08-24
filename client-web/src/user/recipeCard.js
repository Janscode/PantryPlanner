import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Axios from 'axios';


/* credit https://material-ui.com/components/cards/*/

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const orderRecipe = () => {
    var formBody = new FormData();
    formBody.append('username', props.username);
    formBody.append('id', props.recipe.id);
    Axios({
        method: "POST",
        url: '/api/orderRecipe',
        data: formBody,
        headers: {'Content-Type': 'multipart/form-data' } 
    });
  };
  console.log(props.recipe);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.username.charAt(0)}
          </Avatar>
        }
        title="Shrimp and Chorizo Paella"
        subheader=""
      />
      {props.recipe.img ?
        <CardMedia
        className={classes.media}
        src={props.recipe.img}
        title="Paella dish"
      />
      :
        null
      }
      
      <CardActions disableSpacing>
        <IconButton onClick={orderRecipe} aria-label="add to favorites">
          <AddShoppingCart />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Ingredients:</Typography>
          {props.recipe.recipeIngredient.map(
            (ingredient) =>
            <li>{ingredient.text}</li>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}
