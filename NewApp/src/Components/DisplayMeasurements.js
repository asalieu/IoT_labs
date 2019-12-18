import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    // minWidth: 275,
    // width: '24.5%',
    border: '1px solid #000',
    margin: 3,
    // padding: 3
  },
//   bullet: {
//     // display: 'inline-block',
//     margin: '0 2px',
//     transform: 'scale(0.8)',
//   },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  thereading: {
    // display: 'inline-block'
  },
  theunit: {
    fontSize: 9
  }
});

const DisplayMeasurements = ({TheData, TheReading, TheUnit}) => {
// export default function DisplayMeasurements() {
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;


  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {TheData}
        </Typography>
        <Typography className={classes.thereading} variant="h4" component="h2">
        {TheReading} 
        <span className={classes.theunit}>{TheUnit}</span>
        </Typography>
        {/* <Typography className={classes.pos} color="textSecondary">
        {TheUnit} 
        </Typography> */}
        {/* <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

export default DisplayMeasurements;