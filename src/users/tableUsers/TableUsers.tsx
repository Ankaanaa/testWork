// Надо через пропсы сюда прокинуть checkDepartment и country. CheckDepartment с помощью метода entries и map создадим новый массив обьектов и туда запихнем эти значения, для этого надо создать стэйт. Country будет просто пропсом тут
import { useEffect, useState } from 'react'
import { users } from '../../data/data'
import './Table.scss'
interface props {
	checkDepartment: {
		[department: string]: boolean
	}
	country: string
}
interface department {
	name: string
	status: boolean
}

interface users {
	name: string
	department: string
	country: string
	status: string
}

const TableUsers = (props: props) => {
	const [department, setDepartment] = useState<department[]>([])
	const [userData, setUserData] = useState<users[]>(users)
	useEffect(() => {
		setDepartment(
			Object.entries(props.checkDepartment).map(([key, value]) => ({
				name: key,
				status: value,
			}))
		)
	}, [props.checkDepartment])

	const departmentFilter = department.filter(el => el.status === true)

	const UsersRelevant = departmentFilter
		.flatMap(el => {
			return users.filter(dep => dep.department === el.name)
		})
		.filter(el => {
			if (props.country.length > 0) {
				if (el.country === props.country) {
					return true
				} else return false
			} else return true
		})

	const deleteUser = (index: number) => {
		debugger
		setUserData(prev => {
			const newData = [...prev]
			newData.splice(index, 1)
			return newData
		})
		users.splice(index, 1)
	}

	console.log(UsersRelevant)
	const UsersContent = UsersRelevant.map((el, index) => {
		return (
			<div key={index} className='table__users'>
				<div className='table__info'>{el.name}</div>
				<div className='table__info'>{el.department}</div>
				<div className='table__info'>{el.country}</div>
				<div className='table__info'>{el.status}</div>
				<div onClick={() => deleteUser(index)}>X</div>
			</div>
		)
	})
	const DefaultObserver = departmentFilter.flatMap(el => {
		return userData.filter(dep => dep.department === el.name)
	})

	console.log(DefaultObserver, 's', departmentFilter)
	const allUsers = userData.map((el, index) => {
		// if (DefaultObserver.length === 0 && departmentFilter.length >= 1) {
		// 	return <div>Not Found</div>
		// } else {
		return (
			<div key={index} className='table__users'>
				<div className='table__info'>{el.name}</div>
				<div className='table__info'>{el.department}</div>
				<div className='table__info'>{el.country}</div>
				<div className='table__info'>{el.status}</div>
				<div onClick={() => deleteUser(index)}>X</div>
			</div>
		)
	})
	return (
		<div className='table'>
			<div className='table__names'>
				<div className='table__params'>Full Name</div>
				<div className='table__params'>Department</div>
				<div className='table__params'>Country</div>
				<div className='table__params'>Status</div>
			</div>
			{UsersRelevant.length > 0 ? (
				UsersContent
			) : DefaultObserver.length === 0 && departmentFilter.length >= 1 ? (
				<div className='table__notFound'>No such user found</div>
			) : (
				allUsers
			)}
		</div>
	)
}

export default TableUsers
