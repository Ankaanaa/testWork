import { useEffect, useState } from 'react'

interface Department {
	name: string
	value: string
}
interface props {
	observerFilter: number
	upSelected: (
		mode: 'department' | 'country',
		department: string,
		data: Department[],
		setData: React.Dispatch<React.SetStateAction<Department[]>>,
		isPush: 'push' | 'no'
	) => void
	handleCheckBox: (
		department: string,
		isChecked: boolean,
		name: 'department' | 'country'
	) => void
	dataCountries: countries[]
	setDataCountries: React.Dispatch<React.SetStateAction<countries[]>>
	checkCountries: {
		[countries: string]: boolean
	}
	setCheckCountries: React.Dispatch<
		React.SetStateAction<{
			[countries: string]: boolean
		}>
	>
}

interface countries {
	name: string
	value: string
}

const FilterCountries = (props: props) => {
	const [dataCountries, setDataCountries] = useState<countries[]>([])
	const [toggleCountries, setToggleCountries] = useState<boolean>(false)
	useEffect(() => {
		const fetchCountries = async () => {
			const res = await fetch('/Countries.json')
			const countries = await res.json()
			setDataCountries(countries)
		}
		fetchCountries()
	}, [])

	useEffect(() => {
		if (props.observerFilter < 3) {
			setToggleCountries(false)
			props.setCheckCountries(
				prev =>
					Object.fromEntries(Object.keys(prev).map(key => [key, false])) as {
						[countries: string]: boolean
					}
			)
		}
	}, [props.observerFilter])

	const CountriesList = props.dataCountries.map((el: countries) => {
		return (
			<div key={el.value} className='users__department'>
				<input
					checked={props.checkCountries[el.name] || false}
					className='users__checkbox'
					type='checkbox'
					onChange={e =>
						props.handleCheckBox(el.name, e.target.checked, 'country')
					}
				/>
				<div className='users__prof'>{el.name}</div>
			</div>
		)
	})
	return (
		<div
			className={`users__filter__2 ${
				props.observerFilter === 3 ? 'active' : 'disabled'
			}`}
		>
			<div className='users__block'>
				<div>Select country</div>
				<div
					className='users__show'
					onClick={() => setToggleCountries(!toggleCountries)}
				>
					ʌ
				</div>
			</div>
			{toggleCountries && <div className='users__content'>{CountriesList}</div>}
		</div>
	)
}

export default FilterCountries
