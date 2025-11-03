import { useEffect, useState } from 'react';
import axios from 'axios';

const api_key = import.meta.env.VITE_WEATHER_KEY;

const Country = ({ country, weather }) => {
  if (!country) return null;
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital?.[0]}</p>
      <p>area {country.area}</p>
      <b>languages:</b>
      <ul>
        {country.languages && Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} height={80} alt="flag" />
      {weather &&
        <div>
          <h3>Weather in {country.capital?.[0]}</h3>
          <p>temperature {weather.main.temp} Celsius</p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      }
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [showCountry, setShowCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => setCountries(res.data));
  }, []);

  useEffect(() => {
    if (showCountry && showCountry.capital && api_key) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${showCountry.capital[0]}&units=metric&appid=${api_key}`)
        .then(res => setWeather(res.data));
    }
  }, [showCountry]);

  const countriesToShow = filter === ''
    ? []
    : countries.filter(country =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      );

  let content;
  if (showCountry) {
    content = <Country country={showCountry} weather={weather} />;
  } else if (countriesToShow.length > 10) {
    content = <p>Too many matches, specify another filter</p>;
  } else if (countriesToShow.length > 1) {
    content = (
      <div>
        {countriesToShow.map(country =>
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => {
              setShowCountry(country);
              setWeather(null);
            }}>show</button>
          </div>
        )}
      </div>
    );
  } else if (countriesToShow.length === 1) {
    content = <Country country={countriesToShow[0]} weather={weather} />;
    if (!showCountry || showCountry.name.common !== countriesToShow[0].name.common) {
      setShowCountry(countriesToShow[0]);
      setWeather(null);
    }
  }

  return (
    <div>
      find countries <input value={filter} onChange={e => {
        setFilter(e.target.value);
        setShowCountry(null);
        setWeather(null);
      }} />
      {content}
    </div>
  );
};

export default App;
