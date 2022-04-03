import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoMdRemoveCircleOutline } from 'react-icons/io';

import './homePage.css';

const HomePage = () => {
	//Search Query
	const [location, setLocation] = useState('');

	//Data Returned from the search
	const [data, setData] = useState({});

	// Data fetched from the MongoDB store
	const [savedPlaces, setSavedPlaces] = useState([]);

	//Promises Returned from axios.all
	const [savedPlacesPromises, setSavedPlacesPromises] = useState([]);

	//Data resolved from promises from axios.all
	const [savedPlacesData, setSavedPlacesData] = useState([]);

	let resArray = [];

	const getSavedCityData = async () => {
		try {
			const data = await axios.get('/api/v1/city/');
			const response = data.data.data.data;
			response.map((item) => {
				resArray.push(item.url);
			});
			setSavedPlaces(resArray);

			axios.all([resArray.map((place) => axios.get(place))]).then(
				axios.spread((...allData) => {
					setSavedPlacesPromises(allData[0]);
				})
			);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getSavedCityData();
	}, []);

	const resolveSavedDataPromises = () => {
		const res = Promise.all([...savedPlacesPromises]).then((resolved) => {
			setSavedPlacesData(resolved);
		});
	};
	useEffect(() => {
		resolveSavedDataPromises();
	}, [savedPlacesPromises]);

	const handleAddToList = async () => {
		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		};
		try {
			if (location) {
				const respoonse = await axios.post(
					'/api/v1/city',
					{
						name: location,
					},
					config
				);
			}
			getSavedCityData();
		} catch (error) {
			console.log(error.message);
		}
	};

	const handleDeletItem = async (e) => {
		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const getResponse = await axios.get('/api/v1/city/');

			const respoonse = await axios.delete(
				`/api/v1/city/${e.target
					.getAttribute('name')
					.toString()
					.toLowerCase()}`,
				{
					name: location,
				},
				config
			);

			// resArray = [];
			getSavedCityData();
		} catch (error) {
			console.log(error.message);
		}
	};

	const searchWeather = async (e) => {
		try {
			const response = await axios(
				`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=80a248c9b72a4bd8527774e4f6f8fed6`
			);
			setData(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleEnterKeyPress = async (e) => {
		// e.preventDefault();
		if (e.code === 'Enter' || e.code === 'NumpadEnter') {
			try {
				const response = await axios(
					`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=80a248c9b72a4bd8527774e4f6f8fed6`
				);
				setData(response.data);
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div className="weather">
			<div className="weather__search">
				<input
					value={location}
					onChange={(e) => setLocation(e.target.value)}
					onKeyPress={handleEnterKeyPress}
					placeholder="Enter Location"
					type="text"
					className="weather__search-input"
				/>
				<button
					type="submit"
					className="weather__search-btn bold"
					onClick={searchWeather}
				>
					Search
				</button>
				<button
					type="submit"
					className="weather__add-btn bold"
					onClick={handleAddToList}
				>
					Add to list
				</button>
			</div>
			<div className="weather__container">
				<div className="weather__container-top">
					<div className="weather__container-location">
						<p>{data.name}</p>
					</div>
					<div className="weather__container-temp">
						{data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
					</div>
					<div className="weather__container-description">
						{data.weather ? <p>{data.weather[0].main}</p> : null}
					</div>
				</div>

				{data.name !== undefined && (
					<div className="weather__container-bottom">
						<div className="weather__container-feels">
							{data.main ? (
								<p className="bold">{data.main.feels_like.toFixed()}°F</p>
							) : null}
							<p>Feels Like</p>
						</div>
						<div className="weather__container-humidity">
							{data.main ? <p className="bold">{data.main.humidity}%</p> : null}
							<p>Humidity</p>
						</div>
						<div className="weather__container-wind">
							{data.wind ? (
								<p className="bold">{data.wind.speed.toFixed()} MPH</p>
							) : null}
							<p>Wind Speed</p>
						</div>
					</div>
				)}
			</div>

			<div className="weather__saved-container">
				{savedPlacesData?.length > 0 ? (
					<table>
						<tr>
							<th>Del</th>
							<th>City</th>
							<th>Temprature</th>
							<th>Status</th>
							<th>Feels Like</th>
							<th>Humidity</th>
							<th>Wind Speed</th>
						</tr>
						{savedPlacesData.map((place, i) => (
							<tr key={i}>
								<td>
									<IoMdRemoveCircleOutline
										className="icon"
										name={place.data.name}
										onClick={handleDeletItem}
									/>
								</td>
								<td>{place.data.name}</td>
								<td>
									{place.data.main ? (
										<span>{place.data.main.temp.toFixed()}°F</span>
									) : null}
								</td>
								<td>
									{place.data.weather ? (
										<span>{place.data.weather[0].main}</span>
									) : null}
								</td>
								<td>
									{place.data.main ? (
										<span>{place.data.main.feels_like.toFixed()}°F</span>
									) : null}
								</td>
								<td>
									{' '}
									{place.data.main ? (
										<span>{place.data.main.humidity}%</span>
									) : null}
								</td>
								<td>
									{place.data.wind ? (
										<span>{place.data.wind.speed.toFixed()} MPH</span>
									) : null}
								</td>
							</tr>
						))}
					</table>
				) : null}
			</div>
		</div>
	);
};

export default HomePage;
