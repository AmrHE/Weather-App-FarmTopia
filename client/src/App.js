import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from './pages/homePage/HomePage';

import './App.css';

const App = () => {
	return (
		<BrowserRouter>
			<div className="app">
				<Switch>
					<Route path="/" component={HomePage} />
				</Switch>
			</div>
		</BrowserRouter>
	);
};

export default App;
