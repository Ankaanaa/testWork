import { useEffect, useState } from 'react'
import './Users.scss'
interface department {
	name: string
	value: string
}
const Users = () => {
	const [checkDepartment, setCheckDepartment] = useState<{
		[department: string]: boolean
	}>({})
	const [department, setDepartment] = useState<department[]>([])
	const [toggleDepartment, setToggleDepartment] = useState<boolean>(true)
	useEffect(() => {
		const FetchData = async () => {
			const fetchDep = await fetch('/Departments.json')

			const department = await fetchDep.json()
			setDepartment(department)
		}
		FetchData()
	}, [])

	const handleCheckBox = (department: string, isChecked: boolean) => {
		setCheckDepartment(prev => ({
			...prev,
			[department]: isChecked,
		}))
	}
	const DepartmentList = department.map((el: department) => {
		return (
			<div key={el.value} className='users__department'>
				<input
					checked={checkDepartment[el.name] || false}
					className='users__checkbox'
					type='checkbox'
					onChange={e => handleCheckBox(el.name, e.target.checked)}
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
						<div onClick={() => setToggleDepartment(!toggleDepartment)}>ʌ</div>
					</div>
					{toggleDepartment && (
						<div className='users__content'>{DepartmentList}</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Users
