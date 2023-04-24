// import '../css/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './Auth/Layout';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ConfirmEmail from './Auth/ConfirmEmail';
import User from './Users/User';
import RequreAuth from './Auth/RequireAuth';
import ChangeUserAvatar from './Users/ChangeAvatar'
import ChangeProfile from './Users/ChangeProfile';
import CreateCompany from './Companies/CreateCompany';
import CreateEvent from './Events/CreateEvent';
import Company from './Companies/Company';
import CurrentCompany from './Companies/CurrentCompany';
import Event from './Events/Event';
import CurrentEvent from './Events/CurrentEvent';
import CreateEventItem from './Events/CreateEventItem';
import Ticket from './Ticket/Ticket';
import Location from './Locations/Location';
import CreateLocation from './Locations/CreateLocation';
import NotFound from './Other/NotFound';
import ServerError from './Other/ServerError';
import { CheckTicket } from './Ticket/CheckTicket';
import { WelcomePage } from './Other/WelcomePage';
import Promocodes from './Promocodes/Promocodes';


function App() {
	if (!localStorage.getItem("lang")) {
		localStorage.setItem('lang', 'ua')
	}
	if (!localStorage.getItem('autorized')) {
		localStorage.setItem(
			'autorized',
			JSON.stringify({ currentUser: 'guest' })
		);
	}



	return (
		<Routes>
			<Route path="/" element={<Layout />} >
				{/* Auth module */}
				{/* <Translation>{t => <Header t={t} />}</Translation> */}
				<Route path='login' element={<Login />} />
				<Route path='registration' element={<Register />} />
				<Route path='confirm-email/:token' element={<ConfirmEmail />} />
				<Route path="*" element={<NotFound />} />
				<Route path="500" element={<ServerError />} />
				<Route path='events' element={<Event />} />
				<Route path='/' element={<WelcomePage />} />
				<Route path='event/:id' element={<CurrentEvent />} />
				<Route path='company/:id' element={<CurrentCompany />} />
				<Route path='check-ticket/:secretCode' element={<CheckTicket />} />
				<Route path='locations' element={<Location />} />
				<Route path='company-promocodes/:id' element={<Promocodes />} />


				<Route element={<RequreAuth allowedRoles={['user', 'admin']} />} >
					<Route path='user/:id' element={<User />} />
					<Route path='change-avatar' element={<ChangeUserAvatar />} />
					<Route path='change-profile' element={<ChangeProfile />} />
					<Route path='createCompany' element={<CreateCompany />} />
					<Route path='createEvent' element={<CreateEvent />} />
					<Route path='createLocation' element={<CreateLocation />} />
					<Route path='createEventItem/:id' element={<CreateEventItem />} />
					<Route path='companies' element={<Company />} />
					<Route path='tickets' element={<Ticket />} />
				</Route>
				<Route element={<RequreAuth allowedRoles={['admin']} />} >
				</Route>

			</Route>
		</Routes>
	);
}

export default App;