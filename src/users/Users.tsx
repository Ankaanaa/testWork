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
	const [dataDepartment, setDataDepartment] = useState<department[]>([])
	const [toggleDepartment, setToggleDepartment] = useState<boolean>(true)
	useEffect(() => {
		const FetchData = async () => {
			const fetchDep = await fetch('/Departments.json')

			const department = await fetchDep.json()
			setDataDepartment(department)
		}
		FetchData()
	}, [])
	const upSelected = (
		mode: 'department' | 'country',
		department: string,
		data: department[],
		setData: React.Dispatch<React.SetStateAction<department[]>>
	) => {
		const index = data.findIndex((el: department) => {
			if (mode === 'department') {
				return el.name === department
			}
		})
		setData(prev => {
			const newData = [...prev]
			newData.splice(index, 1)
			newData.unshift({ name: data[index].name, value: data[index].value })
			return newData
		})
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
				upSelected('department', department, dataDepartment, setDataDepartment)
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
