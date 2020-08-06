import React, { Component } from 'react';
import axios from 'axios';
import { List, ListItem, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import WilayaSelector from './WilayaSelector';
import wilayas from '../data/wilayas.json';

const useStyles = makeStyles((theme) => ({
	root: {},
	TimeItem: {
		display: 'flex',

		borderRadius: 5,
		backgroundColor: theme.palette.background.paper,
		margin: '12px 0'
	},
	TimesList: {
		// backgroundColor: theme.palette.background.paper
	}
}));

const TimeItem = ({ times, time, time_ar, ...props }) => {
	let styles = useStyles();
	return (
		<ListItem className={styles.TimeItem} >
			<div style={{ flex: 2, fontSize: 24, textAlign: 'left' }}>{time}</div>
			<div style={{ flex: 3, fontSize: 28, textAlign: 'center', fontWeight: 900 }}>
				{times && times[time]}
			</div>
			<div style={{ flex: 2, fontSize: 24, textAlign: 'right' }}>{time_ar}</div>
		</ListItem>
	);
};
const TimesList = ({ times, loading, ...props }) => {
	let styles = useStyles();

	return (
		<List component="nav" className={styles.TimesList} >
			<TimeItem loading={loading} times={times} time="Fajr" time_ar="الفجر" />
			<TimeItem loading={loading} times={times} time="Dhuhr" time_ar="الظهر" />
			<TimeItem loading={loading} times={times} time="Asr" time_ar="العصر" />
			<TimeItem loading={loading} times={times} time="Maghrib" time_ar="المغرب" />
			<TimeItem loading={loading} times={times} time="Isha" time_ar="العشاء" />
		</List>
	);
};

const currentWilaya = (param) => {
	let p = param ? param.replace(/-/g, ' ') : window.geoplugin_city().toLowerCase();
	console.log(window.geoplugin_city())
	return wilayas.find((obj) => {
		if (obj.nom.toLowerCase() == p) return obj;
	});
};
const formatWilaya = (plain)=>{
	return plain.toLowerCase().replace(new RegExp(/ /g), '-');
}
export default class CityMain extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: 'https://api.pray.zone/v2/times/today.json?city=',
			times: null,
			loading: false
		};
	}

	componentDidMount() {
		
			let wilaya = this.props.match.params.wilaya;
			
			this.loadData(wilaya? wilaya : null  );
		

		
	}
	componentWillReceiveProps(newProps) {
		if (newProps.match.params.wilaya !== this.props.match.wilaya) {
			let wilaya = newProps.match.params.wilaya;
			this.loadData(wilaya);
		}
	}
	loadData(wilaya) {
		
		if(!wilaya) wilaya = formatWilaya(window.geoplugin_city());
		this.setState(
			{
				loading: true
			},
			() => {
				axios.get(this.state.url + wilaya).then(({ status, data }) => {
					if (status === 200) {
						let { results } = data;
						this.setState({
							times: results.datetime[0].times,
							location: results.location,
							loading: false
						});
					}
				});
			}
		);
	}

	render() {
		const { params } = this.props.match;
		let current_wilaya = currentWilaya(params.wilaya);
		return (
			<Grid container spacing={2}>
			<Grid item xs={12}>
				<Typography variant="h2" style={{ color: '#f0ca7f', textAlign: 'center' }}>
					مواقيت الصلاة لمدينة
				</Typography>
				<Typography variant="h3" style={{ color: '#FFF', textAlign: 'center' }}>
					{current_wilaya.nom_ar}
					<br />
					{current_wilaya.nom}
					{/* Constantine */}
				</Typography>
				<TimesList loading={this.state.loading} times={this.state.times} />
				<WilayaSelector wilayas={this.props.wilayas} currentWilaya={current_wilaya}/>
				</Grid>
			</Grid>
		);
	}
}
