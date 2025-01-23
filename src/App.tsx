import { Route, Routes } from 'react-router-dom'
import './App.css'
import EditUsers from './editUsers/EditUsers'
import Header from './header/Header'
import Users from './users/Users'
function App() {
	return (
		<div className='App'>
			<Header />
			<main className='main'>
				<Routes>
					<Route path='/' element={<EditUsers />} />
					<Route path='/users' element={<Users />} />
				</Routes>
			</main>
		</div>
	)
}

export default App
