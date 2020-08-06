import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';

import wilayas from '../data/wilayas.json';
import { Link as RouterLink } from 'react-router-dom';
import { Grid } from '@material-ui/core';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
	list: {
		width: 500
	},
	fullList: {
		width: 'auto'
	}
});

export default function WilayaSelector(props) {
	const classes = useStyles();
	const [state, setState] = React.useState({
		menu: false
	});

	const toggleDrawer = (open) => (event) => {
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		setState({ ...state, menu: open });
	};
	console.log(props.currentWilaya);
	const list = () => (
		<div role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
			<List>
				<ListItem>
					<ListItemText style={{ textAlign: 'center' }} primary="Selectionner Wilaya" />
				</ListItem>
				<ListItem>
					<ListItemText style={{ textAlign: 'center' }} primary="اختيار الولاية" />
				</ListItem>
				{wilayas.map(({ nom, code, nom_ar }, index) => (
					<ListItem
						button
						selected={props.currentWilaya && props.currentWilaya.code == code}
						component={RouterLink}
						to={'/' + nom.toLowerCase().replace(new RegExp(/ /g), '-')}
						key={index}
					>
						<ListItemText primary={code + ' - ' + nom} />
						<ListItemText
							primary={code + ' - ' + nom_ar}
							style={{ textAlign: 'right', direction: 'rtl' }}
						/>
					</ListItem>
				))}
			</List>
			<Divider />
			<List></List>
		</div>
	);

	return (
		<div>
			<React.Fragment>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={12} md={6} style={{paddingBottom: 5}}>
						<Button style={{ flex: 1, width: '100%', fontFamily: 'cairo', backgroundColor: '#44AF69' }} onClick={toggleDrawer(true)} variant="contained" color="primary">
            <span style={{flex: 1, fontSize: 15, textTransform: 'uppercase'}}>
              Changer WILAYA
            </span>

            <span style={{flex: 1, fontSize: 15}}>
              تغيير الولاية
              </span>
            
						</Button>
					</Grid>
					<Grid item xs={12} sm={12} md={6}>
						<Button
							style={{ flex: 1, width: '100%', fontFamily: 'cairo', backgroundColor: '#F8333C' }}
							onClick={toggleDrawer(true)}
							variant="contained"
							color="primary"
						>
							<span style={{flex: 1, textTransform: 'uppercase', fontSize: 16}}>votre position</span>
							<span style={{flex: 1, fontSize: 16 }}>موقعك الحالي</span>
							
							
						</Button>
					</Grid>
				</Grid>

				<SwipeableDrawer
					anchor="right"
					open={state.menu}
					onClose={toggleDrawer(false)}
					onOpen={toggleDrawer(true)}
				>
					{list(wilayas)}
				</SwipeableDrawer>
			</React.Fragment>
		</div>
	);
}
