import { Route, Routes } from 'react-router-dom'
import './App.css'
import EditUsers from './editUsers/EditUsers'
import Header from './header/Header'
function App() {
	return (
		<div className='App'>
			<Header />
			<main className='main'>
				<Routes>
					<Route path='/' element={<EditUsers />} />
				</Routes>
			</main>
		</div>
	)
}

export default App
