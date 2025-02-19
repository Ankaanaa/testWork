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

	console.log(UsersRelevant)
	return (
		<div className='table'>
			<div className='table__names'>
				<div>Full Name</div>
				<div>Department</div>
				<div>Country</div>
				<div>Status</div>
			</div>
			<div className='table__users'>
				<div>Andrey Gay</div>
				<div>Marketing</div>
				<div>Ukraine</div>
				<div>Active</div>
				<div>X</div>
			</div>
		</div>
	)
}

export default TableUsers
