import { useState } from 'react'
import './Modal.scss'

interface department {
	name: string
	value: string
}
interface countries {
	name: string
	value: string
}
interface props {
	dataCountries: department[]
	dataDepartment: countries[]
	setToggleModal: (value: React.SetStateAction<boolean>) => void
}
const Modal = (props: props) => {
	const [dataCountries, setDataCountries] = useState<countries[]>(
		props.dataCountries
	)
	const [dataDepartment, setDataDepartment] = useState<department[]>(
		props.dataDepartment
	)
	const [formData, setFormData] = useState({
		input1: '',
		department: '',
		input3: '',
		input4: '',
	})
	const handleModalClick = (e: React.MouseEvent) => {
		e.stopPropagation()
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value,
		}))
	}
	const SelectParams = (
		e: React.ChangeEvent<HTMLSelectElement>,
		mode: 'department' | 'country' | 'status',
		data?: department[]
	) => {
		debugger
		const { name, value } = e.target
		const FindComponent = data?.findIndex(index => {
			if (mode === 'department') {
				return index.name === value
			}
		})
		if (mode === 'department' && FindComponent !== undefined) {
			debugger
			if (FindComponent !== 0) {
				setDataDepartment(prev => {
					const newData = [...prev]
					newData.splice(FindComponent, 1)
					newData.unshift({
						name: dataDepartment[FindComponent].name,
						value: dataDepartment[FindComponent].value,
					})
					return newData
				})
			}
			setFormData(prev => ({
				...prev,
				[e.target.name]: e.target.value,
			}))
		}
	}
	console.log(formData.department)
	return (
		<div onClick={() => props.setToggleModal(false)} className='modal'>
			<div onClick={handleModalClick} className='modal__block'>
				<div className='modal__title'>Add User</div>
				<div className='modal__content'>
					<form className='modal__form'>
						<div className='modal__items'>
							<label className='modal__label' htmlFor='input1'>
								Full Name
							</label>
							<input
								placeholder='Enter full name'
								className='modal__input'
								type='text'
								id='input1'
								name='input1'
								value={formData.input1}
								onChange={handleChange}
							/>
						</div>
						<div className='modal__items'>
							<label className='modal__label' htmlFor='department'>
								Department
							</label>
							<select
								value={formData.department}
								className='modal__select'
								id='department'
								onChange={e => SelectParams(e, 'department', dataDepartment)}
								name='department'
							>
								<option value={''} disabled selected>
									Select Department
								</option>
								{dataDepartment.map((el, index) => {
									return (
										<option key={index} value={el.name}>
											{el.name}
										</option>
									)
								})}
							</select>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Modal
