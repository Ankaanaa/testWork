import { users } from '../../data/data'
import './Buttons.scss'

interface props {
	name: string
	setName: React.Dispatch<React.SetStateAction<string>>
	index: number | null
	setIndex: React.Dispatch<React.SetStateAction<number | null>>
	department: string
	setDepartment: React.Dispatch<React.SetStateAction<string>>
	country: string
	setCountry: React.Dispatch<React.SetStateAction<string>>
	status: string
	setStatus: React.Dispatch<React.SetStateAction<string>>
	lengthName: boolean
	setLengthName: React.Dispatch<React.SetStateAction<boolean>>
}
const ButtonsSaveOrUndo = (props: props) => {
	const saveChange = () => {
		if (props.index !== null) {
			if (props.name.trim().length > 5) {
				if (hasChange()) {
					users[props.index].name = props.name
					users[props.index].country = props.country
					users[props.index].department = props.department
					users[props.index].status = props.status
					props.setCountry('')
					props.setDepartment('')
					props.setName('')
					props.setStatus('')
					props.setIndex(null)
				}
			} else {
				props.setLengthName(false)
				setTimeout(() => {
					props.setLengthName(true)
				}, 3000)
			}
		}
	}

	const hasChange = () => {
		if (props.index !== null) {
			return (
				props.name !== users[props.index].name ||
				props.country !== users[props.index].country ||
				props.department !== users[props.index].department ||
				props.status !== users[props.index].status
			)
		}
		return false
	}

	const checkedUndo = () => {
		if (props.index !== null) {
			if (hasChange()) {
				return true
			} else {
				return false
			}
		}
	}
	const undoChange = () => {
		if (props.index !== null) {
			if (hasChange()) {
				props.setCountry(users[props.index].country)
				props.setDepartment(users[props.index].department)
				props.setStatus(users[props.index].status)
				props.setName(users[props.index].name)
			}
		}
	}
	checkedUndo()
	return (
		<div className='buttons'>
			{hasChange() && (
				<button onClick={undoChange} className='button__undo'>
					Undo
				</button>
			)}
			<button className='button__save' onClick={saveChange}>
				Save
			</button>
		</div>
	)
}
export default ButtonsSaveOrUndo
