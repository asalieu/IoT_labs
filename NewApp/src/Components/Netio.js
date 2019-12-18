import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';


import Switch from '@material-ui/core/Switch';
// import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';

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


const Netio = ({TheData, TheReading}) => {
// export default function Netio() {
  const classes = useStyles();

  var [toggleOutput, setToggleOutput] = useState(TheReading);

  function handleToggle(event){
    setToggleOutput = toggleOutput === true ? true : false;
    //updateNetioDevice(toggleOutput);
    updateNetioFromWeb(toggleOutput);
  }

  function updateNetioDevice(toSet){
    toSet = toSet === true ? 1 : 0;
    fetch(`${process.env.REACT_APP_NETIO4_OUTPUT}${TheData}=${toSet}`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        output: TheData,
        status: toSet
      })
    })
    .then(response => response.json())
    .then(function(response){
      console.log(response);
    })
    .catch(err => console.error(err)) 
  }

  function updateNetioFromWeb(toSet){
    let xml = `<?xml version="1.0" encoding="utf-8"?>
    <request sessionID="wMLeBltHIXXcUq3vnCxpQqcyhhgXr4DE">
    <device action="doAction" deviceName="system" actionName="SetOut"><param name="output" type="integer">3</param>
    <param name="value" type="integer">4</param></device>
    </request>`;
    toSet = toSet === true ? 1 : 0;
    // fetch(`${process.env.REACT_APP_NETIO4_OUTPUT_WEB}`,{
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/xml',
    //     'Content-Type': 'application/xml'
    //   },
    //   body: xml
    // })
    // .then(response => response.text())
    // .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    // .then(data => console.log(data))
    // // .then(function(response){
    // //   console.log(response);
    // // })
    // .catch(err => console.error(err)) 

    var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST",`${process.env.REACT_APP_NETIO4_OUTPUT_WEB}`);
        var xmlDoc;
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            xmlDoc = xmlhttp.responseXML;
            console.log(xmlDoc);
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        // var xml = "<?xml version='1.0'?><query><author>John Steinbeck</author></query>";
        xmlhttp.send(xml);

  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <FormControlLabel
          value={TheReading} 
          control={
            <Switch 
              size="medium"
              color={toggleOutput === true ? "primary":"secondary"}
              onChange={handleToggle}
              value={toggleOutput}    
              />}
          label={TheData}
          labelPlacement="start"
        />
        {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
          {TheData}
        </Typography>
        <Typography className={classes.thereading} variant="h4" component="h2">
        {TheReading} 
        {/* <span className={classes.theunit}>{TheUnit}</span> 
        </Typography> */}

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

export default Netio;