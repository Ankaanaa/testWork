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
	const [formData, setFormData] = useState({
		input1: '',
		input2: '',
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
								className='modal__input'
								type='text'
								id='input1'
								name='input1'
								value={formData.input1}
								onChange={handleChange}
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Modal
