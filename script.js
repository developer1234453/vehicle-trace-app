
const map = L.map('map').setView([17.385044, 78.486671], 13);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


const vehicleIcon = L.icon({
  iconUrl: 'assets/vehicle-icon.png', 
  iconSize: [40, 40],                 
  iconAnchor: [20, 40],              
});

let vehicleMarker = L.marker([17.385044, 78.486671], { icon: vehicleIcon }).addTo(map);

end
async function fetchVehicleData() {
  try {
    const response = await fetch('https://vehicle-backend-n8ef.onrender.com/api/vehicle'); 
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();

   
    if (data.length > 0) {
      const latLngs = data.map(point => [point.latitude, point.longitude]);
      vehicleMarker.setLatLng(latLngs[latLngs.length - 1]);
      L.polyline(latLngs, { color: 'blue' }).addTo(map);
    }
  } catch (error) {
    console.error('Error fetching vehicle data:', error);
  }
}

fetchVehicleData();
setInterval(fetchVehicleData, 5000); 
