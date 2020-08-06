import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';
import './App.css';
import { Grid, Typography } from '@material-ui/core';
import CityMain from './components/CityMain';
import { withStyles, MuiThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let styles = {
	root: {
		background: '#0b2533',
		backgroundSize: '100% 100%',
		display: 'flex',
		alignItems: 'center',
		width: '100vw',
		minHeight: '100vh'
	}
};
let THEME = createMuiTheme({
	typography: {
		fontFamily: ['Nunito', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(',')
	}
});
THEME = responsiveFontSizes(THEME);
function App(props) {
	const { classes } = props;
	return (
		<MuiThemeProvider theme={THEME}>
			<Router>
				<Grid container className={classes.root} spacing={0}>
					<Grid item xs={1} sm={1} md={4}></Grid>
					<Grid item xs={10} md={4}>
						<Switch>
							<Route path="/:wilaya" component={CityMain} />
							<Route path="/" component={CityMain} />
						</Switch>
						<Typography variant="subtitle1" style={{ color: '#FFF',fontFamily: 'cairo', paddingBottom: 20 }}>
							Réalisé par{' '}
							<a href="https://gh-soft.net" style={{  color: 'white', fontFamily: 'cairo'  }}>
								GH Soft Algérie
							</a>
						</Typography>
					</Grid>
					<Grid item xs={1} sm={1} md={4}></Grid>
				</Grid>
			</Router>
		</MuiThemeProvider>
	);
}

export default withStyles(styles)(App);
