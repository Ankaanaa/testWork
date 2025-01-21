import { NavLink } from 'react-router-dom'
import './Header.scss'
const Header = () => {
	return (
		<header className='header'>
			<div className='header__container'>
				<NavLink className='header__navLink' to='/'>
					Edit Users
				</NavLink>
				<NavLink className='header__navLink' to='/users'>
					Users
				</NavLink>
			</div>
		</header>
	)
}

export default Header
