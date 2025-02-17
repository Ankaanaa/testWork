import { useEffect, useState } from 'react'
import { users } from '../../data/data'
import './Modal.scss'
interface department {
	name: string
	value: string
}
interface countries {
	name: string
	value: string
}
interface statuses {
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
	const [dataStatuses, setDataStatuses] = useState<statuses[]>([])
	const [formData, setFormData] = useState({
		name: '',
		department: '',
		country: '',
		status: '',
	})
	const [error, setError] = useState<boolean>(false)

	useEffect(() => {
		const FetchStatus = async () => {
			const res = await fetch('/Statuses.json')
			const status = await res.json()

			setDataStatuses(status)
		}
		FetchStatus()
	}, [])
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
		data: department[]
	) => {
		const { name, value } = e.target
		const FindComponent = data.findIndex(index => {
			if (mode === 'department') {
				return index.name === value
			} else if (mode === 'country') {
				return index.name === value
			} else {
				return index.name === value
			}
		})
		if (mode === 'department') {
			if (FindComponent !== 0) {
				setDataDepartment(prev => {
					const newData = [...prev]
					newData.splice(FindComponent, 1)
					newData.unshift({
						name: data[FindComponent].name,
						value: data[FindComponent].value,
					})
					return newData
				})
			}
			setFormData(prev => ({
				...prev,
				[e.target.name]: e.target.value,
			}))
		} else if (mode === 'country') {
			if (FindComponent !== 0) {
				setDataCountries(prev => {
					const newData = [...prev]
					newData.splice(FindComponent, 1)
					newData.unshift({
						name: data[FindComponent].name,
						value: data[FindComponent].value,
					})
					return newData
				})
			}
			setFormData(prev => ({
				...prev,
				[e.target.name]: e.target.value,
			}))
		} else {
			if (FindComponent !== 0) {
				setDataStatuses(prev => {
					const newData = [...prev]
					newData.splice(FindComponent, 1)
					newData.unshift({
						name: data[FindComponent].name,
						value: data[FindComponent].value,
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
	const CloseModal = () => {
		setFormData({
			name: '',
			department: '',
			country: '',
			status: '',
		})
		props.setToggleModal(false)
	}

	const AddUsers = () => {
		if (
			formData.name.trim().length < 5 ||
			formData.country.length === 0 ||
			formData.department.length === 0 ||
			formData.status.length === 0
		) {
			setError(true)
			setTimeout(() => {
				setError(false)
			}, 3000)
		}

		users.push({
			name: formData.name,
			department: formData.department,
			country: formData.country,
			status: formData.status,
		})

		props.setToggleModal(false)
	}
	return (
		<div onClick={() => props.setToggleModal(false)} className='modal'>
			<div onClick={handleModalClick} className='modal__block'>
				<div className='modal__title'>Add User</div>
				<div className='modal__content'>
					<form className='modal__form'>
						<div className='modal__items'>
							<label className='modal__label' htmlFor='name'>
								Full Name
							</label>
							<input
								placeholder='Enter full name'
								className='modal__input'
								type='text'
								id='name'
								name='name'
								value={formData.name}
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
						<div className='modal__items'>
							<label className='modal__label' htmlFor='country'>
								Country
							</label>
							<select
								value={formData.country}
								className='modal__select__2'
								id='country'
								onChange={e => SelectParams(e, 'country', dataCountries)}
								name='country'
							>
								<option value={''} disabled selected>
									Select Country
								</option>
								{dataCountries.map((el, index) => {
									return (
										<option key={index} value={el.name}>
											{el.name}
										</option>
									)
								})}
							</select>
						</div>
						<div className='modal__items'>
							<label className='modal__label' htmlFor='status'>
								Status
							</label>
							<select
								value={formData.status}
								className='modal__select__2'
								id='status'
								onChange={e => SelectParams(e, 'status', dataStatuses)}
								name='status'
							>
								<option value={''} disabled selected>
									Select Status
								</option>
								{dataStatuses.map((el, index) => {
									return (
										<option key={index} value={el.name}>
											{el.name}
										</option>
									)
								})}
							</select>
						</div>
					</form>
					<div className='modal__buttons'>
						<div className='modal__btn' onClick={CloseModal}>
							Cancel
						</div>
						<div className='modal__btn' onClick={AddUsers}>
							Add
						</div>
					</div>
					{error === true && (
						<div className='modal__error'>Fill in all fields</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Modal
