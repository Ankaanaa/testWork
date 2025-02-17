import { useEffect, useState } from 'react'

interface props {
	country: string
	checkDepartment: {
		[department: string]: boolean
	}
	observerFilter: number
}
interface status {
	name: string
	isActive: boolean
}

const FilterStatuses = (props: props) => {
	const [statuses, setStatuses] = useState<status[]>([])
	const [toggleShow, setToggleSnow] = useState<boolean>(false)
	const statusesList = statuses.map((el, index) => {
		return (
			<>
				{el.isActive && (
					<div key={index} className='users__department'>
						<div className='users__prof'>
							<span className='users__icon'>D</span>
							{el.name}
						</div>
					</div>
				)}
			</>
		)
	})
	useEffect(() => {
		setStatuses(
			Object.entries(props.checkDepartment).map(([key, value]) => ({
				name: key,
				isActive: value,
			}))
		)
	}, [props.checkDepartment])
	console.log(props.country)
	return (
		<div className={`users__filter__3`}>
			<div className='users__block'>
				<div>All Statuses</div>
				<div className='users__show' onClick={() => setToggleSnow(!toggleShow)}>
					ʌ
				</div>
			</div>
			{props.observerFilter === 3 && (
				<>
					{toggleShow && (
						<div className='users__content'>
							{statusesList}
							{props.country.length > 0 && (
								<div className='users__department'>
									<div className='users__prof'>
										<span className='users__icon'>C</span>
										{props.country}
									</div>
								</div>
							)}
						</div>
					)}
				</>
			)}
		</div>
	)
}

export default FilterStatuses
