// Register the Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('../sw.js');
        console.log('Service Worker registered successfully:', registration);

        const registration2 = await navigator.serviceWorker.register('tiles_sw.js', { scope: '/tiles/' });
        if (registration2) {
            console.log('tiles_sw.js registered successfully:', registration2);
        }
  
        // Update status on successful registration
        document.getElementById('status').textContent = 'Service Worker registered!';
      } catch (error) {
        console.error('Service Worker registration failed:', error);
        document.getElementById('status').textContent = 'Service Worker registration failed!';
      }
    });
  }
  
  // Attach fetch button functionality
  document.getElementById('fetch-btn').addEventListener('click', async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      const data = await response.json();
      document.getElementById('response1').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
      console.error('Fetch error:', error);
      document.getElementById('response1').textContent = 'Error fetching data.';
    }
  });
  
  document.getElementById('fetch-btn2').addEventListener('click', async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/tiles/abc/1');
      const data = await response.json();
    document.getElementById('response2').textContent = JSON.stringify(data, null, 2);
    } catch (error) {
      console.error('Fetch error:', error); 
      document.getElementById('response2').textContent = 'Error fetching data.';
    }
  });
