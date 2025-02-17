import { useEffect, useState } from 'react'
import './Users.scss'
import FilterCountries from './filterCountries/FilterCountries'
import FilterStatuses from './filterCountries/filterStatuses/FilterStatuses'
interface department {
	name: string
	value: string
}
interface countries {
	name: string
	value: string
}
const Users = () => {
	const [checkDepartment, setCheckDepartment] = useState<{
		[department: string]: boolean
	}>({})
	const [checkCountries, setCheckCountries] = useState<{
		[countries: string]: boolean
	}>({})
	const [dataDepartment, setDataDepartment] = useState<department[]>([])
	const [toggleDepartment, setToggleDepartment] = useState<boolean>(true)
	const [observerFilter, setObserverFilter] = useState<number>(0)
	const [dataCountries, setDataCountries] = useState<countries[]>([])
	const [country, setCountry] = useState<string>('')
	useEffect(() => {
		const FetchData = async () => {
			const fetchDep = await fetch('/Departments.json')

			const department = await fetchDep.json()
			setDataDepartment(department)
		}
		FetchData()
	}, [])

	useEffect(() => {
		const fetchCountries = async () => {
			const res = await fetch('/Countries.json')
			const countries = await res.json()
			setDataCountries(countries)
		}
		fetchCountries()
	}, [])

	useEffect(() => {
		const trueCount = Object.values(checkDepartment).filter(
			value => value
		).length
		if (trueCount === 3) {
			setObserverFilter(3)
		} else if (trueCount < 3 && trueCount !== 0) {
			setObserverFilter(0)
		}
	}, [Object.keys(checkDepartment).length, Object.values(checkDepartment)])
	const upSelected = (
		mode: 'department' | 'country',
		department: string,
		data: department[],
		setData: React.Dispatch<React.SetStateAction<department[]>>,
		isPush: 'push' | 'no'
	) => {
		const index = data.findIndex((el: department) => {
			if (mode === 'department') {
				return el.name === department
			} else {
				return el.name === department
			}
		})
		if (isPush === 'push') {
			setData(prev => {
				const newData = [...prev]
				newData.splice(index, 1)
				newData.push({ name: data[index].name, value: data[index].value })
				return newData
			})
		} else {
			setData(prev => {
				const newData = [...prev]
				newData.splice(index, 1)
				newData.unshift({ name: data[index].name, value: data[index].value })
				return newData
			})
		}
	}
	const handleCheckBox = (
		department: string,
		isChecked: boolean,
		name: 'department' | 'country'
	) => {
		if (name === 'department') {
			setCheckDepartment(prev => ({
				...prev,
				[department]: isChecked,
			}))

			if (isChecked) {
				upSelected(
					'department',
					department,
					dataDepartment,
					setDataDepartment,
					'no'
				)
			} else {
				upSelected(
					'department',
					department,
					dataDepartment,
					setDataDepartment,
					'push'
				)
			}
		} else {
			setCheckCountries(prev => ({
				...prev,
				[department]: isChecked,
			}))
			setCountry(department)

			if (isChecked) {
				upSelected('country', department, dataCountries, setDataCountries, 'no')
			} else {
				upSelected(
					'country',
					department,
					dataCountries,
					setDataCountries,
					'push'
				)
				setCountry('')
			}
		}
	}
	const DepartmentList = dataDepartment.map((el: department) => {
		return (
			<div key={el.value} className='users__department'>
				<input
					checked={checkDepartment[el.name] || false}
					className='users__checkbox'
					type='checkbox'
					onChange={e =>
						handleCheckBox(el.name, e.target.checked, 'department')
					}
				/>
				<div className='users__prof'>{el.name}</div>
			</div>
		)
	})
	return (
		<div className='users'>
			<div className='users__title'>USERS</div>
			<div className='users__desc'>
				Please add at least 3 departments to be able to proceed next steps.
			</div>
			<div className='users__filters'>
				<div className='users__filter'>
					<div className='users__block'>
						<div>Selected</div>
						<div
							className='users__show'
							onClick={() => setToggleDepartment(!toggleDepartment)}
						>
							ʌ
						</div>
					</div>
					{toggleDepartment && (
						<div className='users__content'>{DepartmentList}</div>
					)}
				</div>
				<FilterCountries
					upSelected={upSelected}
					observerFilter={observerFilter}
					handleCheckBox={handleCheckBox}
					dataCountries={dataCountries}
					setDataCountries={setDataCountries}
					checkCountries={checkCountries}
					setCheckCountries={setCheckCountries}
				/>
				<FilterStatuses
					checkDepartment={checkDepartment}
					country={country}
					observerFilter={observerFilter}
				/>
			</div>
		</div>
	)
}

export default Users
