import 'regenerator-runtime/runtime'
import { h } from 'preact'
import { useState } from 'preact/hooks'
import * as classes from './App.css'

import Image from '/src/components/Image'
import Body from '/src/components/typography/Body'
import Search from '/src/components/Search'

import CardContext from '/src/logic/contexts/card'

import BanjoJace from '/src/static/images/banjo_jace.png'

const App = () => {
	const [cardData, setCardData] = useState()
	return (
		<CardContext.Provider value={cardData, setCardData}>
			<div className={classes.app}>
				<div className={classes.banjoJaceWrapper}>
					<Image
						src={BanjoJace}
						alt="Banjo the Mindwalker"
						className={classes.banjoJace}
					/>
				</div>
				<div className={classes.contentContainer}>
					<Body>
						Enter the Multiverse ID or name of a Magic the Gathering card to have Banjo read the card text!
					</Body>
					<Search />
				</div>
			</div>
		</CardContext.Provider>
	)
}

export default App
