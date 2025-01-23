import { useState } from 'react'
import { users } from '../data/data'

import './EditUsers.scss'
import ButtonsSaveOrUndo from './buttons/Buttons'

interface users {
	name: string
	department: string
	country: string
	status: string
}

const EditUsers = () => {
	const [select, setSelect] = useState('')
	const [name, setName] = useState('')
	const [index, setIndex] = useState<number | null>(null)
	const [department, setDepartment] = useState('')
	const [country, setCountry] = useState('')
	const [status, setStatus] = useState('')
	const [lengthName, setLengthName] = useState(true)

	const ChangeUser = (
		event: React.ChangeEvent<HTMLSelectElement>,
		inputName: string
	) => {
		if (inputName === 'user') {
			const index = parseInt(event.target.value, 10)
			setIndex(index)
			setSelect(event.target.value)
			console.log(select)
			setName(users[index].name)
			setDepartment(users[index].department)
			setCountry(users[index].country)
			setStatus(users[index].status)
		} else if (inputName === 'department') {
			setDepartment(event.target.value)
		} else if (inputName === 'country') {
			setCountry(event.target.value)
		} else if (inputName === 'status') {
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
							onChange={event => ChangeUser(event, 'department')}
							className='editUsers__select'
						>
							<option value='Programming'>Digital Marketing</option>
							<option value='Backend'>Backend</option>
							<option value='Frontend'>Frontend</option>
						</select>
					</div>
					<div className='editUsers__column'>
						<div>Country</div>
						<select
							value={country}
							onChange={event => ChangeUser(event, 'country')}
							className='editUsers__select'
						>
							<option value='Ukraine'>United State</option>
							<option value='USA'>USA</option>
							<option value='Poland'>Poland</option>
						</select>
					</div>
					<div className='editUsers__column'>
						<div>Status</div>
						<select
							value={status}
							onChange={event => ChangeUser(event, 'status')}
							className='editUsers__select'
						>
							<option value='Active'>Active</option>
							<option value='No active'>No active</option>
							<option value='Disabled'>Disabled</option>
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
