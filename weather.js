function getWeather() {
    const location = document.getElementById('location').value;
    const apiKey = '3bf13a230af1487c9d4165608251903';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById('weatherInfo');
            if (data.error) {
                weatherInfo.innerHTML = `<p style="color: red;">${data.error.message}</p>`;
            } else {
                const condition = data.current.condition.text.toLowerCase();
                let bgImage = '';
                let emoji = '';

                if (condition.includes('rain')) {
                    bgImage = 'url(https://static.vecteezy.com/system/resources/previews/029/771/613/large_2x/epicgraphy-shot-of-rainy-season-background-enjoying-nature-rainfall-and-happy-life-concept-generative-ai-free-photo.jpeg)';
                    emoji = '🌧️';
                } else if (condition.includes('cloud')) {
                    bgImage = 'url(https://images.hdqwalls.com/wallpapers/clear-sky-clouds-nature-5k-f3.jpg)';
                    emoji = '☁️';
                } else if (condition.includes('sun') || condition.includes('clear')) {
                    bgImage = 'url(https://wallpapers.com/images/hd/sunny-day-wallpaper-f21ok5dhnkco3i5n.jpg)';
                    emoji = '☀️';
                } else if (condition.includes('snow')) {
                    bgImage = 'url(https://wallpapercave.com/wp/wp8073358.jpg)';
                    emoji = '❄️';
                } else {
                    bgImage = 'url(weather.jpg)';
                    emoji = '🌡️';
                }

                document.body.style.backgroundImage = bgImage;

                const dateTime = new Date(data.location.localtime);

                weatherInfo.innerHTML = `
                    <h3>${data.location.name}, ${data.location.country}</h3>
                    <p>Temperature: ${data.current.temp_c}°C</p>
                    <p>Condition: ${data.current.condition.text} ${emoji}</p>
                    <p>Date: ${dateTime.toDateString()}</p>
                    <p>Time: ${dateTime.toLocaleTimeString()}</p>
                    <img src="https:${data.current.condition.icon}" alt="Weather icon">

                `;
            }
        })
        .catch(error => {
            document.getElementById('weatherInfo').innerHTML = '<p style="color: red;">Failed to fetch data</p>';
            console.error('Error:', error);
        });
}
