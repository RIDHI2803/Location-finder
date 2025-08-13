document.getElementById('getLocationBtn').addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        document.getElementById('latitude').value = latitude;
        document.getElementById('longitude').value = longitude;

        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data = await response.json();
          document.getElementById('city').value = data.address.city || data.address.town || data.address.village || 'Unknown';
          document.getElementById('country').value = data.address.country || 'Unknown';
        } catch (err) {
          alert('Error fetching location details.');
          console.error(err);
        }
      },
      () => alert('Unable to retrieve location.')
    );
  } else {
    alert('Geolocation not supported in your browser.');
  }
});
