import { Link } from 'react-router-dom';
import styles from './consultation.module.css';
import buttons from '../../css/buttons.module.css';

function Consultation(){
	return (
		<div className={styles.outerdiv}>
			<h1 className="text-3xl font-bold text-blue">Consultation Booking</h1>
			<br />
			<div className={styles.innerdiv}>
				<div className={styles.leftSide}>
					<form>
						<h2>Preferred Time</h2>
						<input type="time" /><br /><br />
						<h2>Preferred Date</h2>
						<input type="date" /><br /><br />
						<h2>Pregnancy Progression</h2>
						<input type="text" /><br /><br />
						<h2>Preferred Doctor Gender</h2>
						<select>
							<option>Female</option>
							<option>Male</option>
							<option>No preference</option>
						</select><br /><br />
						<h2>Preferred Medium of Communication</h2>
						<div className={styles.radio}>
							<input type="radio" name="medium" /> Video Call &emsp;
							<input type="radio" name="medium" /> Text &emsp;
							<input type="radio" name="medium" /> No Preference <br /><br />
						</div>
					</form>
					<button className={buttons.stylisedBtn}>Find my Expert</button>
				</div>
				<div className={styles.rightSide}>
				<h2>List of docters to go here</h2>
				</div>
			</div>
		</div>
	);
}

export default Consultation;
