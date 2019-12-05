import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	chip: {
		margin: 2
	},
	noLabel: {
		marginTop: theme.spacing(3)
	}
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const days = [
	{ label: 'Sunday', value: 'Su' },
	{ label: 'Monday', value: 'Mo' },
	{ label: 'Tuesday', value: 'Tu' },
	{ label: 'Wednesday', value: 'We' },
	{ label: 'Thursday', value: 'Th' },
	{ label: 'Friday', value: 'Fr' },
	{ label: 'Saturday', value: 'Sa' },
	{ label: 'Public Holidays', value: 'PH' }
];

const intervals = [
	{ label: 'Every', value:'Every'},
	{ label: 'First', value: 'First'},
	{ label: 'Second', value: 'Second'},
	{ label: 'Third', value: 'Third'},
	{ label: 'Fourth', value: 'Fourth'},
	{ label: 'Last', value: 'Last'}
]

function OpenTimeInput(props) {
	const classes = useStyles();
	const theme = useTheme();

	const [ check24Hr, setCheck24Hr ] = useState(false);
	const [ hoursDisabled, setHoursDisabled ] = useState(false);
	const open24 = (val) => {
		setCheck24Hr(val);
		if (val) {
			props.stateChange('open', 'openTime');
		} else {
			props.stateChange('', 'openTime');
		}
		props.stateChange('', 'closeTime');
		setHoursDisabled(val);
	};

	return (
		<React.Fragment>
            <FormControl className={classes.formControl}>
				<InputLabel>Interval</InputLabel>
				<Select
					labelId='open-days-select-id'
					id='open-days-select'
					onChange={(e) => props.stateChange(e.target.value, 'interval')}
					value={props.values.interval}
					multiple
					renderValue={(selected) => (
						<div className={classes.chips}>
							{selected.map((value) => <Chip key={value} label={value} className={classes.chip} />)}
						</div>
					)}
				>
					{intervals.map((day) => (
						<MenuItem key={day.value} value={day.value}>
							{day.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl className={classes.formControl}>
				<InputLabel>Days</InputLabel>
				<Select
					labelId='open-days-select-id'
					id='open-days-select'
					onChange={(e) => props.stateChange(e.target.value, 'days')}
					value={props.values.days}
					multiple
					renderValue={(selected) => (
						<div className={classes.chips}>
							{selected.map((value) => <Chip key={value} label={value} className={classes.chip} />)}
						</div>
					)}
				>
					{days.map((day) => (
						<MenuItem key={day.value} value={day.value}>
							{day.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<TextField
				onChange={(e) => props.stateChange(e.target.value, 'openTime')}
				value={props.values.openTime}
				disabled={hoursDisabled}
			/>
			<TextField
				onChange={(e) => props.stateChange(e.target.value, 'closeTime')}
				value={props.values.closeTime}
				disabled={hoursDisabled}
			/>
			<FormControlLabel
				control={<Checkbox checked={check24Hr} onChange={() => open24(!check24Hr)} />}
				label='24 Hours'
			/>
		</React.Fragment>
	);
}

export default OpenTimeInput;
