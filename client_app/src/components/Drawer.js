import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer as MaterialUiDrawer } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#2c384e",
        height: 100
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth,
        background: "#282c34"
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        marginTop: 100,
        background: "#2c384e",
        padding: theme.spacing(3),
        overflowY: "auto",
        textAlign: "left"
    },
    nested: {
        paddingLeft: theme.spacing(4),
    }
}));

export default function Drawer() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    //provide offset for scrollToView
    const scrollTo = (id) => {
        const yOffset = -120;
        const element = document.getElementById(id);
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });;
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h3" noWrap>
                        SurfSpots API
          </Typography>
                </Toolbar>
            </AppBar>
            <MaterialUiDrawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    <ListItem button key={'Home'} onClick={() => { scrollTo("Home") }}>
                        <ListItemText primary={'Home'} style={{ color: "white" }} />
                    </ListItem>
                    <ListItem button key={'Spot Format'} onClick={() => { scrollTo("Spot Format") }}>
                        <ListItemText primary={'Spot Format'} style={{ color: "white" }} />
                    </ListItem>
                    <ListItem button key={"Endpoints"} onClick={handleClick}>
                        <ListItemText primary={"Endpoints"} style={{ color: "white" }} />
                        {open ? <ExpandLess style={{ color: "white" }} /> : <ExpandMore style={{ color: "white" }} />}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button key={"All Spots"} className={classes.nested} onClick={() => { scrollTo("All Spots") }}>
                                <ListItemText primary="All Spots" style={{ color: "white" }} />
                            </ListItem>
                            <ListItem button key={"Closest Spot"} className={classes.nested} onClick={() => { scrollTo("Closest Spot") }}>
                                <ListItemText primary="Closest Spot" style={{ color: "white" }} />
                            </ListItem>
                            <ListItem button key={"Coordinates of a Spot"} className={classes.nested} onClick={() => { scrollTo("Coordinates of a Spot") }}>
                                <ListItemText primary="Coordinates of a Spot" style={{ color: "white" }} />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </MaterialUiDrawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <div id="Home" style={{ marginBottom: 150 }}>
                    <h2 style={{ textAlign: "center", marginBottom: 50 }}>Overview</h2>
                    <Typography paragraph variant="h6">
                        The SurfSpots API lets you get geographical information about thousands of the most well
                        known surf locations around the globe. Learn the basics about what information you can get
                        about a certain spot, what URL’s to use to get different pieces of information, and request
                        examples in following documentation.
                    </Typography>
                </div>
                <div id="Spot Format" style={{ marginBottom: 150 }}>
                    <h2 style={{ textAlign: "center", marginBottom: 50 }}>Spot Format</h2>
                    <Typography paragraph variant="h6">
                        Many of the API endpoints provide information about a single spot or list of spots. Spots are json objects with the following fields: <br />
                        <br />
                        <span style={{ fontWeight: "bolder" }}>name</span>: A string representing the recognized name of the surf spot <br />
                        <span style={{ fontWeight: "bolder" }}>lat</span>: A floating point number representing the latitude portion of a spot’s location <br />
                        <span style={{ fontWeight: "bolder" }}>lon</span>: A floating point number representing the longitude portion of a spot’s location< br />
                        <span style={{ fontWeight: "bolder" }}>area</span>: A string representing the area that the surf spot is located in. This could be a city, county, or other recognized municipality to describe the surrounding area of a surf spot. <br />
                        <span style={{ fontWeight: "bolder" }}>country</span>: A string representing the country a surf spot is located in. <br />
                        <br />
                    Here is an example of a single surf spot json object: <br />
                        <br />
                        <div style={{ marginLeft: 100, marginTop: 50 }}>
                            {'{'} <br />
                                &nbsp;&nbsp;    name: “Blacks”, <br />
	                            &nbsp;&nbsp;    lat: 32.87723159790039, <br />
	                            &nbsp;&nbsp;    lon: -117.25302886962890, <br />
	                            &nbsp;&nbsp;    area: “San Diego, CA”, <br />
	                            &nbsp;&nbsp;    country: “USA” <br />
                            {'}'}
                        </div>

                    </Typography>
                </div>
                <div id="Endpoints" style={{ marginBottom: 150 }} >
                    <h2 style={{ textAlign: "center", marginBottom: 50 }}>API Endpoints</h2>
                    <div id="All Spots" style={{ marginBottom: 75 }}>
                        <Typography paragraph variant="h4">
                            All Spots - /api/spots
                        </Typography>
                        <Typography paragraph variant="h6">
                            <div style={{ marginBottom: 30 }}>An API endpoint to query for all surf spots on the globe that we currently have recorded.</div><br />
                            &nbsp;&nbsp;<span style={{ fontWeight: "bolder" }}>Accepted HTTP methods:</span> GET<br />
                            &nbsp;&nbsp;<span style={{ fontWeight: "bolder" }}>Arguments:</span> N/A<br />
                            &nbsp;&nbsp;<span style={{ fontWeight: "bolder" }}>Arguments Format:</span> N/A<br />
                            &nbsp;&nbsp;<span style={{ fontWeight: "bolder" }}>Returns:</span> List of ‘spot’ json objects (see section above for details on ‘spot’ json object)<br />
                            &nbsp;&nbsp;<span style={{ fontWeight: "bolder" }}>Example URL:</span> https://surfspotsapi.com/api/spots<br />
                        </Typography>
                    </div>
                    <div id="Closest Spot" style={{ marginBottom: 75 }}>
                        <Typography paragraph variant="h4">
                            Closest Spot - /api/closest
                        </Typography>
                        <Typography paragraph variant="h6">
                            <div style={{ marginBottom: 30 }}>An API endpoint to query for the closest surf spot to a given latitude and longitude.</div><br />
                            &nbsp;&nbsp;<span style={{ fontWeight: "bolder" }}>Accepted HTTP methods:</span> GET<br />
                            &nbsp;&nbsp;<span style={{ fontWeight: "bolder" }}>Arguments:</span>  lat (required), lon (required)<br />
                            &nbsp;&nbsp;<span style={{ fontWeight: "bolder" }}>Arguments Format:</span> URL arguments <br />
                            &nbsp;&nbsp;<span style={{ fontWeight: "bolder" }}>Returns:</span> Single ‘spot’ json object (see section above for details on ‘spot’ json object)<br />
                            &nbsp;&nbsp;<span style={{ fontWeight: "bolder" }}>Example URL:</span> https://surfspotsapi.com/api/closest?lat=32.87723159790039&lon=-117.25302886962890<br />
                        </Typography>
                    </div>
                    <div id="Coordinates of a Spot" style={{ marginBottom: 75 }}>
                        <Typography paragraph variant="h4">
                            Coordinates of a Spot - /api/coords
                        </Typography>
                        <Typography paragraph variant="h6">
                            <div style={{ marginBottom: 30 }}>An API endpoint to query for the GPS coordinates of a spot given the name of the spot. The location name must exactly match the name for the spot that we have on file.</div><br />
                            &nbsp;&nbsp;<span style={{ fontWeight: "bolder" }}>Accepted HTTP methods:</span> GET<br />
                            &nbsp;&nbsp;<span style={{ fontWeight: "bolder" }}>Arguments:</span>  location (required)<br />
                            &nbsp;&nbsp;<span style={{ fontWeight: "bolder" }}>Arguments Format:</span> URL arguments <br />
                            &nbsp;&nbsp;<span style={{ fontWeight: "bolder" }}>Returns:</span> A list of size two, with the first item being the latitude of the spot and the second item being the longitude of the spot.<br />
                            &nbsp;&nbsp;<span style={{ fontWeight: "bolder" }}>Example URL:</span> https://surfspotsapi.com/api/coords?location=Blacks<br />
                        </Typography>
                    </div>
                </div>
            </main>
        </div>
    );
}