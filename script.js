//Code for a shadow toggling-function when the site scrolls - referenced from code provided by ChatGPT at OpenAI
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) { 
            header.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
});

// Callback function
function handleFireballData(data) {
    const fireballs = data.data;
  
    // Stores extracted data
    const extractedData = [];
  
    // Cycle through the fireballs
    for (const fireball of fireballs) {
      // Extract information
      const entry = {
        time: fireball.date,
        location: fireball.lat + ', ' + fireball.lon,
        velocity: fireball.vel
      };
      extractedData.push(entry);
    }
  
    console.log(extractedData);
  }
  
  
  const apiUrl = 'https://ssd-api.jpl.nasa.gov/fireball.api';
  const apiKey = 'vYNdXV5Izq9bsvPHLE38SqN5wqcho9fW4uisathz';
  const limit = 10; // Number of fireballs to retrieve
  const script = document.createElement('script');
  script.src = `${apiUrl}?limit=${limit}&api_key=${apiKey}&callback=handleFireballData`;
  
  
  document.body.appendChild(script);