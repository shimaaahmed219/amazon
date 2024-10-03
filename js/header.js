const dropdownButton = document.getElementById('dropdownMenuButton');
const dropdownMenu = document.querySelector('.dropdown-menu');

dropdownButton.addEventListener('click', () => {
  dropdownMenu.classList.toggle('show');
});

let cartCount = 0;
        function addToCart() {
            cartCount++; 
            document.querySelector(".count_item").textContent = cartCount; 
        }
////////////// sidebar ////////////////
document.getElementById("toggleicon").addEventListener("click", function() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("hidden");
});
function close_cart() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.add("hidden"); 
}
/////////////////// sign-in ///////////////

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 
    
    if (!checkPassword()) {
      return;
    }

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
     
      const response = await fetch('/api/checkUser', { 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }) 
      });

      const data = await response.json(); 

      if (response.ok && data.userExists) {
        
        alert('Login successful!');
        
      } else {
        
        alert('User not registered. Redirecting to account creation...');
        document.getElementById('create-account-btn').click(); 
      }
    } catch (error) {
      alert('An error occurred: ' + error.message); 
    }
  });

  


