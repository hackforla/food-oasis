import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 50,
		maxWidth: 200
	}
}));

const days = [
	{ label: 'Sunday', value: 'Sun' },
	{ label: 'Monday', value: 'Mon' },
	{ label: 'Tuesday', value: 'Tue' },
	{ label: 'Wednesday', value: 'Wed' },
	{ label: 'Thursday', value: 'Thu' },
	{ label: 'Friday', value: 'Fri' },
	{ label: 'Saturday', value: 'Sat' }
];

const intervals = [
	{ label: 'Every', value: 0 },
	{ label: 'First', value: 1 },
	{ label: 'Second', value: 2 },
	{ label: 'Third', value: 3 },
	{ label: 'Fourth', value: 4 },
	{ label: 'Last', value: -1}
]

function OpenTimeInput(props) {
	const classes = useStyles();
	const { values, stateChange, removeInput, index} = props

	return (
		<React.Fragment>
      <FormControl className={classes.formControl}>
				<InputLabel>Interval</InputLabel>
				<Select
					labelId='open-days-select-id'
					id='open-days-select'
					variant="outlined"
					onChange={(e) => stateChange(e.target.value, 'weekOfMonth')}
					value={values.weekOfMonth}
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
					variant="outlined"
					onChange={(e) => stateChange(e.target.value, 'dayOfWeek')}
					value={values.dayOfWeek}
				>
					{days.map((day) => (
						<MenuItem key={day.value} label={day.label} value={day.value}>
							{day.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<TextField
				onChange={(e) => stateChange(e.target.value, 'open')}
				variant="outlined"
				label="Opening Time"
				value={values.open}
			/>
			<TextField
				onChange={(e) => stateChange(e.target.value, 'close')}
				variant="outlined"
				label="Closing Time"
				value={values.close}
			/>
			<button onClick={()=> removeInput(index)}>Remove</button>
		</React.Fragment>
	);
}

export default OpenTimeInput;
