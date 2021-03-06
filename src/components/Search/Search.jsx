import { h, Fragment } from 'preact'
import { useState, useContext, useRef } from 'preact/hooks'

import Loading from 'ttt/components/icons/Loading'
import Body from 'ttt/components/typography/Body'

import BanjoFail from 'ttt/static/audio/banjo_fail.wav'

import { cardSearch } from 'ttt/logic/search'
import CardContext from 'ttt/logic/contexts/card'
import CharacterContext from 'ttt/logic/contexts/character'
import orNull from 'ttt/logic/utils/orNull'
import capitalize from 'ttt/logic/utils/capitalize'

import * as classes from './Search.css'

const Search = () => {
	const { setCardData, setCardError } = useContext(CardContext)
	const { character } = useContext(CharacterContext)
	const [searchVal, setSearchVal] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [hasSearched, setHasSearched] = useState(false)
	const errorAudioRef = useRef()
	const onChange = (e) => setSearchVal(e.target.value)
	const onSubmit = async () => {
		const isFirstSearch = !hasSearched
		setIsLoading(true)
		setHasSearched(true)
		const data = await cardSearch(searchVal, setCardData, setCardError, isFirstSearch)
		setIsLoading(false)
		if (data.error) {
			if (!errorAudioRef.current) {
				errorAudioRef.current = new Audio(BanjoFail)
			}
			errorAudioRef.current.play()
			setCardError(data.error)
		} else {
			setCardData(data)
		}
		setSearchVal('')
	}
	return (
		<Fragment>
			{orNull(
				!hasSearched,
				<Body>
					Enter the Multiverse ID or name of a Magic the Gathering card to have
					{` ${capitalize(character)} `}
					read the card text!
				</Body>
			)}
			{orNull(
				isLoading,
				<Loading className={classes.loadingIcon} />,
			)}
			<input
				placeholder="Multiverse ID or Card Name"
				value={searchVal}
				onChange={onChange}
				className={classes.searchInput}
				disabled={isLoading}
			/>
			<button
				onClick={onSubmit}
				className={classes.submit}
				disabled={isLoading}
			>
				Submit
			</button>
		</Fragment>
	)
}

export default Search
