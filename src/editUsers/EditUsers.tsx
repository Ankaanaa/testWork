import { useEffect, useState } from 'react'
import { users } from '../data/data'

import './EditUsers.scss'
import ButtonsSaveOrUndo from './buttons/Buttons'

interface users {
	name: string
	department: string
	country: string
	status: string
}
interface data {
	name: string
	value: string
}
interface indexAndValue {
	value: string
	index: number
	name: string
}

const EditUsers = () => {
	const [select, setSelect] = useState('')
	const [name, setName] = useState('')
	const [index, setIndex] = useState<number | null>(null)
	const [department, setDepartment] = useState('')
	const [country, setCountry] = useState('')
	const [status, setStatus] = useState('')
	const [lengthName, setLengthName] = useState(true)
	const [dataStatuses, setDataStatuses] = useState<data[]>([])
	const [dataCountries, setDataCountries] = useState<data[]>([])
	const [dataDepartments, setDataDepartments] = useState<data[]>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchStatus = await fetch('/Statuses.json')
				const fetchCountries = await fetch('/Countries.json')
				const fetchDepartments = await fetch('/Departments.json')

				const status = await fetchStatus.json()
				const countries = await fetchCountries.json()
				const departments = await fetchDepartments.json()

				setDataStatuses(status)
				setDataCountries(countries)
				setDataDepartments(departments)
			} catch (err) {
				console.log('Произошла ошибка при загрузке данных', err)
			}
		}
		fetchData()
	}, [])

	const UpSelect = (
		arg: indexAndValue,
		setData: React.Dispatch<React.SetStateAction<data[]>>
	) => {
		if (arg) {
			if (arg.index !== 0) {
				setData(prevData => {
					const newData = [...prevData]
					newData.splice(arg.index, 1)
					newData.unshift({ name: arg.name, value: arg.value })
					return newData
				})
			}
		}
	}
	const SaveParams = (
		event: React.ChangeEvent<HTMLSelectElement>,
		data: data[]
	) => {
		const selectedData = data
			.map((el: data, index: number) => ({
				value: el.value,
				index: index,
				name: el.name,
			}))
			.find((el: any) => el.name === event.target.value)

		return selectedData
	}

	const UserInfoUp = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const IndexUs = parseInt(event.target.value, 10)
		const check = dataDepartments.findIndex(
			(index: data) => users[IndexUs].department === index.name
		)
		const { name, value } = dataDepartments[check]
		if (check !== -1 && check !== 0) {
			setDataDepartments(prev => {
				const newData = [...prev]
				newData.splice(check, 1)
				newData.unshift({ name: name, value: value })
				return newData
			})
		}
		return check
	}

	const ChangeUser = (
		event: React.ChangeEvent<HTMLSelectElement>,
		inputName: string,
		data?: indexAndValue
	) => {
		if (inputName === 'user') {
			const index = parseInt(event.target.value, 10)
			setIndex(index)
			setSelect(event.target.value)
			UserInfoUp(event)
			setName(users[index].name)
			setDepartment(users[index].department)
			setCountry(users[index].country)
			setStatus(users[index].status)
		} else if (inputName === 'department') {
			UpSelect(data as indexAndValue, setDataDepartments)
			setDepartment(event.target.value)
		} else if (inputName === 'country') {
			UpSelect(data as indexAndValue, setDataCountries)
			setCountry(event.target.value)
		} else if (inputName === 'status') {
			UpSelect(data as indexAndValue, setDataStatuses)
			setStatus(event.target.value)
		}
	}
	return (
		<div className='editUsers'>
			<div className='editUsers__h2'>EDIT USERS</div>
			<div className='editUsers__container'>
				<div>User</div>
				<select
					value={select}
					onChange={event => ChangeUser(event, 'user')}
					className='editUsers__select'
				>
					{users.map((el: users, index: number) => {
						return <option value={index}>{users[index].name}</option>
					})}
				</select>
				<div className='editUsers__information'>User Information</div>
				<div className='editUsers__container_2'>
					<div className='editUsers__column'>
						{!lengthName ? (
							<div className='editUsers__length'>
								Must be at least 5 characters
							</div>
						) : (
							<div>Full Name</div>
						)}
						<input
							value={name}
							onChange={e => setName(e.target.value)}
							type='text'
							className={`editUsers__select ${!lengthName ? 'length' : ''}`}
						/>
					</div>
					<div className='editUsers__column'>
						<div>Department</div>
						<select
							value={department}
							onChange={event => {
								ChangeUser(
									event,
									'department',
									SaveParams(event, dataDepartments)
								)
							}}
							className='editUsers__select'
						>
							{dataDepartments.map((el: data, index: number) => {
								return (
									<option key={index} value={el.name}>
										{el.name}
									</option>
								)
							})}
						</select>
					</div>
					<div className='editUsers__column'>
						<div>Country</div>
						<select
							value={country}
							onChange={event =>
								ChangeUser(event, 'country', SaveParams(event, dataCountries))
							}
							className='editUsers__select'
						>
							{dataCountries.map((el: data, index: number) => {
								return (
									<option key={index} value={el.name}>
										{el.name}
									</option>
								)
							})}
						</select>
					</div>
					<div className='editUsers__column'>
						<div>Status</div>
						<select
							value={status}
							onChange={event =>
								ChangeUser(event, 'status', SaveParams(event, dataStatuses))
							}
							className='editUsers__select'
						>
							{dataStatuses.map((el: data, index: number) => {
								return (
									<option key={index} value={el.name}>
										{el.name}
									</option>
								)
							})}
						</select>
					</div>
				</div>
				<ButtonsSaveOrUndo
					name={name}
					setName={setName}
					index={index}
					setIndex={setIndex}
					setCountry={setCountry}
					country={country}
					setDepartment={setDepartment}
					department={department}
					status={status}
					setStatus={setStatus}
					lengthName={lengthName}
					setLengthName={setLengthName}
				/>
			</div>
		</div>
	)
}

export default EditUsers
