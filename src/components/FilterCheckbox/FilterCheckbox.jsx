import React from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox({onCheckbox, isChecked = false}) {
	return (
		<div className='filter-checkbox'>
			<div className='checkbox'>
				<input
					className='filter-checkbox__input'
					name='checkbox'
					type='checkbox'
					checked={isChecked}
					onChange={(e) => onCheckbox(e, 'checkbox')}
				/>
				<p className='filter-checkbox__text'>Короткометражки</p>
			</div>
		</div>
	);
}
