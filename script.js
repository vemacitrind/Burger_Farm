let users = [];
let isLoggedIn = false;
let fromSignUp = false;

const userIcon = document.getElementById('userIcon');
const signUpModal = new bootstrap.Modal(document.getElementById('signUpModal'));
const signInModal = new bootstrap.Modal(document.getElementById('signInModal'));
const successModal = new bootstrap.Modal(document.getElementById('successModal'));

const signUpForm = document.getElementById('signUpForm');
const signInForm = document.getElementById('signInForm');
const successMessage = document.getElementById('successMessage');


userIcon.addEventListener('click', () => {
    if (isLoggedIn) {
     
        isLoggedIn = false;
        userIcon.className = "fas fa-user-circle fa-2x";
        alert('You have logged out successfully!');
    } else {
        
        fromSignUp = false; 
        signInModal.show();
    }
});

    
signInForm.addEventListener('submit', (event) => {
    event.preventDefault();

    
    if (!fromSignUp) {
        isLoggedIn = true; 
        userIcon.className = "fas fa-sign-out-alt fa-2x";

        successMessage.textContent = "Sign In Successful!";
        signInModal.hide(); 
        successModal.show(); 
        return;
    }

    
    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;
    // const name = document.getElementById('signInName').value;

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        isLoggedIn = true; 
        userIcon.className = "fas fa-sign-out-alt fa-2x"; 

        successMessage.textContent = `Welcome back, ${user.name}!`;
        signInModal.hide(); 
        successModal.show();
    } else {
        alert('Invalid credentials. Please try again.');
    }
});


document.getElementById('signUpIcon').addEventListener('click', () => {
    signUpModal.show();
});


signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;
    const name = document.getElementById('signUpName').value;

    
    users.push({ name, email, password });

    alert('Sign Up Successful! Please sign in.');
    signUpModal.hide(); 

    fromSignUp = true; 
    signInModal.show(); 
});
    
function cartPage() {
    if (!isLoggedIn) {
        alert('Please sign in to access the cart.');
        return;
    }

    // If user is logged in, proceed with cart functionality
    isCartClicked = true;
    document.getElementById('container44').style.display = 'block';

    // Scroll to the cart section smoothly
    document.getElementById('container44').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

    
let cart = [];
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const subtotalEl = document.getElementById('subtotal');
const taxEl = document.getElementById('tax');
const estimatedTotalEl = document.getElementById('estimatedTotal');
let isCartClicked = false; 

    
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        if (!isLoggedIn) {
            alert('Please sign in to add items to the cart.');
            signInModal.show();
            return;
        }
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        const image = button.getAttribute('data-image');
        const item = cart.find(i => i.name === name);

        if (item) {
            item.quantity++;
        } else {
            cart.push({ name, price, image, quantity: 1 });
        }

        updateCart();
    });
});

    

function updateCart() {
    // total initial 0=> item count work initail 0 than user add 2 item so total 2
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);

    cartItems.innerHTML = '';
    let subtotal = 0;
    //  g=> global space to ensure all space remove
    // s=>space
    cart.forEach(item => {
        subtotal += item.price * item.quantity;

        cartItems.innerHTML += `
        <tr id="row-${item.name.replace(/\s+/g, '')}">
            <td>
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; border-radius:50%; object-fit: cover; margin-right: 10px;"> 
                ${item.name}
            </td>
            <td>₹${item.price}</td>
            <td style="padding:8px 0px;">                    
                <button class="quantity-btn decrease " onclick="updateQuantity('${item.name}', -1)"><i class="bi bi-dash-lg minus"></i></button> 
                ${item.quantity} 
                <button class="quantity-btn increase " onclick="updateQuantity('${item.name}', 1)"><i class="bi bi-plus-lg plus "></i></button>
            </td>
            <td>₹${(item.price * item.quantity).toFixed(2)}</td>
            <td><button class="remove-btn" onclick="removeItem('${item.name}')">Remove</button></td>
        </tr>
    `;
    });

    const tax = subtotal * 0.1;
    const estimatedTotal = subtotal + tax;

    subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
    taxEl.textContent = `₹${tax.toFixed(2)}`;
    estimatedTotalEl.textContent = `₹${estimatedTotal.toFixed(2)}`;

    
    if (cart.length === 0) {
        cartCount.textContent = 0;
    }
}

function updateQuantity(itemName, change) {
    let itemIndex = cart.findIndex(i => i.name === itemName);

    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;

        if (cart[itemIndex].quantity <= 0) {
            removeItem(itemName); 
        } else {
            updateCart();
        }
    }
}

function removeItem(itemName) {
        //  Keeps all items except the one you want to remove.
        cart = cart.filter(i => i.name !== itemName);
        let row = document.getElementById(`row-${itemName.replace(/\s+/g, '')}`);
        if (row) row.remove();

        
        if (cart.length === 0) {
            document.getElementById("cartCount").textContent = 0;
        }

        updateCart();
    }

    
    updateCart();
    
function paymentfunction() {
    if (cartCount.textContent == 0) {
        alert("Your cart is empty! Please add items to the cart before proceeding.");
        return;
    }
    document.getElementById('container44').style.display = 'none';
    document.getElementById('paymentSection').style.display = 'block';
}

    
document.getElementById('paymentForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const address=document.getElementById('address').value;
        var name = document.getElementById('signUpName').value;
        name = document.getElementById('signInName').value;
       
    
        const mobile = document.getElementById('mobile').value;
        const billDetails = `
<div style="margin-bottom: 20px;">
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Mobile:</strong> ${mobile}</p>
    <p><strong>Address:</strong>${address}</p>
</div>
<table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    <thead>
        <tr style="background-color: #f1f1f1; text-align: left;">
            <th style="padding: 10px; border: 1px solid #ddd;">Item Name</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Quantity</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Price</th>
        </tr>
    </thead>
    <tbody>
        ${cart.map(item => `
            <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">${item.name}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${item.quantity}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">₹${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
        `).join('')}
    </tbody>
</table>
<div style="text-align: right; font-size: 18px; color: #333;">
    <p><strong>Subtotal:</strong> ${subtotalEl.textContent}</p>
    <p><strong>Tax (10%):</strong> ${taxEl.textContent}</p>
    <p><strong>Estimated Total:</strong> ${estimatedTotalEl.textContent}</p>
</div>
`;

        document.getElementById('billDetails').innerHTML = billDetails;
        document.getElementById('paymentSection').style.display = 'none';
        document.getElementById('billSection').style.display = 'block';
    });




    document.getElementById('backToMenu').addEventListener('click', () => {

document.getElementById('orderStatusContainer').style.display = 'none';
document.getElementById('menuSection').style.display = 'block';  
});

document.getElementById('cancelPayment').addEventListener('click', () => {
    
    if (cartCount.textContent == 0) {
        alert("Your cart is empty! Please add items to the cart before proceeding.");
        return; 
    } 
    cart.length = 0; 
    updateCart(); 
    document.getElementById('paymentSection').style.display = 'none';
    document.getElementById('menuSection').style.display = 'block';
    isCartClicked = false;
});


document.getElementById('paymentForm').addEventListener('submit', function (event) {
    event.preventDefault(); 

    let mobile = document.getElementById('mobile').value.trim();
    let address = document.getElementById('address').value.trim();

    if (mobile === '' || address === '') {
        alert('Please fill all required fields.');
        return;
    }

    generateBill(); 
});

function generateBill() {
    // let progressModal = new bootstrap.Modal(document.getElementById('progressModal'));
     let progressModal = new bootstrap.Modal(document.getElementById('progressModal'), {
        backdrop: 'static', // Prevent clicking outside to close
        keyboard: false     // Disable ESC key closing
    });
    progressModal.show();

    let progressBar = document.getElementById('progressBar');
    let progressText = document.getElementById('progressText');
    let orderStatus = document.getElementById('orderStatus');
    document.getElementById('billSection').style.display = 'block';

    let steps = ["Order Placed ✅", "Preparing Your Order 🍔", "Out for Delivery 🚴", "Almost There 🏡", "Delivered ✅"];
    let stepIndex = 0;
    let progress = 0;

    let interval = setInterval(() => {
        progress += 20;
        progressBar.style.width = progress + '%';
        progressBar.textContent = progress + '%';
        progressText.textContent = steps[stepIndex];
        stepIndex++;

        if (progress >= 100) {
            clearInterval(interval);
            progressModal.hide();
            orderStatus.style.display = 'block';

            setTimeout(() => {
                document.getElementById('billSection').style.display = 'none';
                orderStatus.style.display = 'none';
                cart.length = 0; 
                updateCart(); 
            }, 5000);
        }
    }, 2000);
}
    
function downloadBill() {
    const { jsPDF } = window.jspdf;
    const billSection = document.getElementById('billSection');

    html2canvas(billSection, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('Final_Bill.pdf');
    });
}

function resetCart() {
    cart.length = 0; 
    updateCart();   
    document.getElementById('billSection').style.display = 'none'; 
    document.getElementById('menuSection').style.display = 'block';
}
document.getElementById("togglePassword").addEventListener("click", function (event) {
    event.preventDefault(); 
    const passwordInput = document.getElementById("signUpPassword");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        this.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        this.textContent = "Show";
    }
});