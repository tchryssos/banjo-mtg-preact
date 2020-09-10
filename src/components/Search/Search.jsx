import { h, Fragment } from 'preact'
import { useState } from 'preact/hooks'

import * as classes from './Search.css'

const Search = () => {
	const [searchVal, setSearchVal] = useState('')
	const onChange = (e) => setSearchVal(e.target.value)
	const onSubmit = () => {
		console.log(searchVal)
		setSearchVal('')
	}
	return (
		<Fragment>
			<input
				placeholder="Multiverse ID or Card Name"
				value={searchVal}
				onChange={onChange}
				className={classes.searchInput}
			/>
			<button
				onClick={onSubmit}
				className={classes.submit}
			>
				Submit
			</button>
		</Fragment>
	)
}

export default Search
